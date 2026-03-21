import Image from "next/image";

const teamMembers = [
  {
    name: "Johanna González",
    role: "Directora Ejecutiva",
    bio: "20 años diseñando soluciones de seguros a medida para clientes corporativos y personales.",
    photo: "/images/johanna_profile.jpg",
  },
  {
    name: "Ricardo Cruz",
    role: "Gerente de Operaciones",
    bio: "Coordina el equipo de agentes y las renovaciones para garantizar renovaciones sin fricción.",
    photo: "/images/ricardo_profile.jpg",
  },
];

export function AboutSection() {
  return (
    <section id="quienes" className="mx-auto max-w-6xl px-6 py-20 space-y-12">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Quiénes somos</h2>
        <p className="mt-6 text-slate-600">
          Somos un equipo multidisciplinario con más de 25 años de experiencia
          en seguros personales y comerciales. Nuestro CRM propietario nos
          permite responder más rápido, documentar cada interacción y ofrecer
          recomendaciones precisas en cada etapa del ciclo de vida de una
          póliza.
        </p>
        <p className="mt-4 text-slate-600">
          Trabajamos con las principales aseguradoras del país y mantenemos un
          acompañamiento constante para nuestros clientes, desde la selección
          del producto hasta la gestión de reclamaciones.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Nuestro equipo</h3>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-5">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-slate-100" />
                )}
                <div>
                  <p className="text-xl font-semibold text-slate-900">{member.name}</p>
                  <p className="text-sm font-medium text-emerald-600">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
