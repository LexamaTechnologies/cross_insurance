import { Metadata } from "next";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión | Cross Insurance",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
