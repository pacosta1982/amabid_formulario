<?php

namespace App\Http\Controllers;

use App\Models\FormularioInscripcion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormularioBackendController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->string('q')->toString();

        $query = FormularioInscripcion::query()
            ->when($q, function ($qb) use ($q) {
                $qb->where('postulante_nombre', 'ilike', "%{$q}%")
                   ->orWhere('postulante_ci', 'ilike', "%{$q}%")
                   ->orWhere('postulante_email', 'ilike', "%{$q}%");
            })
            ->orderByDesc('id');

        $items = $query->paginate(10)->withQueryString();

        // Datos mínimos para la lista
        $items->getCollection()->transform(function ($row) {
            return [
                'id' => $row->id,
                'nombre' => $row->postulante_nombre,
                'ci' => $row->postulante_ci,
                'email' => $row->postulante_email,
                'created_at' => $row->created_at?->format('Y-m-d H:i'),
            ];
        });

        return Inertia::render('postulantes/Index', [
            'filters' => ['q' => $q],
            'items'   => $items,
        ]);
    }

    public function show(int $id)
    {
        $form = FormularioInscripcion::with('familiares')->findOrFail($id);

        // Estructura amigable para el front
        return Inertia::render('postulantes/Show', [
            'formulario' => [
                'id' => $form->id,
                'created_at' => $form->created_at?->format('Y-m-d H:i'),
                'postulante' => [
                    'nombre' => $form->postulante_nombre,
                    'ci' => $form->postulante_ci,
                    'fechaNacimiento' => $form->postulante_fecha_nacimiento,
                    'estadoCivil' => $form->postulante_estado_civil,
                    'edad' => $form->postulante_edad,
                    'nacionalidad' => $form->postulante_nacionalidad,
                    'escolaridad' => $form->postulante_escolaridad,
                    'telefono' => $form->postulante_telefono,
                    'contactoAlternativo' => $form->postulante_contacto_alternativo,
                    'email' => $form->postulante_email,
                    'profesion' => $form->postulante_profesion,
                    'actividad' => $form->postulante_actividad,
                    'ingreso' => $form->postulante_ingreso,
                    'rucActivo' => (bool) $form->postulante_ruc_activo,
                ],
                'pareja' => [
                    'nombre' => $form->pareja_nombre,
                    'ci' => $form->pareja_ci,
                    'fechaNacimiento' => $form->pareja_fecha_nacimiento,
                    'estadoCivil' => $form->pareja_estado_civil,
                    'edad' => $form->pareja_edad,
                    'nacionalidad' => $form->pareja_nacionalidad,
                    'escolaridad' => $form->pareja_escolaridad,
                    'telefono' => $form->pareja_telefono,
                    'email' => $form->pareja_email,
                    'profesion' => $form->pareja_profesion,
                    'actividad' => $form->pareja_actividad,
                    'ingreso' => $form->pareja_ingreso,
                    'rucActivo' => (bool) $form->pareja_ruc_activo,
                    'subsidioAnterior' => (bool) $form->pareja_subsidio_anterior,
                ],
                'inmueble' => [
                    'tituloPropiedad' => $form->inmueble_titulo_propiedad,
                    'comprobantePago' => $form->inmueble_comprobante_pago,
                    'otroDocumento' => $form->inmueble_otro_documento,
                    'conexionANDE' => $form->inmueble_conexion_ande,
                    'fincaMatricula' => $form->inmueble_finca_matricula,
                    'direccion' => $form->inmueble_direccion,
                    'barrio' => $form->inmueble_barrio,
                    'municipio' => $form->inmueble_municipio,
                    'padron' => $form->inmueble_padron,
                    'subsidioAnterior' => $form->inmueble_subsidio_anterior,
                ],
                'compromiso' => [
                    'habilitaAhorro' => $form->compromiso_ahorro,
                    'asociacionCooperativa' => $form->compromiso_cooperativa,
                ],
                'salud' => [
                    'discapacidad' => (bool) $form->salud_discapacidad,
                    'tipoDiscapacidad' => $form->salud_tipo_discapacidad,
                    'embarazo' => (bool) $form->salud_embarazo,
                    'gestacion' => $form->salud_gestacion,
                    'enfermedad' => (bool) $form->salud_enfermedad,
                    'enfermedadDescripcion' => $form->salud_enfermedad_descripcion,
                    'responsableCuidados' => (bool) $form->salud_responsable_cuidados,
                    'afectaActividades' => (bool) $form->salud_afecta_actividades,
                ],
                'identidad' => [
                    'grupoEtnico' => $form->identidad_grupo_etnico,
                    'grupoEtnicoOtro' => $form->identidad_grupo_etnico_otro,
                    'genero' => $form->identidad_genero,
                    'generoOtro' => $form->identidad_genero_otro,
                ],
                'documentos' => [
                    'cedula' => (bool) $form->doc_cedula,
                    'tituloPropiedad' => (bool) $form->doc_titulo,
                    'comprobanteIngreso' => (bool) $form->doc_comprobante_ingreso,
                    'documentosSociales' => (bool) $form->doc_sociales,
                ],
                'mejoras' => $form->mejoras,
                'observaciones' => $form->observaciones,
                'familia' => $form->familiares->map(function ($f) {
                    return [
                        'id' => $f->id,
                        'nombre' => $f->nombre,
                        'ci' => $f->ci,
                        'edad' => $f->edad,
                        'parentesco' => $f->parentesco,
                        'escolaridad' => $f->escolaridad,
                        'ocupacion' => $f->ocupacion,
                    ];
                })->values(),
            ],
        ]);
    }

    // ya tenías esto:
    public function showScoring(int $id)
    {
        $form = FormularioInscripcion::findOrFail($id);

        return Inertia::render('scoring/Evaluar', [
            'formularioId' => $form->id,
            'postulante' => [
                'nombre' => $form->postulante_nombre,
                'ci'     => $form->postulante_ci,
                'email'  => $form->postulante_email,
            ],
        ]);
    }
}
