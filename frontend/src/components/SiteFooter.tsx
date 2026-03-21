import Link from "next/link";

import { config } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer
      id="contacto"
      className="border-t border-slate-200 bg-white py-10 text-sm text-slate-600"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 md:flex-row">
        <div>
          <p className="text-base font-semibold text-slate-900">Cross Insurance</p>
          <p className="mt-2 max-w-md">
            CRM interno, sitio público y automatizaciones integradas para brindar
            un servicio de seguros moderno y confiable.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href={`mailto:${config.supportEmail}`} className="hover:text-slate-900">
            {config.supportEmail}
          </Link>
          <Link
            href={`tel:${config.phoneNumber.replace(/[^\d+]/g, "")}`}
            className="hover:text-slate-900"
          >
            {config.phoneNumber}
          </Link>
          <Link
            href={`https://wa.me/${config.whatsappNumber.replace(/[^\d]/g, "")}`}
            className="hover:text-slate-900"
          >
            WhatsApp directo
          </Link>
        </div>
        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} Cross Insurance. Todos los derechos reservados.
          <p className="mt-1">
            Desarrollado por{" "}
            <a
              href="https://lexamatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Lexama Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
