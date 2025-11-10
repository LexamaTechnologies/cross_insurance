"use client";

import { FormEvent, useState } from "react";

import { config } from "@/lib/config";

const insuranceOptions = [
  "Autos",
  "Vida",
  "Propiedad",
  "Comerciales",
  "Anualidades",
  "Otro",
];

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      const response = await fetch(config.quoteEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      formElement.reset();
      setStatus("success");
      setMessage("Gracias por contactarnos. Un asesor se comunicará contigo pronto.");
    } catch (error) {
      console.error("Quote request failed", error);
      setStatus("error");
      setMessage(
        "No pudimos enviar tu solicitud en este momento. Por favor intenta nuevamente o contáctanos por los canales directos.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl space-y-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-lg backdrop-blur-md"
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Solicita tu cotización</h3>
        <p className="mt-1 text-sm text-slate-600">
          Completa el formulario y adjunta documentos si deseas acelerar tu
          evaluación.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Nombre completo
          <input
            name="name"
            type="text"
            required
            placeholder="Ej. Juan Pérez"
            className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Teléfono
          <input
            name="phone"
            type="tel"
            required
            placeholder="Ej. +1 787 555 1234"
            className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Tipo de seguro
          <select
            name="insurance_type"
            className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring"
            defaultValue="Autos"
          >
            {insuranceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col text-sm font-medium text-slate-700">
        Notas adicionales
        <textarea
          name="notes"
          rows={4}
          placeholder="Cuéntanos sobre tu necesidad de cobertura."
          className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring"
        />
      </label>

      <label className="flex flex-col text-sm font-medium text-slate-700">
        Adjunta documentos (opcional)
        <input
          name="attachment"
          type="file"
          accept="image/*,application/pdf"
          className="mt-1 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:outline-none"
        />
        <span className="mt-1 text-xs text-slate-500">
          Licencia de conducir, identificación u otros archivos relevantes.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </button>

      {message && (
        <p
          className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}

      <p className="text-xs text-slate-500">
        Al enviar este formulario aceptas ser contactado por un asesor de Cross
        Insurance a través de los datos proporcionados.
      </p>
    </form>
  );
}
