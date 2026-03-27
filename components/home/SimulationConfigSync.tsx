'use client';

import { useEffect } from 'react';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import type { AvailableTariff } from '@/lib/types/exam-simulation.types';

interface SimulationConfigSyncProps {
  isVirtual: boolean;
  isLocal?: boolean;
  examDate?: string | null;
  dateStart?: string;
  dateEnd?: string;
  description?: string;
  includeVocational?: boolean;
  availableTariffs?: AvailableTariff[];
}

export function SimulationConfigSync({
  isVirtual,
  isLocal,
  examDate,
  dateStart,
  dateEnd,
  description,
  includeVocational,
  availableTariffs,
}: SimulationConfigSyncProps) {
  useEffect(() => {
    SimulationStorageService.setIsVirtual(isVirtual);
    if (typeof isLocal === 'boolean') {
      SimulationStorageService.setIsLocal(isLocal);
    }

    if (examDate) {
      if (examDate.includes('/')) {
        const [day, month, year] = examDate.split('/');
        SimulationStorageService.setExamDate(
          `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        );
      } else if (examDate.includes('-')) {
        SimulationStorageService.setExamDate(examDate);
      }
    } else {
      SimulationStorageService.setExamDate(null);
    }

    SimulationStorageService.setSimulationConfig({
      is_virtual: isVirtual,
      is_local: typeof isLocal === 'boolean' ? isLocal : undefined,
      exam_date: examDate ?? null,
      exam_date_start: dateStart ?? null,
      exam_date_end: dateEnd ?? null,
      description: description ?? null,
      include_vocational: typeof includeVocational === 'boolean' ? includeVocational : undefined,
      available_tariffs: Array.isArray(availableTariffs) ? availableTariffs : undefined,
    });
  }, [isVirtual, isLocal, examDate, dateStart, dateEnd, description, includeVocational, availableTariffs]);

  return null;
}
