"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { config } from "@/lib/config";

type Summary = {
  total_clients: number;
  total_policies: number;
  active_policies: number;
  pending_policies: number;
  renewals_next_30_days: number;
  manual_invoices: number;
  invoices_pending: number;
  leads_last_7_days: number;
};

type RenewalAlert = {
  policy_number: string;
  client: string;
  product: string;
  renewal_date: string | null;
  status: string;
};

type InvoiceAlert = {
  invoice_number: string;
  policy_number: string;
  client: string;
  status: string;
  amount: string;
  due_date: string | null;
  is_manual: boolean;
};

type LeadAlert = {
  name: string;
  insurance_type: string;
  created_at: string;
  phone: string;
};

type DashboardResponse = {
  summary: Summary;
  alerts: {
    renewals: RenewalAlert[];
    invoices: InvoiceAlert[];
    leads: LeadAlert[];
  };
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-PR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function DashboardClient() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${config.apiBaseUrl}/dashboard/metrics/`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (response.status === 403 || response.status === 401) {
          router.push("/login");
          throw new Error(
            "Necesitas iniciar sesión con una cuenta de staff para ver el dashboard.",
          );
        }

        if (!response.ok) {
          throw new Error("No se pudo cargar el dashboard");
        }

        const json = (await response.json()) as DashboardResponse;
        setData(json);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(
            err instanceof Error
              ? err.message
              : "Ocurrió un error al cargar el dashboard.",
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [router]);

  const summaryItems = useMemo(() => {
    if (!data) return [];
    const summary = data.summary;
    return [
      { label: "Clientes", value: summary.total_clients },
      { label: "Pólizas", value: summary.total_policies },
      { label: "Activas", value: summary.active_policies },
      { label: "Pendientes", value: summary.pending_policies },
      { label: "Renovaciones (30d)", value: summary.renewals_next_30_days },
      { label: "Facturas manuales", value: summary.manual_invoices },
      { label: "Facturas pendientes", value: summary.invoices_pending },
      { label: "Leads (7d)", value: summary.leads_last_7_days },
    ];
  }, [data]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${config.apiBaseUrl}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setIsLoggingOut(false);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              CRM Insights
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Dashboard de métricas y alertas
            </h1>
            <p className="mt-2 text-slate-600">
              Debes iniciar sesión en el backend (por ejemplo en /admin/) con una cuenta
              del equipo para visualizar los datos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
            >
              Ir al sitio
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-slate-500">Cargando métricas...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 text-slate-700">
            {error}
          </div>
        )}

        {!isLoading && !error && data && (
          <>
            <section>
              <h2 className="text-xl font-semibold text-slate-900">
                Resumen rápido
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summaryItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              <AlertPanel
                title="Renovaciones próximas"
                subtitle="30 días"
                items={data.alerts.renewals.map((renewal) => ({
                  primary: `${renewal.policy_number} • ${renewal.client}`,
                  secondary: renewal.product,
                  meta: `${formatDate(renewal.renewal_date)} • ${renewal.status}`,
                }))}
              />
              <AlertPanel
                title="Facturas por gestionar"
                subtitle="Pendientes/Manual"
                items={data.alerts.invoices.map((invoice) => ({
                  primary: `${invoice.invoice_number} • ${invoice.client}`,
                  secondary: `Póliza ${invoice.policy_number}`,
                  meta: `${invoice.amount} • ${invoice.status} • ${formatDate(invoice.due_date)}`,
                }))}
              />
              <AlertPanel
                title="Leads recientes"
                subtitle="Últimos 5"
                items={data.alerts.leads.map((lead) => ({
                  primary: `${lead.name} (${lead.insurance_type})`,
                  secondary: lead.phone,
                  meta: formatDate(lead.created_at),
                }))}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}

type AlertItem = {
  primary: string;
  secondary?: string;
  meta?: string;
};

type AlertPanelProps = {
  title: string;
  subtitle?: string;
  items: AlertItem[];
};

function AlertPanel({ title, subtitle, items }: AlertPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {items.length}
        </span>
      </div>
      <div className="mt-5 space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-slate-500">Sin alertas en este momento.</p>
        )}
        {items.map((item, index) => (
          <div key={`${item.primary}-${index}`} className="rounded-xl border border-slate-100 p-3">
            <p className="text-sm font-semibold text-slate-900">{item.primary}</p>
            {item.secondary && (
              <p className="text-xs text-slate-500">{item.secondary}</p>
            )}
            {item.meta && (
              <p className="text-xs text-slate-500">{item.meta}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
