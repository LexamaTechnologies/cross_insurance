export function ExperienceSection() {
  return (
    <section id="experiencia" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Experiencia comprobada</h2>
          <p className="mt-6 text-slate-600">
            Gestionamos cientos de pólizas multirriesgo, con tasas de renovación
            superiores al 90%. Nuestro CRM privado sincroniza recordatorios,
            cartas de bienvenida y documentos críticos, asegurando que cada
            asegurado reciba seguimiento oportuno.
          </p>
          <p className="mt-4 text-slate-600">
            También atendemos reclamaciones y facturas manuales para planes
            especiales, coordinando pagos parciales y acuerdos personalizados.
          </p>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8 shadow-inner">
          <h3 className="text-xl font-semibold text-emerald-900">Capacidades destacadas</h3>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>• Dashboard con métricas de pólizas, renovaciones y facturación.</li>
            <li>• Alertas automáticas vía email, SMS o WhatsApp.</li>
            <li>• Biblioteca de cartas prediseñadas por tipo de cobertura.</li>
            <li>• Integración con almacenamiento seguro para expedientes.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
