<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GrupoFamiliar extends Model
{
    protected $table = 'grupo_familiar';

    protected $fillable = [
        'formulario_id','nombre','ci','edad','parentesco','escolaridad','ocupacion'
    ];

    public function formulario(): BelongsTo
    {
        return $this->belongsTo(FormularioInscripcion::class, 'formulario_id');
    }
}
