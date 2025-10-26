<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScoringConfigSeeder extends Seeder
{
    public function run(): void
    {
        $configs = [
            'A1' => [
                'Madre/padre jefe/a de hogar' => 1,
                'Pareja con hijos' => 2,
                'Pareja sin hijos' => 1,
                'Adultos mayores' => 2,
                'Hijo/a nieto/a sostén' => 5,
                'En convivencia socioeconómica' => 4,
                'No convencional' => 2,
            ],
            'A2' => ['7+'=>10,'5-6'=>8,'3-4'=>6,'2-2'=>4],
            'A3' => ['6+'=>10,'4-5'=>8,'2-3'=>6,'1'=>4],
            'B1' => ['si'=>5,'no'=>0],
        ];

        foreach ($configs as $key => $value) {
            DB::table('scoring_configs')->updateOrInsert(
                ['key' => $key],
                ['value' => json_encode($value), 'updated_at' => now()]
            );
        }
    }
}
