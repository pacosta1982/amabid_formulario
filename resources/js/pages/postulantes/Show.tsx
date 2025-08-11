// resources/js/pages/postulantes/Show.tsx
import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Familiar = {
  id: number;
  nombre: string;
  ci: string;
  edad: number;
  parentesco: string;
  escolaridad: string;
  ocupacion: string;
};
type Bloque = Record<string, any>;

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

export default function Show() {
  const { props } = usePage<PageProps>();
  const f = props.formulario;

  const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Postulantes',
            href: '/postulantes',
        },
        {
            title: `Postulante #${f.id}`,
            href: '/',
        },
    ];

  return (
    <>
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Postulante #${f.id}`} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-blue-600">Postulante #{f.id}</h1>
          <div className="flex gap-2">
            <Link href={route('postulantes.index')} className="px-3 py-2 rounded border text-blue-700 border-blue-600 hover:bg-blue-50">
              Volver al listado
            </Link>
            <Link href={route('postulantes.scoring', f.id)} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Evaluar scoring
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Datos del/la Postulante">
            <GridBlock data={f.postulante} />
          </Card>

          <Card title="Datos del/la Pareja">
            <GridBlock data={f.pareja} />
          </Card>

          <Card title="Datos del Inmueble">
            <GridBlock data={f.inmueble} />
          </Card>

          <Card title="Compromiso">
            <GridBlock data={f.compromiso} />
          </Card>

          <Card title="Salud">
            <GridBlock data={f.salud} />
          </Card>

          <Card title="Identidad">
            <GridBlock data={f.identidad} />
          </Card>

          <Card title="Documentos">
            <GridBlock data={f.documentos} />
          </Card>

          <Card title="Mejoras y Observaciones">
            <div className="text-sm">
              <div className="text-gray-500">Mejoras</div>
              <div className="mb-3 whitespace-pre-wrap">{f.mejoras ?? ''}</div>
              <div className="text-gray-500">Observaciones</div>
              <div className="whitespace-pre-wrap">{f.observaciones ?? ''}</div>
            </div>
          </Card>

          <Card title="Grupo Familiar">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">CI</th>
                    <th className="text-left p-2">Edad</th>
                    <th className="text-left p-2">Parentesco</th>
                    <th className="text-left p-2">Escolaridad</th>
                    <th className="text-left p-2">Ocupación</th>
                  </tr>
                </thead>
                <tbody>
                  {f.familia.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2">{p.nombre}</td>
                      <td className="p-2">{p.ci}</td>
                      <td className="p-2">{p.edad}</td>
                      <td className="p-2">{p.parentesco}</td>
                      <td className="p-2">{p.escolaridad}</td>
                      <td className="p-2">{p.ocupacion}</td>
                    </tr>
                  ))}
                  {f.familia.length === 0 && (
                    <tr>
                      <td className="p-3 text-center text-gray-500" colSpan={6}>
                        Sin integrantes cargados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
    </>
  );
}
