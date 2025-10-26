<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FormularioInscripcion;
use Faker\Factory as Faker;

class FormularioInscripcionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            FormularioInscripcion::create([
                // Postulante
                'postulante_nombre' => $faker->name,
                'postulante_ci' => $faker->unique()->numerify('########'),
                'postulante_fecha_nacimiento' => $faker->date(),
                'postulante_estado_civil' => $faker->randomElement(['Soltero', 'Casado', 'Divorciado']),
                'postulante_edad' => $faker->numberBetween(18, 70),
                'postulante_nacionalidad' => 'Paraguaya',
                'postulante_escolaridad' => $faker->randomElement(['Primaria', 'Secundaria', 'Universitaria']),
                'postulante_telefono' => $faker->phoneNumber,
                'postulante_contacto_alternativo' => $faker->phoneNumber,
                'postulante_email' => $faker->unique()->safeEmail,
                'postulante_profesion' => $faker->jobTitle,
                'postulante_actividad' => $faker->sentence(3),
                'postulante_ingreso' => $faker->randomFloat(2, 1500000, 10000000),
                'postulante_ruc_activo' => $faker->boolean,

                // Inmueble
                'inmueble_titulo_propiedad' => $faker->randomElement(['si', 'no', 'tramite']),
                'inmueble_comprobante_pago' => $faker->randomElement(['si', 'no']),
                'inmueble_otro_documento' => $faker->sentence(2),
                'inmueble_conexion_ande' => $faker->word,
                'inmueble_finca_matricula' => $faker->bothify('FM####'),
                'inmueble_direccion' => $faker->address,
                'inmueble_barrio' => $faker->word,
                'inmueble_municipio' => $faker->city,
                'inmueble_padron' => $faker->bothify('PAD####'),
                'inmueble_subsidio_anterior' => $faker->randomElement(['si', 'no']),

                // Pareja
                'pareja_nombre' => $faker->name,
                'pareja_ci' => $faker->numerify('########'),
                'pareja_fecha_nacimiento' => $faker->date(),
                'pareja_estado_civil' => $faker->randomElement(['Casado', 'Unión Libre']),
                'pareja_edad' => $faker->numberBetween(18, 70),
                'pareja_nacionalidad' => 'Paraguaya',
                'pareja_escolaridad' => $faker->randomElement(['Primaria', 'Secundaria', 'Universitaria']),
                'pareja_telefono' => $faker->phoneNumber,
                'pareja_email' => $faker->safeEmail,
                'pareja_profesion' => $faker->jobTitle,
                'pareja_actividad' => $faker->sentence(3),
                'pareja_ingreso' => $faker->randomFloat(2, 1500000, 8000000),
                'pareja_ruc_activo' => $faker->boolean,
                'pareja_subsidio_anterior' => $faker->boolean,

                // Compromiso
                'compromiso_ahorro' => $faker->randomElement(['si', 'no']),
                'compromiso_cooperativa' => $faker->company,

                // Salud
                'salud_discapacidad' => $faker->boolean,
                'salud_tipo_discapacidad' => $faker->boolean ? $faker->word : null,
                'salud_embarazo' => $faker->boolean,
                'salud_gestacion' => $faker->boolean ? $faker->randomDigit . ' meses' : null,
                'salud_enfermedad' => $faker->boolean,
                'salud_enfermedad_descripcion' => $faker->boolean ? $faker->sentence(4) : null,
                'salud_responsable_cuidados' => $faker->boolean,
                'salud_afecta_actividades' => $faker->boolean,

                // Identidad
                'identidad_grupo_etnico' => $faker->randomElement(['mestizo', 'afrodescendiente', 'indigena', 'otro']),
                'identidad_grupo_etnico_otro' => null,
                'identidad_genero' => $faker->randomElement(['masculino', 'femenino', 'noBinario']),
                'identidad_genero_otro' => null,

                // Documentos
                'doc_cedula' => $faker->boolean,
                'doc_titulo' => $faker->boolean,
                'doc_comprobante_ingreso' => $faker->boolean,
                'doc_sociales' => $faker->boolean,

                // Mejoras
                'mejoras' => $faker->sentence(6),
                'observaciones' => $faker->sentence(8),

                //Configuracion
                'configuracion' => $faker->randomElement(['Pareja con hijos', 'Pareja sin hijos', 'Adultos mayores', 'Hijo/a nieto/a sostén', 'En convivencia socioeconómica','Madre/padre jefe/a de hogar']),
            ]);
        }
    }
}
