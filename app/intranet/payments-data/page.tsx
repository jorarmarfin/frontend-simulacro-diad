import { CreditCard, Building2, Smartphone, Globe, Clock, FileText, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Instrucciones de Pago - Simulacro UNI",
  description: "Información sobre cómo realizar el pago del simulacro",
}

export default function PaymentsDataPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Instrucciones de Pago
          </h1>
          <p className="mt-2 text-slate-600">
            Realiza tu pago en cualquiera de las siguientes entidades bancarias
          </p>
        </div>


        {/* Aviso de validación */}
        <div className="mb-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800">Tiempo de validación</p>
              <p className="text-sm text-blue-700 mt-1">
                Una vez realizado el pago en el banco, espera a que sea validado por nuestro sistema.
                Este proceso puede durar hasta <strong>24 horas</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* BCP */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              BCP
            </div>
            <h2 className="text-xl font-bold text-slate-900">Banco de Crédito del Perú</h2>
          </div>

          <div className="space-y-4">
            {/* Ventanilla/Agente BCP */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Ventanilla o Agente BCP</h3>
              </div>
              <p className="text-sm text-slate-600">
                Indica el nombre <strong>UNIVERSIDAD NACIONAL DE INGENIERÍA</strong>, el código <strong>15226</strong>,
                luego <strong>&quot;Pago Estudiantes&quot;</strong> y el número de DNI del postulante.
                Pida un voucher por cada monto a pagar.
              </p>
            </div>

            {/* Banca por Internet BCP */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Banca por Internet</h3>
              </div>
              <p className="text-sm text-slate-600">
                Entra a <strong>www.viabcp.com</strong>, sección: Tus Cuentas → Pago de Servicios →
                Universidades → UNIVERSIDAD NACIONAL DE INGENIERÍA → <strong>&quot;Pago Estudiantes&quot;</strong> y
                luego digitar el número de DNI del postulante. Hacer un pago por cada monto.
              </p>
            </div>

            {/* App Móvil BCP */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">App Móvil BCP</h3>
              </div>
              <p className="text-sm text-slate-600">
                Entra a tu cuenta → Pagar Servicios → buscar <strong>UNIVERSIDAD NACIONAL DE INGENIERÍA</strong> →
                <strong>&quot;Pago Estudiantes&quot;</strong> → Escribe el DNI del postulante. Hacer un pago por cada monto.
              </p>
            </div>
          </div>
        </div>

        {/* Scotiabank */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs">
              Scotia
            </div>
            <h2 className="text-xl font-bold text-slate-900">Scotiabank</h2>
          </div>

          <div className="space-y-4">
            {/* Ventanilla Scotiabank */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-slate-900">Ventanilla del Banco</h3>
              </div>
              <p className="text-sm text-slate-600">
                Indicar que desea pagar el examen de admisión de la UNI al servicio
                <strong>&quot;Pago de estudiantes&quot;</strong>, entregue el número de DNI del postulante.
                Pida un voucher por cada monto.
              </p>
            </div>

            {/* Agente Scotiabank */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-slate-900">Agente Scotiabank</h3>
              </div>
              <p className="text-sm text-slate-600">
                Indique que desea pagar a la <strong>Universidad Nacional de Ingeniería</strong>,
                el servicio <strong>&quot;Pago Estudiantes&quot;</strong>. Indique el número del DNI del postulante.
                Confirme el monto a pagar, pida un voucher por cada monto.
              </p>
            </div>

            {/* Banca por Internet Scotiabank */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-slate-900">Banca por Internet</h3>
              </div>
              <p className="text-sm text-slate-600">
                Entra a <strong>https://mi.scotiabank.com.pe/login</strong> → ingresa a tu cuenta →
                Click en Quiero → Pagar → Servicios o instituciones → digita <strong>Uni.Nac.Ingenieria</strong> →
                Pago Estudiantes → Escribe tu DNI. Verifica el monto y confirma tu operación.
                Haz una operación por cada monto. Guarda una captura de pantalla de tu constancia de pago.
              </p>
            </div>

            {/* App Móvil Scotiabank */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-slate-900">App Móvil Scotiabank</h3>
              </div>
              <p className="text-sm text-slate-600">
                Click en Pago de servicios e instituciones → <strong>Univ.Nac. Ingeniería</strong> →
                Pago Estudiantes → DNI → Escoge el recibo a pagar. Confirma tu operación y
                haz una captura del pago. Realiza un pago por cada monto a pagar.
              </p>
            </div>
          </div>
        </div>

        {/* Recordatorio final */}
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">Recuerda</p>
              <ul className="text-sm text-green-700 mt-1 space-y-1">
                <li>• Guarda tu voucher o captura de pantalla como comprobante de pago</li>
                <li>• Realiza un pago por cada monto requerido</li>
                <li>• El pago debe hacerse con el DNI del postulante</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botón siguiente */}
        <div className="pt-6">
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