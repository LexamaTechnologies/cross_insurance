const testimonials = [
  {
    name: "José Martínez",
    quote:
      "El equipo de Cross Insurance me ayudó a renovar mis pólizas comerciales sin detener mi operación. La comunicación fue excelente.",
  },
  {
    name: "Andrea García",
    quote:
      "Su asesoría en seguros de vida fue clara y transparente. Sentí que realmente entendieron mis metas.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-slate-600">
            Historias reales de clientes que confiaron sus pólizas a Cross Insurance.
          </p>
        </div>
        <div className="grid gap-6">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-base text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
