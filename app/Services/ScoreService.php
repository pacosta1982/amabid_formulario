<?php

namespace App\Services;

use App\Models\FormularioInscripcion;
use Illuminate\Support\Facades\DB;

class ScoreService
{
    public function evaluate(int $formularioId, array $answers): array
    {
        // $answers = [
        //   criterion_id => ['option_id'=>X]    // para select/boolean
        //   criterion_id => ['numeric_value'=>Y]// para number
        // ]

        $criteria = DB::table('scoring_criteria')->orderBy('category_id')->orderBy('sort_order')->get();
        $categories = DB::table('scoring_categories')->orderBy('sort_order')->get()->keyBy('id');

        DB::transaction(function () use ($formularioId, $answers) {
            // limpiamos cálculo previo
            DB::table('applicant_scores')->where('formulario_id', $formularioId)->delete();

            foreach ($answers as $criterionId => $payload) {
                $criterion = DB::table('scoring_criteria')->where('id',$criterionId)->first();
                if (!$criterion) continue;

                $points = 0;
                $optionId = $payload['option_id'] ?? null;
                $numericValue = $payload['numeric_value'] ?? null;

                if ($criterion->input_type === 'select' || $criterion->input_type === 'boolean') {
                    if ($optionId) {
                        $opt = DB::table('scoring_options')->where('id',$optionId)->first();
                        $points = $opt?->points ?? 0;
                    }
                } else if ($criterion->input_type === 'number') {
                    if ($numericValue !== null) {
                        $rule = DB::table('scoring_ranges')
                            ->where('criterion_id',$criterionId)
                            ->where(function($q) use ($numericValue) {
                                $q->where(function($q) use ($numericValue){
                                    $q->whereNull('min_value')->orWhere('min_value','<=',$numericValue);
                                })->where(function($q) use ($numericValue){
                                    $q->whereNull('max_value')->orWhere('max_value','>=',$numericValue);
                                });
                            })
                            ->orderBy('sort_order')->first();
                        $points = $rule?->points ?? 0;
                    }
                }

                DB::table('applicant_scores')->insert([
                    'formulario_id' => $formularioId,
                    'criterion_id'  => $criterionId,
                    'option_id'     => $optionId,
                    'numeric_value' => $numericValue,
                    'points_awarded'=> $points,
                    'created_at'    => now(),
                    'updated_at'    => now(),
                ]);
            }
        });

        // Devolver totales por categoría y general
        $rows = DB::table('applicant_scores as s')
            ->join('scoring_criteria as c','c.id','=','s.criterion_id')
            ->select('c.category_id', DB::raw('SUM(s.points_awarded) as subtotal'))
            ->where('s.formulario_id',$formularioId)
            ->groupBy('c.category_id')
            ->get();

        $perCat = [];
        $total = 0;
        foreach ($rows as $r) {
            $name = DB::table('scoring_categories')->where('id',$r->category_id)->value('name');
            $perCat[$r->category_id] = [
                'name' => $name,
                'subtotal' => (int)$r->subtotal
            ];
            $total += (int)$r->subtotal;
        }

        return ['per_category'=>$perCat, 'total'=>$total];
    }
}
