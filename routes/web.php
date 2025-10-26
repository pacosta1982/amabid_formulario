<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\FormularioBackendController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\ScoringConfigController;
use App\Http\Controllers\GrupoFamiliarController;


Route::get('/scoring-config', [ScoringConfigController::class, 'index']);
Route::post('/scoring-config/update', [ScoringConfigController::class, 'update']);
Route::get('/formulario/{id}', [FormularioController::class, 'show']);
Route::get('/grupo-familiar/{id}', [GrupoFamiliarController::class, 'show']);

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/postulantes', [FormularioBackendController::class, 'index'])->name('postulantes.index');
    Route::get('/postulantes/{id}', [FormularioBackendController::class, 'show'])->name('postulantes.show');
    Route::get('/postulantes/{id}/scoring', [FormularioBackendController::class, 'showScoring'])->name('postulantes.scoring'); // ya lo tenés
});

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/configuracion', [ScoringConfigController::class, 'show']);
    //Route::get('/postulantes/{id}', [FormularioBackendController::class, 'show'])->name('postulantes.show');
    //Route::get('/postulantes/{id}/scoring', [FormularioBackendController::class, 'showScoring'])->name('postulantes.scoring'); // ya lo tenés
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/formulario', [FormularioController::class, 'index'])->name('formulario.index');
Route::post('/formulario', [FormularioController::class, 'store'])->name('formulario.store');



Route::get('/postulantes/{id}/scoring', [FormularioController::class, 'showScoring'])
    ->name('postulantes.scoring');




Route::get('/scoring/schema', [ScoreController::class, 'schema'])->name('scoring.schema');
Route::post('/scoring/evaluate/{formularioId}', [ScoreController::class, 'evaluate'])->name('scoring.evaluate');
Route::get('/scoring/current/{formularioId}', [ScoreController::class, 'currentScore'])->name('scoring.current');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
