<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ScoringConfigController extends Controller
{
    public function index()
    {
        return DB::table('scoring_configs')->get()->pluck('value', 'key');
    }

    public function show()
    {
        // Renderiza la página Inertia con React
        return Inertia::render('scoring/ScoringConfigPage');
    }

    public function update(Request $request)
    {
        $mapeoClaves = [
            'configuracion' => 'A1',
            'composicionHogar' => 'A2',
            'edades' => 'A3',
            'discapacidad' => 'B1',
        ];

        foreach ($mapeoClaves as $frontendKey => $dbKey) {
            if ($request->has($frontendKey)) {
                DB::table('scoring_configs')->updateOrInsert(
                    ['key' => $dbKey],
                    ['value' => json_encode($request->input($frontendKey))]
                );
            }
        }


        /*foreach ($data as $key => $value) {
        DB::table('scoring_configs')->updateOrInsert(
            ['key' => $key],
            ['value' => json_encode($value, JSON_UNESCAPED_UNICODE)] // codificamos para guardar en TEXT
        );
    }*/

        return response()->json(['message' => 'Configuración actualizada.']);
    }
}
