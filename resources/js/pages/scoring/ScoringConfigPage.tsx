import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScoringConfig } from './types'; // Asegurate de importar la interface
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function ScoringConfigPage() {
  const [config, setConfig] = useState<ScoringConfig | null>(null);

  useEffect(() => {
    axios.get('/scoring-config').then((res) => {
      // Parsea los campos que vienen como JSON string
      const parsed: ScoringConfig = {
        configuracion: JSON.parse(res.data.A1),
        composicionHogar: JSON.parse(res.data.A2),
        edades: JSON.parse(res.data.A3),
        discapacidad: JSON.parse(res.data.B1), // si viene un valor numérico
      };
      setConfig(parsed);
    });
  }, []);

  const handleChange = (campo: keyof ScoringConfig, key: string, value: number) => {
    if (!config) return;
    const actualizado: ScoringConfig = {
      ...config,
      [campo]: {
        ...(config[campo] as Record<string, number>),
        [key]: value,
      },
    };
    setConfig(actualizado);
  };

const handleSave = () => {
  if (!config) return;

  axios.post('/scoring-config/update', config)
    .then(() => alert('Guardado'))
    .catch((error) => {
      console.error('Error al guardar configuración', error);
      alert('Error al guardar');
    });
};

  if (!config) return <p>Cargando configuración...</p>;

  return (
  <>
    <AppLayout>
    <Head title="Evaluación de Scoring" />
        <div className="container mx-auto px-4 py-6">
            <div className="container mt-4">
            {Object.entries(config).map(([campo, valores]) => (
                <fieldset key={campo} className="mb-4 border p-3 rounded">
                <legend className="fw-bold">{campo}</legend>
                {typeof valores === 'object' ? (
                    Object.entries(valores).map(([key, val]) => (

                    <div className="mb-2" key={key}>
                        <label className="form-label">{key} =</label>
                        <input
                        type="number"
                        className="form-control ml-2"
                        value={val as number}
                        onChange={(e) =>
                            handleChange(campo as keyof ScoringConfig, key, Number(e.target.value))
                        }
                        />
                    </div>

                    ))
                ) : (
                    <input
                    type="number"
                    className="form-control"
                    value={valores}
                    onChange={(e) =>
                        setConfig({
                        ...config,
                        [campo]: Number(e.target.value),
                        })
                    }
                    />
                )}
                </fieldset>
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
