<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScoringSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('scoring_categories')->truncate();
        DB::table('scoring_criteria')->truncate();
        DB::table('scoring_options')->truncate();
        DB::table('scoring_ranges')->truncate();

        // Categorías
        $catA = DB::table('scoring_categories')->insertGetId([
            'code' => 'A',
            'name' => 'COMPOSICIÓN FAMILIAR',
            'sort_order' => 1,
        ]);
        $catB = DB::table('scoring_categories')->insertGetId([
            'code' => 'B',
            'name' => 'VULNERABILIDAD',
            'sort_order' => 2,
        ]);
        $catC = DB::table('scoring_categories')->insertGetId([
            'code' => 'C',
            'name' => 'CRITERIOS TÉCNICOS DE PRIORIZACIÓN',
            'sort_order' => 3,
        ]);

        // A1. Configuración (select)
        $a1 = DB::table('scoring_criteria')->insertGetId([
            'category_id' => $catA,
            'code' => 'A1',
            'name' => 'Configuración',
            'input_type' => 'select',
            'sort_order' => 10,
        ]);
        DB::table('scoring_options')->insert([
            ['criterion_id'=>$a1,'label'=>'Madre/padre jefe/a de hogar, Viudo/a, separado/a','points'=>1,'sort_order'=>1],
            ['criterion_id'=>$a1,'label'=>'Pareja de casados/concubinos con hijos','points'=>1,'sort_order'=>2],
            ['criterion_id'=>$a1,'label'=>'Pareja de casados/concubinos sin hijos','points'=>2,'sort_order'=>3],
            ['criterion_id'=>$a1,'label'=>'Adultos mayores con o sin sostén económico','points'=>2,'sort_order'=>4],
            ['criterion_id'=>$a1,'label'=>'Hijo/a nieto/a sostén','points'=>5,'sort_order'=>5],
            ['criterion_id'=>$a1,'label'=>'En convivencia socioeconómica (padre/madre e hijos) hermanos','points'=>4,'sort_order'=>6],
            ['criterion_id'=>$a1,'label'=>'Otras configuraciones familiares no convencionales','points'=>2,'sort_order'=>7],
        ]);

        // A2. Composición del hogar (number + rangos)
        $a2 = DB::table('scoring_criteria')->insertGetId([
            'category_id' => $catA,
            'code' => 'A2',
            'name' => 'Composición del hogar (número de integrantes)',
            'input_type' => 'number',
            'sort_order' => 20,
        ]);
        DB::table('scoring_ranges')->insert([
            ['criterion_id'=>$a2,'min_value'=>7,'max_value'=>null,'points'=>10,'sort_order'=>1], // 7 en adelante
            ['criterion_id'=>$a2,'min_value'=>5,'max_value'=>6,'points'=>8,'sort_order'=>2],
            ['criterion_id'=>$a2,'min_value'=>3,'max_value'=>4,'points'=>6,'sort_order'=>3],
            ['criterion_id'=>$a2,'min_value'=>2,'max_value'=>2,'points'=>4,'sort_order'=>4],
        ]);

        // A3. Edad de los miembros (select de la banda predominante)
        $a3 = DB::table('scoring_criteria')->insertGetId([
            'category_id' => $catA,
            'code' => 'A3',
            'name' => 'Edad de los miembros del grupo familiar (banda predominante)',
            'input_type' => 'select',
            'sort_order' => 30,
        ]);
        DB::table('scoring_options')->insert([
            ['criterion_id'=>$a3,'label'=>'6 y más menores de edad','points'=>10,'sort_order'=>1],
            ['criterion_id'=>$a3,'label'=>'De 4 a 5 menores de edad','points'=>8,'sort_order'=>2],
            ['criterion_id'=>$a3,'label'=>'De 2 y 3 menores de edad','points'=>6,'sort_order'=>3],
            ['criterion_id'=>$a3,'label'=>'1 menor de edad','points'=>4,'sort_order'=>4],
        ]);

        // B1. Discapacidad o enf. grave en grupo familiar (select/boolean)
        $b1 = DB::table('scoring_criteria')->insertGetId([
            'category_id' => $catB,
            'code' => 'B1',
            'name' => 'Personas con discapacidad o enfermedad grave en el grupo familiar',
            'input_type' => 'select',
            'sort_order' => 10,
        ]);
        DB::table('scoring_options')->insert([
            ['criterion_id'=>$b1,'label'=>'Persona con discapacidad o enfermedad grave','points'=>5,'sort_order'=>1],
            ['criterion_id'=>$b1,'label'=>'No','points'=>0,'sort_order'=>2],
        ]);

        // (sigue: B2 Adulto mayor, B3 Actividad laboral, B4 Distribución ingreso per cápita, B5 Escolaridad postulante,
        // C1 Condición de seguridad, C2 Salubridad, C3 Hacinamiento, C4 Requiere terminación...)
        // Repite insert según tu planilla
    }
}
