<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('grupo_familiar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('formulario_id')
                ->constrained('formulario_inscripcion')
                ->cascadeOnDelete();

            $table->string('nombre')->nullable();
            $table->string('ci')->nullable();
            $table->integer('edad')->nullable();
            $table->string('parentesco')->nullable();
            $table->string('escolaridad')->nullable();
            $table->string('ocupacion')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grupo_familiar');
    }
};
