<?php

namespace App\Http\Controllers;

use App\Services\ScoreService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScoreController extends Controller
{
    public function schema()
    {
        // Devuelve categorías, criterios, opciones y rangos para renderizar el formulario de scoring dinámico
        $cats = DB::table('scoring_categories')->orderBy('sort_order')->get();
        $criterios = DB::table('scoring_criteria')->orderBy('category_id')->orderBy('sort_order')->get();
        $options = DB::table('scoring_options')->get()->groupBy('criterion_id');
        $ranges  = DB::table('scoring_ranges')->get()->groupBy('criterion_id');

        return response()->json(compact('cats','criterios','options','ranges'));
    }

    public function evaluate(Request $request, ScoreService $svc, int $formularioId)
    {
        $answers = $request->validate([
            'answers' => 'required|array',
        ])['answers'];

        $result = $svc->evaluate($formularioId, $answers);
        return response()->json($result);
    }

    public function currentScore(int $formularioId)
    {
        // Devuelve el detalle guardado + totales
        $detail = DB::table('applicant_scores')->where('formulario_id',$formularioId)->get();
        $sum = DB::table('applicant_scores')->where('formulario_id',$formularioId)->sum('points_awarded');
        return response()->json(['detail'=>$detail,'total'=>$sum]);
    }
}
