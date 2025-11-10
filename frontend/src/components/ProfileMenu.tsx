"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { config } from "@/lib/config";

type SessionPayload = {
  authenticated: boolean;
  username: string | null;
  is_staff: boolean;
};

export function ProfileMenu() {
  const [session, setSession] = useState<SessionPayload>({
    authenticated: false,
    username: null,
    is_staff: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const fetchSession = async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/session/`, {
        credentials: "include",
        cache: "no-store",
        signal,
      });
      if (response.ok) {
        const payload = (await response.json()) as SessionPayload;
        setSession(payload);
      }
    } catch (error) {
      console.error("Session fetch failed", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchSession(controller.signal);

    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", onClickOutside);
    return () => {
      controller.abort();
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${config.apiBaseUrl}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
    setSession({ authenticated: false, username: null, is_staff: false });
    router.push("/");
    router.refresh();
  };

  const handleLogin = () => {
    setIsOpen(false);
    router.push("/login");
  };

  const handleDashboard = () => {
    setIsOpen(false);
    router.push("/dashboard");
  };

  const toggleMenu = async () => {
    if (!isOpen) {
      await fetchSession();
    }
    setIsOpen((prev) => !prev);
  };

  const avatarLabel = session.authenticated
    ? session.username?.charAt(0).toUpperCase() ?? "U"
    : "☰";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={toggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Abrir menú de perfil</span>
        {avatarLabel}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-lg">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            {session.authenticated ? "Sesión" : "Acceso"}
          </p>
          {session.authenticated ? (
            <div className="space-y-2">
              {session.is_staff && (
                <button
                  onClick={handleDashboard}
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
              onClick={handleLogin}
              className="w-full rounded-xl px-3 py-2 text-left text-slate-600 transition hover:bg-slate-50"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </div>
  );
}
