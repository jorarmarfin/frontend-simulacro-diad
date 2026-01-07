import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/fondo_home.jpg)' }}
      ></div>

      {/* Overlay oscuro para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenido */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-fade-in-up">
            Cree en ti
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight animate-fade-in-up animation-delay-200">
            Mide tu potencial para el examen de la <span className="text-red-500 drop-shadow-lg">UNI</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Nuestra plataforma te ofrece un simulacro de examen de admisión realista, diseñado para ayudarte a familiarizarte con el formato, identificar tus fortalezas y superar tus debilidades.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-red-900 bg-white rounded-lg shadow-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105"
            >
              Empezar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all duration-300 transform hover:scale-105"
            >
              Saber más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

