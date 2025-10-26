<?php

namespace App\Http\Controllers;

use App\Models\FormularioInscripcion;
use App\Models\GrupoFamiliar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FormularioController extends Controller
{
    public function index()
    {
        // Renderiza la página Inertia con React
        return Inertia::render('formulario/Formulario');
    }

    public function show($id)
    {
        $postulante = FormularioInscripcion::findOrFail($id);
        return response()->json($postulante);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'datos.postulante.nombre' => 'required|string|max:255',
            'datos.postulante.ci' => 'required|string|max:255|unique:formulario_inscripcion,postulante_ci',
            'datos.postulante.fechaNacimiento' => 'required|date',
            'datos.postulante.estadoCivil' => 'required|string|max:100',
            'datos.postulante.edad' => 'required|integer|min:1',
            'datos.postulante.nacionalidad' => 'required|string|max:100',
            'datos.postulante.escolaridad' => 'required|string|max:100',
            'datos.postulante.telefono' => 'required|string|max:50',
            'datos.postulante.email' => 'required|email|max:255|unique:formulario_inscripcion,postulante_email',
            // demás campos no obligatorios
            // el resto no obligatorios
            'datos' => ['required','array'],
            'familia' => ['nullable','array'],
        ]);

        return DB::transaction(function () use ($data) {
            $d = $data['datos'];

            $form = FormularioInscripcion::create([
                // Postulante
                'postulante_nombre' => $d['postulante']['nombre'] ?? null,
                'postulante_ci' => $d['postulante']['ci'] ?? null,
                'postulante_fecha_nacimiento' => $d['postulante']['fechaNacimiento'] ?? null,
                'postulante_estado_civil' => $d['postulante']['estadoCivil'] ?? null,
                'postulante_edad' => $d['postulante']['edad'] ?? null,
                'postulante_nacionalidad' => $d['postulante']['nacionalidad'] ?? null,
                'postulante_escolaridad' => $d['postulante']['escolaridad'] ?? null,
                'postulante_telefono' => $d['postulante']['telefono'] ?? null,
                'postulante_contacto_alternativo' => $d['postulante']['contactoAlternativo'] ?? null,
                'postulante_email' => $d['postulante']['email'] ?? null,


                'postulante_profesion' => $d['postulante']['profesion'] ?? null,
                'postulante_actividad' => $d['postulante']['actividad'] ?? null,
                'postulante_ingreso' => $d['postulante']['ingreso'] ?? null,
                'postulante_ruc_activo' => $d['postulante']['rucActivo'] ?? false,

                // Inmueble
                'inmueble_titulo_propiedad' => $d['inmueble']['tituloPropiedad'] ?? null,
                'inmueble_comprobante_pago' => $d['inmueble']['comprobantePago'] ?? null,
                'inmueble_otro_documento' => $d['inmueble']['otroDocumento'] ?? null,
                'inmueble_conexion_ande' => $d['inmueble']['conexionANDE'] ?? null,
                'inmueble_finca_matricula' => $d['inmueble']['fincaMatricula'] ?? null,
                'inmueble_direccion' => $d['inmueble']['direccion'] ?? null,
                'inmueble_barrio' => $d['inmueble']['barrio'] ?? null,
                'inmueble_municipio' => $d['inmueble']['municipio'] ?? null,
                'inmueble_padron' => $d['inmueble']['padron'] ?? null,
                'inmueble_subsidio_anterior' => $d['inmueble']['subsidioAnterior'] ?? null,

                // Pareja
                'pareja_nombre' => $d['pareja']['nombre'] ?? null,
                'pareja_ci' => $d['pareja']['ci'] ?? null,
                'pareja_fecha_nacimiento' => $d['pareja']['fechaNacimiento'] ?? null,
                'pareja_estado_civil' => $d['pareja']['estadoCivil'] ?? null,
                'pareja_edad' => $d['pareja']['edad'] ?? null,
                'pareja_nacionalidad' => $d['pareja']['nacionalidad'] ?? null,
                'pareja_escolaridad' => $d['pareja']['escolaridad'] ?? null,
                'pareja_telefono' => $d['pareja']['telefono'] ?? null,
                'pareja_email' => $d['pareja']['email'] ?? null,
                'pareja_profesion' => $d['pareja']['profesion'] ?? null,
                'pareja_actividad' => $d['pareja']['actividad'] ?? null,
                'pareja_ingreso' => $d['pareja']['ingreso'] ?? null,
                'pareja_ruc_activo' => $d['pareja']['rucActivo'] ?? false,
                'pareja_subsidio_anterior' => $d['pareja']['subsidioAnterior'] ?? false,

                // Compromiso
                'compromiso_ahorro' => $d['compromiso']['habilitaAhorro'] ?? null,
                'compromiso_cooperativa' => $d['compromiso']['asociacionCooperativa'] ?? null,

                // Salud
                'salud_discapacidad' => $d['salud']['discapacidad'] ?? false,
                'salud_tipo_discapacidad' => $d['salud']['tipoDiscapacidad'] ?? null,
                'salud_embarazo' => $d['salud']['embarazo'] ?? false,
                'salud_gestacion' => $d['salud']['gestacion'] ?? null,
                'salud_enfermedad' => $d['salud']['enfermedad'] ?? false,
                'salud_enfermedad_descripcion' => $d['salud']['enfermedadDescripcion'] ?? null,
                'salud_responsable_cuidados' => $d['salud']['responsableCuidados'] ?? false,
                'salud_afecta_actividades' => $d['salud']['afectaActividades'] ?? false,

                // Identidad
                'identidad_grupo_etnico' => $d['identidad']['grupoEtnico'] ?? null,
                'identidad_grupo_etnico_otro' => $d['identidad']['grupoEtnicoOtro'] ?? null,
                'identidad_genero' => $d['identidad']['genero'] ?? null,
                'identidad_genero_otro' => $d['identidad']['generoOtro'] ?? null,

                // Documentos
                'doc_cedula' => $d['documentos']['cedula'] ?? false,
                'doc_titulo' => $d['documentos']['tituloPropiedad'] ?? false,
                'doc_comprobante_ingreso' => $d['documentos']['comprobanteIngreso'] ?? false,
                'doc_sociales' => $d['documentos']['documentosSociales'] ?? false,

                // Mejoras
                'mejoras' => $d['mejoras'] ?? null,
                'observaciones' => $d['observaciones'] ?? null,
            ]);

            foreach (($data['familia'] ?? []) as $f) {
                $form->familiares()->create([
                    'nombre' => $f['nombre'] ?? null,
                    'ci' => $f['ci'] ?? null,
                    'edad' => $f['edad'] ?? null,
                    'parentesco' => $f['parentesco'] ?? null,
                    'escolaridad' => $f['escolaridad'] ?? null,
                    'ocupacion' => $f['ocupacion'] ?? null,
                ]);
            }

            return response()->json(['ok' => true, 'id' => $form->id]);
        });
    }

    public function showScoring(int $id)
{
    // Opcional: validá que exista
    $form = FormularioInscripcion::findOrFail($id);

    return Inertia::render('scoring/Evaluar', [
        'formularioId' => $form->id,
        // Podés enviar datos del postulante para cabecera si querés:
        'postulante' => [
            'nombre' => $form->postulante_nombre,
            'ci'     => $form->postulante_ci,
            'email'  => $form->postulante_email,
        ],
    ]);
}
}
