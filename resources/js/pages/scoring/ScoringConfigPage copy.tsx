import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScoringConfig, Formulario, IntegranteFamiliar } from './types';
import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function ScoringConfigPage() {
  //const [configs, setConfigs] = useState([]);
  const [config, setConfig] = useState<ScoringConfig | null>(null);


useEffect(() => {
  axios.get('/scoring-config').then((res) => {
    const raw = res.data;

    const parsed: ScoringConfig = {
      configuracion: JSON.parse(raw.A1),
      composicionHogar: JSON.parse(raw.A2),
      edades: JSON.parse(raw.A3),
      discapacidad: JSON.parse(raw.B1).si,
    };

    setConfig(parsed);
  });
}, []);

  console.log(config);


const handleChange = (campo: keyof ScoringConfig, valor: Record<string, number> | number) => {
  if (!config) return;

  const actualizado: ScoringConfig = {
    ...config,
    [campo]: valor
  };

  setConfig(actualizado);
};


const handleSave = () => {
  if (!config) return;

  axios.post('/scoring-config/update', config).then(() => {
    alert('Guardado');
  });
};

if (!config) return <p>Cargando configuración...</p>;

else

 return (
    <>
       <AppLayout>
        <Head title="Evaluación de Scoring" />
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4"></div>
                    <div className="container mt-4">
                        <h2>Parámetros de Scoring</h2>
                        {Object.entries(config).map(([key, value], idx) => (
                        <div key={idx} className="mb-3">
                            <label><strong>{key}</strong></label>
                            <textarea
                            className="form-control"
                            rows={3}
                            value={JSON.stringify(value, null, 2)}
                            onChange={(e) =>
                                handleChange(
                                key as keyof ScoringConfig,
                                JSON.parse(e.target.value)
                                )
                            }
                            />
                        </div>
                        ))}

                        <button className="btn btn-primary" onClick={handleSave}>
                        Guardar cambios
                        </button>
            </div>
            </div>

        </AppLayout>
    </>
);

}
