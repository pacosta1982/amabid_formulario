// resources/js/pages/scoring/Evaluar.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import AlertMessage from '@/components/AlertMessage';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type SharedData = {
  formularioId?: number; // lo podés pasar desde el controlador Inertia
};

type Category = {
  id: number;
  code: string;
  name: string;
  sort_order: number;
};

type Criterion = {
  id: number;
  category_id: number;
  code: string | null;
  name: string;
  input_type: 'select' | 'boolean' | 'number';
  source_field?: string | null;
  sort_order: number;
};

type Option = {
  id: number;
  criterion_id: number;
  label: string;
  points: number;
  sort_order: number;
};

type Range = {
  id: number;
  criterion_id: number;
  min_value: number | null;
  max_value: number | null;
  points: number;
  sort_order: number;
};

type Answers = Record<
  number, // criterion_id
  { option_id?: number; numeric_value?: number }
>;

export default function Evaluar() {
  const { props } = usePage<{ auth?: any } & SharedData>();
  const formularioId = props.formularioId as number; // asegurate de pasarlo desde Laravel

  const [loading, setLoading] = useState(true);
  const [schemaLoading, setSchemaLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info' | 'warning'; message: string } | null>(null);

  const [cats, setCats] = useState<Category[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [options, setOptions] = useState<Record<number, Option[]>>({});
  const [ranges, setRanges] = useState<Record<number, Range[]>>({});

  const [answers, setAnswers] = useState<Answers>({});
  const [totals, setTotals] = useState<{ per_category: Record<number, { name: string; subtotal: number }>; total: number } | null>(null);

  const routeUrl = (name: string, param?: number | string) => {
    // Si tenés ziggy/route helper, usalo. Si no, fallback plano:
    try {
      // @ts-ignore
      if (typeof route === 'function') return param !== undefined ? route(name, param) : route(name);
    } catch (_) {}
    switch (name) {
      case 'scoring.schema':
        return '/scoring/schema';
      case 'scoring.evaluate':
        return `/scoring/evaluate/${param}`;
      case 'scoring.current':
        return `/scoring/current/${param}`;
      default:
        return '/';
    }
  };

  // Cargar esquema de scoring
  useEffect(() => {
    let mounted = true;
    const fetchSchema = async () => {
      setSchemaLoading(true);
      try {
        const { data } = await axios.get(routeUrl('scoring.schema'));
        if (!mounted) return;

        setCats(data.cats as Category[]);
        setCriteria(data.criterios as Criterion[]);
        setOptions(data.options as Record<number, Option[]>);
        setRanges(data.ranges as Record<number, Range[]>);
      } catch (e) {
        setAlert({ type: 'error', message: 'No se pudo cargar el esquema de scoring.' });
      } finally {
        setSchemaLoading(false);
      }
    };
    fetchSchema();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cargar puntuación actual (si existe) para prellenar
  useEffect(() => {
    if (!formularioId) return;
    let mounted = true;
    const loadCurrent = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(routeUrl('scoring.current', formularioId));
        if (!mounted) return;
        // Reconstruir respuestas desde detalle existente
        const a: Answers = {};
        (data.detail as any[]).forEach((row) => {
          a[row.criterion_id] = {};
          if (row.option_id) a[row.criterion_id].option_id = row.option_id;
          if (row.numeric_value !== null && row.numeric_value !== undefined) a[row.criterion_id].numeric_value = Number(row.numeric_value);
        });
        setAnswers(a);
        if (typeof data.total === 'number') {
          // No tenemos per_category acá, solo total; se actualizará al guardar.
          setTotals((prev) => prev ?? { per_category: {}, total: data.total });
        }
      } catch {
        // silencio: puede no haber evaluación previa
      } finally {
        setLoading(false);
      }
    };
    loadCurrent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formularioId]);

  const criteriaByCategory = useMemo(() => {
    const map: Record<number, Criterion[]> = {};
    criteria.forEach((c) => {
      if (!map[c.category_id]) map[c.category_id] = [];
      map[c.category_id].push(c);
    });
    // ordenar por sort_order
    Object.keys(map).forEach((k) => map[Number(k)].sort((a, b) => a.sort_order - b.sort_order));
    return map;
  }, [criteria]);

  const onSelectChange = (criterionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [criterionId]: { option_id: optionId } }));
  };

  const onNumberChange = (criterionId: number, val: string) => {
    const n = val === '' ? undefined : Number(val);
    setAnswers((prev) => ({ ...prev, [criterionId]: { numeric_value: n } }));
  };

  const save = async () => {
    if (!formularioId) {
      setAlert({ type: 'error', message: 'Falta el identificador del formulario.' });
      return;
    }
    try {
      const { data } = await axios.post(routeUrl('scoring.evaluate', formularioId), { answers });
      setTotals(data);
      setAlert({ type: 'success', message: 'Scoring guardado correctamente.' });
    } catch (e: any) {
      let msg = 'No se pudo guardar el scoring.';
      if (e?.response?.data?.message) msg = e.response.data.message;
      setAlert({ type: 'error', message: msg });
    }
  };

  return (
    <>
      <AppLayout>
      <Head title="Evaluación de Scoring" />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Evaluación de Scoring</h1>

        {alert && (
          <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        )}

        {(schemaLoading || loading) && (
          <div className="mb-4 p-3 border rounded bg-white">Cargando…</div>
        )}

        {!schemaLoading && cats.length === 0 && (
          <div className="mb-4 p-3 border rounded bg-white">
            No hay criterios configurados. Cargá el esquema primero.
          </div>
        )}

        {!schemaLoading && cats.length > 0 && (
          <>
            {cats.sort((a, b) => a.sort_order - b.sort_order).map((cat) => (
              <div key={cat.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-3">
                  {cat.code}. {cat.name}
                </h2>

                <div className="bg-white border rounded">
                  {(criteriaByCategory[cat.id] ?? []).map((crit) => (
                    <div key={crit.id} className="p-3 border-b last:border-b-0">
                      <div className="mb-2 font-medium">
                        {crit.code ? `${crit.code}. ` : ''}{crit.name}
                      </div>

                      {crit.input_type === 'select' || crit.input_type === 'boolean' ? (
                        <select
                          className="w-full border rounded px-3 py-2"
                          value={answers[crit.id]?.option_id ?? ''}
                          onChange={(e) => onSelectChange(crit.id, Number(e.target.value))}
                        >
                          <option value="">Seleccione…</option>
                          {(options[crit.id] ?? [])
                            .sort((a, b) => a.sort_order - b.sort_order)
                            .map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label} ( {opt.points} pts )
                              </option>
                            ))}
                        </select>
                      ) : null}

                      {crit.input_type === 'number' ? (
                        <div className="flex gap-3">
                          <input
                            type="number"
                            className="w-40 border rounded px-3 py-2"
                            placeholder="Valor…"
                            value={answers[crit.id]?.numeric_value ?? ''}
                            onChange={(e) => onNumberChange(crit.id, e.target.value)}
                          />
                          <div className="text-sm text-gray-600 self-center">
                            {((ranges[crit.id] ?? []).length > 0) && (
                              <span>
                                Rango →{' '}
                                {(ranges[crit.id] ?? [])
                                  .sort((a, b) => a.sort_order - b.sort_order)
                                  .map((r, i) => (
                                    <span key={r.id}>
                                      {r.min_value ?? '–'}–{r.max_value ?? '∞'}: <b>{r.points}</b> pts{ i < (ranges[crit.id].length - 1) ? ', ' : '' }
                                    </span>
                                  ))}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Totales */}
            <div className="bg-white border rounded p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3">Totales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {totals && Object.entries(totals.per_category || {}).map(([catId, obj]) => (
                  <div key={catId} className="border rounded p-3">
                    <div className="font-medium">{obj.name}</div>
                    <div className="text-2xl">{obj.subtotal} pts</div>
                  </div>
                ))}
                <div className="border rounded p-3 md:col-span-2">
                  <div className="font-medium">TOTAL</div>
                  <div className="text-3xl">{totals?.total ?? 0} pts</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={save}
              >
                Guardar scoring
              </button>
            </div>
          </>
        )}
      </div>
      </AppLayout>
    </>
  );
}
