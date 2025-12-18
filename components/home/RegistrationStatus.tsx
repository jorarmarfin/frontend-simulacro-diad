import { AlertCircle, Calendar, Clock } from 'lucide-react';
import {NotificationButton} from "@/components/home/NotificationButton";

interface RegistrationStatusProps {
  isActive: boolean;
}

export function RegistrationStatus({ isActive }: RegistrationStatusProps) {
  if (isActive) {
    return (
      <section className="py-12 bg-green-50 border-y border-green-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 border-2 border-green-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    ¡Inscripciones Abiertas! 🎉
                  </h3>
                  <p className="text-green-700 text-lg mb-4">
                    El simulacro de examen está activo. Regístrate ahora y prepárate para demostrar tus conocimientos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/auth"
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                    >
                      Inscribirse Ahora
                    </a>
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-green-700 bg-white border-2 border-green-600 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                    >
                      Más Información
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-orange-50 border-y border-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 border-2 border-orange-400">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-orange-800 mb-2">
                  Inscripciones No Habilitadas
                </h3>
                <p className="text-orange-700 text-lg mb-4">
                  En este momento no hay un simulacro de examen activo. Las inscripciones se abrirán próximamente.
                </p>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-orange-800">
                    <Clock className="h-5 w-5" />
                    <p className="font-medium">
                      Mantente atento a nuestras actualizaciones para conocer la próxima fecha de inscripción.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-orange-600 rounded-lg shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300"
                  >
                    Conoce Más Sobre el Simulacro
                  </a>
                  <NotificationButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

