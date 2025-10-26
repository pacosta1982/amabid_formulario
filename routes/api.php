<?php

use App\Http\Controllers\ScoringConfigController;

Route::get('/scoring-config', [ScoringConfigController::class, 'index']);
Route::post('/scoring-config/update', [ScoringConfigController::class, 'update']);
