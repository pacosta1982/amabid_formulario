<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('formulario_inscripcion', function (Blueprint $table) {
            $table->id();
            $table->timestamp('fecha_envio')->useCurrent();

            // Postulante
            $table->string('postulante_nombre')->nullable();
            $table->string('postulante_ci')->nullable();
            $table->date('postulante_fecha_nacimiento')->nullable();
            $table->string('postulante_estado_civil')->nullable();
            $table->integer('postulante_edad')->nullable();
            $table->string('postulante_nacionalidad')->nullable();
            $table->string('postulante_escolaridad')->nullable();
            $table->string('postulante_telefono')->nullable();
            $table->string('postulante_contacto_alternativo')->nullable();
            $table->string('postulante_email')->nullable();
            $table->string('postulante_profesion')->nullable();
            $table->string('postulante_actividad')->nullable();
            $table->decimal('postulante_ingreso', 14, 2)->nullable();
            $table->boolean('postulante_ruc_activo')->default(false);

            // Inmueble
            $table->string('inmueble_titulo_propiedad')->nullable();
            $table->string('inmueble_comprobante_pago')->nullable();
            $table->string('inmueble_otro_documento')->nullable();
            $table->string('inmueble_conexion_ande')->nullable();
            $table->string('inmueble_finca_matricula')->nullable();
            $table->string('inmueble_direccion')->nullable();
            $table->string('inmueble_barrio')->nullable();
            $table->string('inmueble_municipio')->nullable();
            $table->string('inmueble_padron')->nullable();
            $table->string('inmueble_subsidio_anterior')->nullable();

            // Pareja
            $table->string('pareja_nombre')->nullable();
            $table->string('pareja_ci')->nullable();
            $table->date('pareja_fecha_nacimiento')->nullable();
            $table->string('pareja_estado_civil')->nullable();
            $table->integer('pareja_edad')->nullable();
            $table->string('pareja_nacionalidad')->nullable();
            $table->string('pareja_escolaridad')->nullable();
            $table->string('pareja_telefono')->nullable();
            $table->string('pareja_email')->nullable();
            $table->string('pareja_profesion')->nullable();
            $table->string('pareja_actividad')->nullable();
            $table->decimal('pareja_ingreso', 14, 2)->nullable();
            $table->boolean('pareja_ruc_activo')->default(false);
            $table->boolean('pareja_subsidio_anterior')->default(false);

            // Compromiso
            $table->string('compromiso_ahorro')->nullable(); // si/no
            $table->string('compromiso_cooperativa')->nullable();

            // Salud
            $table->boolean('salud_discapacidad')->default(false);
            $table->string('salud_tipo_discapacidad')->nullable();
            $table->boolean('salud_embarazo')->default(false);
            $table->string('salud_gestacion')->nullable();
            $table->boolean('salud_enfermedad')->default(false);
            $table->string('salud_enfermedad_descripcion')->nullable();
            $table->boolean('salud_responsable_cuidados')->default(false);
            $table->boolean('salud_afecta_actividades')->default(false);

            // Identidad
            $table->string('identidad_grupo_etnico')->nullable();
            $table->string('identidad_grupo_etnico_otro')->nullable();
            $table->string('identidad_genero')->nullable();
            $table->string('identidad_genero_otro')->nullable();

            // Documentos
            $table->boolean('doc_cedula')->default(false);
            $table->boolean('doc_titulo')->default(false);
            $table->boolean('doc_comprobante_ingreso')->default(false);
            $table->boolean('doc_sociales')->default(false);

            // Mejoras
            $table->text('mejoras')->nullable();
            $table->text('observaciones')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formulario_inscripcion');
    }
};
