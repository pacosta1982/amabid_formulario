
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('scorings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('postulante_id')->unique();
            $table->integer('puntaje_total')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('scorings');
    }
};
