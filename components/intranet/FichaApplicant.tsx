'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Download } from 'lucide-react';
import { ApplicantCard } from '@/components/intranet/ApplicantCard';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

interface FichaApplicantProps {
  userData: SimulationApplicant;
}

/**
 * Componente cliente para manejar la funcionalidad de impresión
 * de la ficha del postulante
 */
export function FichaApplicant({ userData }: FichaApplicantProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  // Hook para imprimir
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Ficha_Inscripcion_${userData?.code || userData?.dni || 'postulante'}`,
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Botones de acción */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 print:hidden">
        <button
          onClick={() => handlePrint()}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          <Printer className="h-5 w-5" />
          Imprimir Ficha
        </button>
        <button
          onClick={() => handlePrint()}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          <Download className="h-5 w-5" />
          Descargar PDF
        </button>
      </div>

      {/* Mensaje de éxito */}
      <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-6 print:hidden">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900 mb-2">
              ¡Inscripción Completada!
            </h3>
            <p className="text-green-800 mb-3">
              Tu inscripción ha sido confirmada exitosamente. Por favor, imprime o descarga tu ficha de inscripción.
            </p>
            <p className="text-green-700 text-sm font-medium">
              ⚠️ Recuerda traer esta ficha impresa el día del examen junto con tu DNI original.
            </p>
          </div>
        </div>
      </div>

      {/* Ficha imprimible */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        <ApplicantCard ref={componentRef} data={userData} />
      </div>

      {/* Nota adicional */}
      <div className="mt-6 text-center text-sm text-slate-600 print:hidden">
        <p>
          Si tienes algún problema con la impresión, contacta a soporte técnico.
        </p>
      </div>
    </div>
  );
}

