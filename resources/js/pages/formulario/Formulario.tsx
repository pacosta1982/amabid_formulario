import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

// Importá tus componentes de tabs:
import PostulanteTab from '@/components/PostulanteTab';
import ParejaTab from '@/components/ParejaTab';
import InmuebleTab from '@/components/InmuebleTab';
import CompromisoTab from '@/components/CompromisoTab';
import GrupoFamiliarTab from '@/components/GrupoFamiliarTab';
import SaludTab from '@/components/SaludTab';
import IdentidadTab from '@/components/IdentidadTab';
import DocumentosTab from '@/components/DocumentosTab';
import MejorasTab from '@/components/MejorasTab';
import AlertMessage from '@/components/AlertMessage';

export default function Formulario() {
  const [active, setActive] = useState('postulante');
  const MAX_INGRESO = 10000000; // ₲10.000.000


  const datosIniciales = {
  postulante: {
    nombre: '',
    ci: '',
    fechaNacimiento: '',
    estadoCivil: '',
    edad: '',
    nacionalidad: '',
    escolaridad: '',
    telefono: '',
    contactoAlternativo: '',
    email: '',
    profesion: '',
    actividad: '',
    ingreso: '',
    rucActivo: false,
  },
  pareja: {
    nombre: '',
    ci: '',
    fechaNacimiento: '',
    estadoCivil: '',
    edad: '',
    nacionalidad: '',
    escolaridad: '',
    telefono: '',
    email: '',
    profesion: '',
    actividad: '',
    ingreso: '',
    rucActivo: false,
    subsidioAnterior: false,
    discapacidad:false,
    tipoDiscapacidad:'',
    embarazo:false,
    gestacion:'',
    enfermedad:false,
    enfermedadDescripcion:'',
    responsableCuidados:false,
    afectaActividades:false
  },
  inmueble: { tituloPropiedad:'', comprobantePago:'', otroDocumento:'', conexionANDE:'', fincaMatricula:'', direccion:'', barrio:'', municipio:'', padron:'', subsidioAnterior:'' },
  compromiso: { habilitaAhorro:'', asociacionCooperativa:'' },
  salud: { discapacidad:false, tipoDiscapacidad:'', embarazo:false, gestacion:'', enfermedad:false, enfermedadDescripcion:'', responsableCuidados:false, afectaActividades:false },
  identidad: { grupoEtnico:'', grupoEtnicoOtro:'', genero:'', generoOtro:'' },
  documentos: { cedula:false, tituloPropiedad:false, comprobanteIngreso:false, documentosSociales:false },
  mejoras: '', observaciones: '',
  // ... también los demás bloques como inmueble, compromiso, salud, etc.
};

const [datos, setDatos] = useState(datosIniciales);

  /*const [datos, setDatos] = useState<any>({
    postulante: { nombre:'', ci:'', fechaNacimiento:'', estadoCivil:'', edad:'', nacionalidad:'', escolaridad:'', telefono:'', contactoAlternativo:'', email:'', profesion:'', actividad:'', ingreso:'', rucActivo:false },
    pareja: { nombre:'', ci:'', fechaNacimiento:'', estadoCivil:'', edad:'', nacionalidad:'', escolaridad:'', telefono:'', email:'', profesion:'', actividad:'', ingreso:'', rucActivo:false, subsidioAnterior:false },
    inmueble: { tituloPropiedad:'', comprobantePago:'', otroDocumento:'', conexionANDE:'', fincaMatricula:'', direccion:'', barrio:'', municipio:'', padron:'', subsidioAnterior:'' },
    compromiso: { habilitaAhorro:'', asociacionCooperativa:'' },
    salud: { discapacidad:false, tipoDiscapacidad:'', embarazo:false, gestacion:'', enfermedad:false, enfermedadDescripcion:'', responsableCuidados:false, afectaActividades:false },
    identidad: { grupoEtnico:'', grupoEtnicoOtro:'', genero:'', generoOtro:'' },
    documentos: { cedula:false, tituloPropiedad:false, comprobanteIngreso:false, documentosSociales:false },
    mejoras: '', observaciones: '',
  });*/

  const [familia, setFamilia] = useState<any[]>([]);
  const [alert, setAlert] = useState<{ type: string, message: string } | null>(null);

  const handleChange = (seccion: string, campo: string|null, valor: any) => {
    if (campo === null) {
      setDatos((prev: any) => ({ ...prev, [seccion]: valor }));
    } else {
      setDatos((prev: any) => ({
        ...prev,
        [seccion]: { ...prev[seccion], [campo]: valor }
      }));
    }
  };

  const handleFamiliaChange = (index: number, campo: string, valor: any) => {
    const arr = [...familia];
    arr[index] = { ...arr[index], [campo]: valor };
    setFamilia(arr);
  };
  const agregarIntegrante = () => setFamilia([...familia, { nombre:'', ci:'', edad:'', parentesco:'', escolaridad:'', ocupacion:'' }]);
  const eliminarIntegrante = (i: number) => setFamilia(familia.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
  // Validación básica en frontend
  const p = datos.postulante;
  if (!p.nombre || !p.ci || !p.fechaNacimiento || !p.estadoCivil || !p.edad || !p.nacionalidad || !p.escolaridad || !p.telefono || !p.email) {
    setAlert({ type: 'error', message: 'Por favor complete todos los campos obligatorios del Postulante.' });
    return;
  }

 try {
  await axios.post(route('formulario.store'), { datos, familia });
  setAlert({ type: 'success', message: 'Formulario enviado correctamente.' });
  setDatos(datosIniciales);
  setFamilia([]);

} catch (error: any) {
  if (error.response && error.response.status === 422) {
    const firstError = Object.values(error.response.data.errors)[0] as string[];
    setAlert({ type: 'error', message: firstError[0] });
  } else {
    setAlert({ type: 'error', message: 'Ocurrió un error al guardar.' });
  }
}
};

  const tabs = [
    { key:'postulante', label:'Postulante', content: <PostulanteTab datos={datos} handleChange={handleChange}/> },
    { key:'pareja', label:'Pareja', content: <ParejaTab datos={datos} handleChange={handleChange}/> },
    { key:'inmueble', label:'Inmueble', content: <InmuebleTab datos={datos} handleChange={handleChange}/> },
    { key:'compromiso', label:'Compromiso', content: <CompromisoTab datos={datos.compromiso} handleChange={handleChange}/> },
    { key:'familia', label:'Grupo Familiar', content:
        <GrupoFamiliarTab
          familia={familia}
          handleFamiliaChange={handleFamiliaChange}
          agregarIntegrante={agregarIntegrante}
          eliminarIntegrante={eliminarIntegrante}
        />
    },
    /*{ key:'salud', label:'Salud', content: <SaludTab datos={datos.salud} handleChange={handleChange}/> },*/
    { key:'identidad', label:'Identidad', content: <IdentidadTab datos={datos.identidad} handleChange={handleChange}/> },
    { key:'documentos', label:'Documentos', content: <DocumentosTab datos={datos.documentos} handleChange={handleChange}/> },
    { key:'mejoras', label:'Mejoras y Observaciones', content: <MejorasTab datos={datos} handleChange={handleChange}/> },
  ];

  return (
    <>
      <Head title="Formulario de Inscripción" />
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center" >Formulario de Inscripción</h2>

        {alert && (
  <AlertMessage
    type={alert.type as any}
    message={alert.message}
    onClose={() => setAlert(null)}
  />
)}

        {/* Tabs Bootstrap-like simples con Tailwind (o reemplazá por nav-tabs si usás Bootstrap) */}
        <div className="flex flex-wrap gap-3 mb-4">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`px-3 py-2 rounded border ${active===t.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white border rounded p-4">
          {tabs.find(t => t.key === active)?.content}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Guardar en Base de Datos
          </button>
        </div>
      </div>
    </>
  );
}
