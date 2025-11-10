"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { config } from "@/lib/config";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      setError("Ingresa tu usuario y contraseña");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.detail ?? "No fue posible iniciar sesión.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Inicia sesión en el CRM
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Usa tus credenciales de staff de Django. Si no cuentas con una, solicita
          acceso al administrador del sistema.
        </p>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Usuario
        <input
          name="username"
          type="text"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-slate-500 focus:outline-none"
          placeholder="tu.usuario"
          autoComplete="username"
          required
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Contraseña
        <input
          name="password"
          type="password"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-slate-500 focus:outline-none"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "Iniciando sesión..." : "Entrar"}
      </button>
    </form>
  );
}
