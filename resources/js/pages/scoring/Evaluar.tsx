import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { ScoringConfig } from './types';
import { ScoringConfig, Formulario, IntegranteFamiliar } from './types';
import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';


export default function Evaluar() {
  const [config, setConfig] = useState<ScoringConfig | null>(null);
  const [formulario, setFormulario] = useState<Formulario | null>(null);
  const [grupoFamiliar, setGrupoFamiliar] = useState<IntegranteFamiliar[]>([]);
  const [criterios, setCriterios] = useState<{ label: string; puntos: number }[]>([]);
  //const { props } = usePage();

  type Familiar = {
  id: number;
  nombre: string;
  ci: string;
  edad: number;
  parentesco: string;
  escolaridad: string;
  ocupacion: string;
};

  type PageProps = {
  formulario: {
    id: number;
    created_at: string;
    postulante: Bloque;
    pareja: Bloque;
    inmueble: Bloque;
    compromiso: Bloque;
    salud: Bloque;
    identidad: Bloque;
    documentos: Bloque;
    mejoras: string | null;
    observaciones: string | null;
    familia: Familiar[];
  };
};


  const { props } = usePage<PageProps>();
  const formularioId = props.formularioId;
  const f = props.formulario;
  //const f = props.formulario;

  const [puntaje, setPuntaje] = useState(0);
  const [fid, setFormId] = useState(0);
  //const [config, setConfig] = useState<ScoringConfig | null>(null);

  type Bloque = Record<string, any>;


  const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white border rounded p-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );

  const GridBlock: React.FC<{ data: Bloque }> = ({ data }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="text-sm">
          <div className="text-gray-500">{k}</div>
          <div className="font-medium">{String(v ?? '')}</div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {

    //console.log('piter');
    //axios.get('/formulario/22').then(res => setFormulario(res.data));
    axios.get(`/formulario/${formularioId}`).then(res => {
    //console.log('Formulario recibido:', res.data); // 👈
    setFormulario(res.data);
    });
    axios.get(`/grupo-familiar/${formularioId}`).then(res => setGrupoFamiliar(res.data));
    //axios.get('/scoring-config').then(res => { console.log('Configuracion recibida:', res.data); setConfig(res.data)});
    axios.get('/scoring-config').then(res => {
    const data = res.data;

    const parsed = {
        configuracion: JSON.parse(data.A1 || '{}'),
        composicionHogar: JSON.parse(data.A2 || '{}'),
        edades: JSON.parse(data.A3 || '{}'),
        discapacidad: JSON.parse(data.B1 || '{}').si || 0
    };

    //console.log('Config transformada:', parsed);
    setConfig(parsed);
    });
  }, []);

useEffect(() => {
  if (!formulario || !grupoFamiliar || !config) return;
    console.log(formulario.postulante_nombre);
    //console.log(formulario.postulante.postulante_nombre);

  let total = 0;
  //console.log(config.configuracion[formulario.configuracion]);
  //console.log('formulario.configuracion:', formulario.configuracion);
  //console.log('config.configuracion:', formulario.configuracion);

  total += config.configuracion[formulario.configuracion] || 0;
//console.log(total);

  //console.log(grupoFamiliar.length + 1);


  const integrantes = grupoFamiliar.length + 1;
  if (integrantes >= 7) total += config.composicionHogar['7+'];
  else if (integrantes >= 5) total += config.composicionHogar['5-6'];
  else if (integrantes >= 3) total += config.composicionHogar['3-4'];
  else total += config.composicionHogar['2-2'];

  //console.log(formularioId);

console.log(f);
  const menores = grupoFamiliar.filter(p => p.edad < 6).length;
  if (menores >= 6) total += config.edades['6+'];
  else if (menores >= 4) total += config.edades['4-5'];
  else if (menores >= 2) total += config.edades['2-3'];
  else total += config.edades['1'];

  const conDiscapacidad = grupoFamiliar.filter(p => p.discapacidad).length;
  if (conDiscapacidad > 0) total += config.discapacidad;

  setPuntaje(total);


  const criteriosCalculados = [];

criteriosCalculados.push({
  label: `Configuración: ${formulario.configuracion}`,
  puntos: config.configuracion[formulario.configuracion] || 0
});

criteriosCalculados.push({
  label: `Composición del hogar: ${integrantes} integrantes`,
  puntos:
    integrantes >= 7 ? config.composicionHogar['7+'] :
    integrantes >= 5 ? config.composicionHogar['5-6'] :
    integrantes >= 3 ? config.composicionHogar['3-4'] :
    config.composicionHogar['2-2']
});

criteriosCalculados.push({
  label: `Menores de 6 años: ${menores}`,
  puntos:
    menores >= 6 ? config.edades['6+'] :
    menores >= 4 ? config.edades['4-5'] :
    menores >= 2 ? config.edades['2-3'] :
    config.edades['1']
});

if (conDiscapacidad > 0) {
  criteriosCalculados.push({
    label: `Personas con discapacidad en el grupo familiar`,
    puntos: config.discapacidad
  });
}

setCriterios(criteriosCalculados);
}, [formulario, grupoFamiliar, config]);


  return (
    <>
      <AppLayout>
       <Head title="Evaluación de Scoring" />
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
                      <h1 className="text-2xl font-bold text-blue-600">
                        Postulante: {formulario?.postulante_nombre ?? 'Sin nombre'}
                      </h1>
                      <div className="flex gap-2">
                        <Link href={route('postulantes.index')} className="px-3 py-2 rounded border text-blue-700 border-blue-600 hover:bg-blue-50">
                          Volver al listado
                        </Link>
                      </div>
                    </div>
            <div className="container mt-4">
            <h2>Evaluación de Scoring</h2>
            <p className="lead">Puntaje total: <strong>{puntaje} pts</strong></p>
            </div>
        </div>
        <Card title="Datos del/la Postulante">
        <GridBlock data={{
            "C.I.": formulario?.postulante_ci,
            "Edad": formulario?.postulante_edad,
            "Estado civil": formulario?.postulante_estado_civil,
            "Escolaridad": formulario?.postulante_escolaridad,
            "Ingreso": formulario?.postulante_ingreso,
        }} />
        </Card>
        <Card title="Detalle de Puntaje Asignado">
  <ul className="list-disc pl-5">
    {criterios.map((c, i) => (
      <li key={i} className="mb-1">
        <span>{c.label}</span>: <strong>{c.puntos} pts</strong>
      </li>
    ))}
  </ul>
</Card>
      </AppLayout>
    </>
  );
}
