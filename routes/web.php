<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormularioController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/formulario', [FormularioController::class, 'index'])->name('formulario.index');
Route::post('/formulario', [FormularioController::class, 'store'])->name('formulario.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
