// resources/js/pages/postulantes/Index.tsx
import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Item = {
  id: number;
  nombre: string;
  ci: string;
  email: string;
  created_at: string;
};

type PaginationLink = { url: string|null; label: string; active: boolean };
type PageProps = {
  filters: { q?: string };
  items: {
    data: Item[];
    links: PaginationLink[];
  };
};

export default function Index() {
  const { props } = usePage<PageProps>();
  const { filters, items } = props;
  const [q, setQ] = useState(filters.q ?? '');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('postulantes.index'), { q }, { preserveState: true, preserveScroll: true });
  };

  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: 'Postulantes',
          href: '/postulantes',
      },
  ];

  return (
    <>
    <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Postulantes" />
                <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-blue-600">Postulantes</h1>
          <form onSubmit={submit} className="flex gap-2">
            <input
              className="border rounded px-3 py-2"
              placeholder="Buscar por nombre, CI o email…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Buscar</button>
          </form>
        </div>

        <div className="overflow-x-auto bg-white border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Nombre</th>
                <th className="text-left p-3">CI</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Creado</th>
                <th className="text-right p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.data.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="p-3">{it.id}</td>
                  <td className="p-3">{it.nombre}</td>
                  <td className="p-3">{it.ci}</td>
                  <td className="p-3">{it.email}</td>
                  <td className="p-3">{it.created_at}</td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={route('postulantes.show', it.id)}
                        className="px-3 py-1 rounded border text-blue-700 border-blue-600 hover:bg-blue-50"
                      >
                        Ver detalle
                      </Link>
                      <Link
                        href={route('postulantes.scoring', it.id)}
                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Evaluar scoring
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {items.data.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={6}>
                    No hay resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación simple */}
        <div className="flex flex-wrap gap-2 mt-4">
          {items.links.map((l, i) => (
            <Link
              key={`${l.label}-${i}`}
              href={l.url || '#'}
              className={`px-3 py-1 rounded border ${l.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'}`}
              preserveScroll
              preserveState
            >
              {/* Quitar entidades HTML de Laravel (<<, <, >, >>) */}
              {l.label.replace('&laquo;', '«').replace('&raquo;', '»')}
            </Link>
          ))}
        </div>
      </div>
            </AppLayout>


    </>
  );
}
