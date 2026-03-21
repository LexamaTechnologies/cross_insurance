const mediaHighlights = [
  {
    title: "Podcast: Lo esencial del seguro de autos",
    description: "Conoce cómo optimizar coberturas y deducibles según tu perfil de riesgo.",
  },
  {
    title: "Video: Guía rápida para preparar tu renovación",
    description:
      "Nuestro equipo explica los documentos que debes tener listos para una transición sin sorpresas.",
  },
];

export function MediaSection() {
  return (
    <section id="media" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-slate-900">Recursos multimedia</h2>
        <p className="mt-3 text-slate-600">
          Mantente al día con nuestros videos breves, webinars y episodios de
          podcast sobre tendencias en seguros.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {mediaHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <button className="mt-4 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">
                Ver recurso
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
