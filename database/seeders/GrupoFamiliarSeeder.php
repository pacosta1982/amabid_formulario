<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FormularioInscripcion;
use App\Models\GrupoFamiliar;
use Faker\Factory as Faker;

class GrupoFamiliarSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $formularios = FormularioInscripcion::all();

        foreach ($formularios as $form) {
            $cantidad = rand(1, 5); // cada postulante entre 1 y 5 familiares
            for ($i = 0; $i < $cantidad; $i++) {
                GrupoFamiliar::create([
                    'formulario_id' => $form->id,
                    'nombre' => $faker->name,
                    'ci' => $faker->numerify('########'),
                    'edad' => $faker->numberBetween(1, 80),
                    'parentesco' => $faker->randomElement(['Hijo', 'Hija', 'Padre', 'Madre', 'Hermano', 'Hermana']),
                    'escolaridad' => $faker->randomElement(['Primaria', 'Secundaria', 'Universitaria']),
                    'ocupacion' => $faker->jobTitle,
                ]);
            }
        }
    }
}
