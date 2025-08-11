<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Categorías: A, B, C
        Schema::create('scoring_categories', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();   // A, B, C
            $table->string('name');             // "COMPOSICIÓN FAMILIAR", "VULNERABILIDAD", ...
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Criterios dentro de la categoría
        Schema::create('scoring_criteria', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('scoring_categories')->cascadeOnDelete();
            $table->string('code')->nullable(); // A1, A2, ...
            $table->string('name');             // "Configuración", "Composición del hogar", ...
            $table->enum('input_type', ['select','boolean','number'])->default('select');
            // Si quisieras hacer auto-cálculo, puedes guardar una "fuente"
            // ej: nombre de columna en formulario_inscripcion o JSONPath para el front.
            $table->string('source_field')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Opciones fijas (para input_type=select/boolean)
        Schema::create('scoring_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('criterion_id')->constrained('scoring_criteria')->cascadeOnDelete();
            $table->string('label');            // "Madre/padre jefe de hogar...", "Pareja c/hijos", etc.
            $table->integer('points');          // Puntaje asignado (columna "Puntajes Parciales")
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Reglas por rango (para input_type=number)
        Schema::create('scoring_ranges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('criterion_id')->constrained('scoring_criteria')->cascadeOnDelete();
            $table->integer('min_value')->nullable(); // inclusive
            $table->integer('max_value')->nullable(); // inclusive
            $table->integer('points');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Resultado de evaluación por postulante, criterio y opción/valor
        Schema::create('applicant_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('formulario_id')->constrained('formulario_inscripcion')->cascadeOnDelete();
            $table->foreignId('criterion_id')->constrained('scoring_criteria')->cascadeOnDelete();
            $table->foreignId('option_id')->nullable()->constrained('scoring_options')->nullOnDelete();
            $table->integer('numeric_value')->nullable(); // si input_type=number
            $table->integer('points_awarded');            // puntos calculados
            $table->timestamps();

            $table->unique(['formulario_id','criterion_id']); // 1 respuesta por criterio
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_scores');
        Schema::dropIfExists('scoring_ranges');
        Schema::dropIfExists('scoring_options');
        Schema::dropIfExists('scoring_criteria');
        Schema::dropIfExists('scoring_categories');
    }
};
