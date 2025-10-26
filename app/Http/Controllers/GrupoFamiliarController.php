<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GrupoFamiliar;

class GrupoFamiliarController extends Controller
{
    public function show($id)
    {
        $grupo = GrupoFamiliar::where('formulario_id', $id)->get();
        return response()->json($grupo);
    }
}
