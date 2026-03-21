export function VisionSection() {
  return (
    <section id="vision" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-slate-900">Visión &amp; Misión</h2>
        <p className="mt-4 text-slate-600">
          En Cross Insurance acompañamos a personas y negocios de Puerto Rico con tecnología y 17 años de
          experiencia, ofreciendo guía cercana y protección clara para los momentos inesperados.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Visión</h3>
            <p className="mt-4 text-slate-600">
              Ser el aliado de confianza que brinda transparencia y seguridad, uniendo tecnología y cercanía
              humana para que cada cliente sienta que está en buenas manos.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Misión</h3>
            <p className="mt-4 text-slate-600">
              Caminar con cada cliente desde el inicio, escuchando, simplificando procesos y respondiendo con
              empatía y agilidad para proteger lo que importa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
