<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('formulario_inscripcion', function (Blueprint $table) {
            //
            $table->unique('postulante_ci');
            $table->unique('postulante_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('formulario_inscripcion', function (Blueprint $table) {
            //
            $table->dropUnique(['postulante_ci']);
            $table->dropUnique(['postulante_email']);
        });
    }
};
