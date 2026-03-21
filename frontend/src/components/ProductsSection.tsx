import Link from "next/link";

const products = [
  {
    title: "Autos",
    description: "Coberturas completas, responsabilidad pública y asistencia en carretera.",
  },
  {
    title: "Vida",
    description: "Planes flexibles para proteger a tu familia y planificar el futuro.",
  },
  {
    title: "Propiedad",
    description: "Seguros residenciales y comerciales contra daños y desastres naturales.",
  },
  {
    title: "Comerciales",
    description: "Pólizas personalizadas para negocios, responsabilidad civil y más.",
  },
  {
    title: "Anualidades",
    description: "Soluciones de ahorro y retiro con respaldo confiable.",
  },
  {
    title: "Otros",
    description: "Planes especializados para embarcaciones, viajes, salud suplementaria y más.",
  },
];

export function ProductsSection() {
  return (
    <section id="productos" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Productos y Servicios</h2>
            <p className="mt-3 max-w-2xl text-slate-200">
              Ofrecemos un portafolio amplio de soluciones para individuos y
              empresas. Diseñamos paquetes integrales según las necesidades de cada cliente.
            </p>
          </div>
          <Link
            href="#cotizacion"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Agendar asesoría
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white">{product.title}</h3>
              <p className="mt-3 text-sm text-slate-200">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
