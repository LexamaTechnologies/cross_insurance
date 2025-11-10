"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useSessionStatus } from "@/hooks/useSessionStatus";
import { config } from "@/lib/config";

type NavigationItem = {
  href: string;
  label: string;
};

type MobileHeaderMenuProps = {
  navigation: NavigationItem[];
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
};

export function MobileHeaderMenu({
  navigation,
  phoneDisplay,
  phoneHref,
  whatsappHref,
}: MobileHeaderMenuProps) {
  const { session, setSession, fetchSession } = useSessionStatus(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  const toggleMenu = async () => {
    if (!isOpen) {
      await fetchSession();
    }
    setIsOpen((prev) => !prev);
  };

  const closeAndNavigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${config.apiBaseUrl}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setSession({ authenticated: false, username: null, is_staff: false });
      setIsOpen(false);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="relative md:hidden" ref={containerRef}>
      <button
        type="button"
        onClick={toggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Abrir menú principal</span>
        <div className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 rounded-full bg-slate-700" />
          <span className="block h-0.5 w-5 rounded-full bg-slate-700" />
          <span className="block h-0.5 w-4 rounded-full bg-slate-700" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-72 rounded-3xl border border-slate-200 bg-white p-5 text-sm shadow-2xl">
          <nav className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-semibold text-slate-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
            <a
              href={phoneHref}
              className="block rounded-xl border border-slate-200 px-4 py-2 text-center font-semibold text-slate-700 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Llamar {phoneDisplay}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl bg-emerald-500 px-4 py-2 text-center font-semibold text-white shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            {session.authenticated ? (
              <div className="space-y-2">
                {session.is_staff && (
                  <button
                    onClick={() => closeAndNavigate("/dashboard")}
                    className="w-full rounded-xl px-3 py-2 text-left font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl px-3 py-2 text-left text-slate-600 transition hover:bg-slate-50"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => closeAndNavigate("/login")}
                className="w-full rounded-xl px-3 py-2 text-left font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
