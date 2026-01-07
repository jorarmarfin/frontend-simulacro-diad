'use client';

import { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

interface SimulationDatesProps {
  dateStart: string;
  dateEnd: string;
  examDate?: string | null; // Fecha del examen
  isVirtual: boolean;
}

/**
 * Componente para mostrar las fechas del simulacro
 * y guardar is_virtual en localStorage
 */
export function SimulationDates({ dateStart, dateEnd, examDate, isVirtual }: SimulationDatesProps) {
  // Guardar is_virtual en localStorage al montar el componente
  useEffect(() => {
    SimulationStorageService.setIsVirtual(isVirtual);
  }, [isVirtual]);

  // Formatear fecha de DD/MM/YYYY a formato legible
  const formatDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split('/');
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          {/* Fecha del examen - Destacada */}
          {examDate && (
            <div className="flex items-center justify-center gap-2 bg-white/30 px-4 py-2 rounded-lg">
              <Calendar className="h-6 w-6" />
              <span className="font-semibold text-lg">Fecha del Examen:</span>
              <span className="font-bold text-xl">{formatDate(examDate)}</span>
            </div>
          )}

          {/* Fechas de inscripción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold text-lg">Inscripciones abiertas:</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full">
                <span className="text-sm font-medium">Desde:</span>
                <span className="font-bold">{formatDate(dateStart)}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full">
                <span className="text-sm font-medium">Hasta:</span>
                <span className="font-bold">{formatDate(dateEnd)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

