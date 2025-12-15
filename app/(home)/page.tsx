"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, CheckCircle, Award, ArrowUp, DollarSign, Clock } from 'lucide-react';

// Reusable IconWrapper Component for consistent styling
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-100 p-3 rounded-full">
      {children}
    </div>
);

// Reusable FeatureCard Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <IconWrapper>{icon}</IconWrapper>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-slate-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
);

// Reusable Step Component
const Step = ({ icon, num, title, description }: { icon: React.ReactNode, num: string; title:string; description: string; }) => (
    <div
        className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div
          className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-500 text-white text-3xl font-bold rounded-full">
        {num}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-3">{icon}{title}</h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
)

// GoTopButton Component
const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
      <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          aria-label="Go to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
  );
};


export default function HomePage() {
  return (
      <div className="bg-slate-50 min-h-screen text-slate-700">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <BookOpen className="h-7 w-7 text-blue-500" />
                <span className="text-xl font-bold text-slate-800">Simulacro UNI</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors">Características</a>
                <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors">¿Cómo funciona?</a>
                <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors">Precios</a>
              </nav>
              <div className="flex items-center">
                <a href="#"
                   className="hidden sm:inline-block text-sm font-medium text-slate-600 hover:text-blue-500 mr-6 transition-colors">
                  Iniciar Sesión
                </a>
                <a href="#"
                   className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
                  Registrarse
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="relative pt-24 pb-32 bg-blue-100/50 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-3xl mx-auto text-center">
                     <span
                         className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-200/80 rounded-full mb-4 animate-fade-in-up">
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
                  <a href="#"
                     className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
                    Empezar ahora
                    <ArrowRight className="ml-2 h-5 w-5"/>
                  </a>
                  <a href="#features"
                     className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white rounded-lg shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 transition-all duration-300 transform hover:scale-105">
                    Saber más
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 sm:py-28 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Todo lo que necesitas para prepararte</h2>
                <p className="mt-4 text-lg text-slate-600">
                  Herramientas y recursos diseñados para simular una experiencia real del examen de admisión.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<CheckCircle className="h-6 w-6 text-blue-500" />}
                    title="Examen Realista"
                    description="Preguntas y estructura basadas en exámenes de admisión pasados de la UNI."
                />
                <FeatureCard
                    icon={<Award className="h-6 w-6 text-blue-500" />}
                    title="Resultados Detallados"
                    description="Obtén un análisis de tu desempeño por área para enfocar mejor tu estudio."
                />
                <FeatureCard
                    icon={<BookOpen className="h-6 w-6 text-blue-500" />}
                    title="Solucionario Completo"
                    description="Accede a las soluciones explicadas paso a paso para cada una de las preguntas."
                />
              </div>
            </div>
          </section>


          {/* How it works */}
          <section id="how-it-works" className="py-20 sm:py-28 bg-blue-50/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Empieza en solo 3 pasos</h2>
                <p className="mt-4 text-lg text-slate-600">
                  Nuestro proceso es simple y directo para que te concentres en lo más importante: tu preparación.
                </p>
              </div>

              <div className="mt-16 max-w-4xl mx-auto space-y-12">
                <Step
                    num="1"
                    icon={<CheckCircle className="h-8 w-8 text-slate-800" />}
                    title="Crea tu Cuenta"
                    description="Regístrate en la plataforma. Solo te tomará un minuto y tendrás acceso para el siguiente paso."
                />
                <Step
                    num="2"
                    icon={<DollarSign className="h-8 w-8 text-slate-800" />}
                    title="Realiza el Pago"
                    description="Realiza el pago correspondiente para asegurar tu participación en el simulacro de examen."
                />
                <Step
                    num="3"
                    icon={<Clock className="h-8 w-8 text-slate-800" />}
                    title="Espera la fecha para rendir el examen"
                    description="Una vez confirmado tu pago, solo queda esperar al día programado para demostrar tus conocimientos."
                />
              </div>
            </div>
          </section>


          {/* Final CTA Section */}
          <section id="pricing" className="py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-blue-500 text-white rounded-2xl p-12 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl md:text-4xl font-bold">¿Listo para poner a prueba tus conocimientos?</h2>
                <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                  Únete a cientos de postulantes que ya están practicando.
                  Da el primer paso hacia tu ingreso hoy mismo.
                </p>
                <div className="mt-8">
                  <a href="#"
                     className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-blue-600 bg-white rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white transition-all duration-300 transform hover:scale-110">
                    Inscríbete Gratis
                    <ArrowRight className="ml-2 h-5 w-5"/>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-slate-100 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 text-center text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} Simulacro UNI. Todos los derechos reservados.</p>
              <p className="mt-2">Un proyecto para la comunidad de postulantes.</p>
            </div>
          </div>
        </footer>

        <GoTopButton />
      </div>
  );
}
