import { CheckCircle, DollarSign, Clock, DownloadIcon } from 'lucide-react';
import { Step } from '@/components/ui/Step';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-blue-50/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Empieza en solo 3 pasos
          </h2>
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
            num="3" //logo download
            icon={<DownloadIcon className="h-8 w-8 text-slate-800" />}
            title="Descargar ficha de inscripcion"
            description="Una vez confirmado tu pago, y tu foto haya sido aprobada deberaz imprimir tu ficha para poder ingresar a dar tu examen."
          />
          <Step
            num="4"
            icon={<Clock className="h-8 w-8 text-slate-800" />}
            title="Espera la fecha para rendir el examen"
            description="Una vez confirmado tu pago, solo queda esperar al día programado para demostrar tus conocimientos."
          />
        </div>
      </div>
    </section>
  );
}

