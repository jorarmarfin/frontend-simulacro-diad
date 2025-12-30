import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 bg-blue-100/50 overflow-hidden">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-200/80 rounded-full mb-4 animate-fade-in-up">
            Prepárate para el éxito
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight animate-fade-in-up animation-delay-200">
            Mide tu potencial para el examen de la <span className="text-blue-500">UNI</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Nuestra plataforma te ofrece un simulacro de examen de admisión realista, diseñado para ayudarte a
            familiarizarte con el formato, identificar tus fortalezas y superar tus debilidades.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Empezar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white rounded-lg shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 transition-all duration-300 transform hover:scale-105"
            >
              Saber más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

