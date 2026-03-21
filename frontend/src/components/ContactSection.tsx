import Link from "next/link";

import { QuoteForm } from "@/components/QuoteForm";
import { config } from "@/lib/config";

export function ContactSection() {
  return (
    <section
      id="cotizacion"
      className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-start"
    >
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-semibold text-slate-900">
          Trabaja con un asesor de confianza
        </h2>
        <p className="mt-4 text-slate-600">
          Nuestro formulario se conecta directo con el CRM para registrar tu
          solicitud, asignar un agente y enviar confirmación automática.
        </p>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-900">WhatsApp:</span>{" "}
            <Link
              href={`https://wa.me/${config.whatsappNumber.replace(/[^\d]/g, "")}`}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {config.whatsappNumber}
            </Link>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Teléfono:</span>{" "}
            <Link
              href={`tel:${config.phoneNumber.replace(/[^\d+]/g, "")}`}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {config.phoneNumber}
            </Link>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Email:</span>{" "}
            <Link
              href={`mailto:${config.supportEmail}`}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {config.supportEmail}
            </Link>
          </p>
        </div>
      </div>
      <div className="lg:w-1/2">
        <QuoteForm />
      </div>
    </section>
  );
}
