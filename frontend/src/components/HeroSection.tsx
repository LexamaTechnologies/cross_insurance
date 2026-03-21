import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row">
        <div className="max-w-xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Corretage de Seguros
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Protegemos tu patrimonio con asesoría cercana y soluciones ágiles.
          </h1>
          <p className="text-lg text-slate-200">
            CRM inteligente, alertas proactivas y un equipo especializado para
            atender a clientes individuales y corporativos en todo Puerto Rico.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#cotizacion"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-600"
            >
              Solicitar cotización
            </Link>
            <Link
              href="#productos"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Ver productos
            </Link>
          </div>
        </div>
        <Image
          src="/images/landing_image.jpeg"
          alt="Landing Image"
          width={400}
          height={400}
          className="h-100 w-100 rounded-full object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
