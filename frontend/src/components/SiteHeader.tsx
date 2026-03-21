import Image from "next/image";
import Link from "next/link";

import { MobileHeaderMenu } from "@/components/MobileHeaderMenu";
import { ProfileMenu } from "@/components/ProfileMenu";

const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes", label: "Quiénes somos" },
  { href: "#vision", label: "Visión y misión" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#productos", label: "Productos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

interface SiteHeaderProps {
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
}

export function SiteHeader({ phoneDisplay, phoneHref, whatsappHref }: SiteHeaderProps) {
  return (
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
          phoneDisplay={phoneDisplay}
          phoneHref={phoneHref}
          whatsappHref={whatsappHref}
        />
      </div>
    </header>
  );
}
