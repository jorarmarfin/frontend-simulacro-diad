import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PaymentInstructions } from '@/components/intranet/PaymentInstructions';
export const metadata: Metadata = {
  title: "Instrucciones de Pago - Simulacro UNI",
  description: "Información sobre cómo realizar el pago del simulacro",
}
export default function PaymentsDataPage() {
  return (
    <div className="space-y-6">
      {/* Componente de instrucciones de pago con configuración dinámica */}
      <PaymentInstructions />
      {/* Botón siguiente */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <Link
            href="/intranet/final"
            className="w-full flex justify-center items-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01]"
          >
            Siguiente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
