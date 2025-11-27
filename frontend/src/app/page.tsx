import Image from "next/image";
import Link from "next/link";

import { MobileHeaderMenu } from "@/components/MobileHeaderMenu";
import { QuoteForm } from "@/components/QuoteForm";
import { ProfileMenu } from "@/components/ProfileMenu";
import { config } from "@/lib/config";

const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes", label: "Quiénes somos" },
  { href: "#vision", label: "Visión y misión" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#productos", label: "Productos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

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

const mediaHighlights = [
  {
    title: "Podcast: Lo esencial del seguro de autos",
    description: "Conoce cómo optimizar coberturas y deducibles según tu perfil de riesgo.",
  },
  {
    title: "Video: Guía rápida para preparar tu renovación",
    description: "Nuestro equipo explica los documentos que debes tener listos para una transición sin sorpresas.",
  },
];

export default function HomePage() {
  const phoneHref = `tel:${config.phoneNumber.replace(/[^\d+]/g, "")}`;
  const whatsappHref = `https://wa.me/${config.whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="#inicio" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Image src="/logos/cross insurance logo black.png" alt="Cross Insurance Logo" width={48} height={48} />
            Cross Insurance
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 text-sm font-medium md:flex">
            <Link href={phoneHref} className="text-slate-700 hover:text-slate-900">
              Llamar
            </Link>
            <Link
              href={whatsappHref}
              className="rounded-full bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
            >
              WhatsApp
            </Link>
            <ProfileMenu />
          </div>
          <MobileHeaderMenu
            navigation={navigation}
            phoneDisplay={config.phoneNumber}
            phoneHref={phoneHref}
            whatsappHref={whatsappHref}
          />
        </div>
      </header>

      <main className="flex-1" id="inicio">
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
            <Image src="/images/landing_image.jpeg" alt="Landing Image" width={400} height={400} className="h-100 w-100 rounded-full object-cover shadow-lg" />
          </div>
        </section>

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
                      <p className="text-xl font-semibold text-slate-900">
                        {member.name}
                      </p>
                      <p className="text-sm font-medium text-emerald-600">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        <section id="experiencia" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                Experiencia comprobada
              </h2>
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
              <h3 className="text-xl font-semibold text-emerald-900">
                Capacidades destacadas
              </h3>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li>• Dashboard con métricas de pólizas, renovaciones y facturación.</li>
                <li>• Alertas automáticas vía email, SMS o WhatsApp.</li>
                <li>• Biblioteca de cartas prediseñadas por tipo de cobertura.</li>
                <li>• Integración con almacenamiento seguro para expedientes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="productos" className="bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Productos y Servicios</h2>
                <p className="mt-3 max-w-2xl text-slate-200">
                  Ofrecemos un portafolio amplio de soluciones para individuos y
                  empresas. Diseñamos paquetes integrales según las necesidades de cada
                  cliente.
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
                  <h3 className="text-xl font-semibold text-white">
                    {product.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-200">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonios"
          className="mx-auto max-w-6xl px-6 py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-4 text-slate-600">
                Historias reales de clientes que confiaron sus pólizas a Cross
                Insurance.
              </p>
            </div>
            <div className="grid gap-6">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <blockquote className="text-base text-slate-700">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="media" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold text-slate-900">
              Recursos multimedia
            </h2>
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
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <button className="mt-4 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">
                    Ver recurso
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

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
      </main>

      <footer
        id="contacto"
        className="border-t border-slate-200 bg-white py-10 text-sm text-slate-600"
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 md:flex-row">
          <div>
            <p className="text-base font-semibold text-slate-900">
              Cross Insurance
            </p>
            <p className="mt-2 max-w-md">
              CRM interno, sitio público y automatizaciones integradas para brindar
              un servicio de seguros moderno y confiable.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`mailto:${config.supportEmail}`}
              className="hover:text-slate-900"
            >
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
            © {new Date().getFullYear()} Cross Insurance. Todos los derechos
            reservados.
            <p className="mt-1">
              Desarrollado por{" "}
              <a
                href="https://lexamatechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Lexama Technologies
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
