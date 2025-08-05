<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormularioInscripcion extends Model
{
    protected $table = 'formulario_inscripcion';

    protected $fillable = [
        // Postulante
        'postulante_nombre','postulante_ci','postulante_fecha_nacimiento',
        'postulante_estado_civil','postulante_edad','postulante_nacionalidad',
        'postulante_escolaridad','postulante_telefono','postulante_contacto_alternativo',
        'postulante_email','postulante_profesion','postulante_actividad',
        'postulante_ingreso','postulante_ruc_activo',

        // Inmueble
        'inmueble_titulo_propiedad','inmueble_comprobante_pago','inmueble_otro_documento',
        'inmueble_conexion_ande','inmueble_finca_matricula','inmueble_direccion',
        'inmueble_barrio','inmueble_municipio','inmueble_padron','inmueble_subsidio_anterior',

        // Pareja
        'pareja_nombre','pareja_ci','pareja_fecha_nacimiento','pareja_estado_civil',
        'pareja_edad','pareja_nacionalidad','pareja_escolaridad','pareja_telefono',
        'pareja_email','pareja_profesion','pareja_actividad','pareja_ingreso',
        'pareja_ruc_activo','pareja_subsidio_anterior',

        // Compromiso
        'compromiso_ahorro','compromiso_cooperativa',

        // Salud
        'salud_discapacidad','salud_tipo_discapacidad','salud_embarazo',
        'salud_gestacion','salud_enfermedad','salud_enfermedad_descripcion',
        'salud_responsable_cuidados','salud_afecta_actividades',

        // Identidad
        'identidad_grupo_etnico','identidad_grupo_etnico_otro','identidad_genero','identidad_genero_otro',

        // Documentos
        'doc_cedula','doc_titulo','doc_comprobante_ingreso','doc_sociales',

        // Mejoras
        'mejoras','observaciones'
    ];

    public function familiares(): HasMany
    {
        return $this->hasMany(GrupoFamiliar::class, 'formulario_id');
    }
}
