import {BookOpen} from "lucide-react";
import {Login} from "@/components/auth/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Page",
  description: "Página de autenticación para Simulacro UNI",
}

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-blue-500" />
            <span className="ml-3 text-3xl font-extrabold text-slate-900">Simulacro UNI</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Verificar Inscripción
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Ingresa tu DNI y correo para continuar
          </p>
        </div>
        <Login />


      </div>
    </div>
  );
}