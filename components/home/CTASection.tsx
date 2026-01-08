import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-500 text-white rounded-2xl p-12 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Listo para poner a prueba tus conocimientos?
          </h2>
          <p className="mt-4 text-lg text-red-100 max-w-2xl mx-auto">
            Únete a cientos de postulantes que ya están practicando.
            Da el primer paso hacia tu ingreso hoy mismo.
          </p>
          <div className="mt-8">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-red-600 bg-white rounded-lg shadow-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-500 focus:ring-white transition-all duration-300 transform hover:scale-110"
            >
              Inscríbete Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

