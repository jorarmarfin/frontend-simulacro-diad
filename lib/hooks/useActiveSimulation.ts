'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExamSimulationService } from '@/lib/services/exam-simulation.service';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import type {
  ExamSimulationStatusResponse,
  ApiError,
  AvailableTariff,
} from '@/lib/types/exam-simulation.types';

interface UseActiveSimulationState {
  data: ExamSimulationStatusResponse | null;
  isActive: boolean;
  isVirtual: boolean;
  isInscriptionOpen: boolean;
  isVocational: boolean;
  description?: string;
  examDate?: string | null;
  examDateStart?: string | undefined;
  examDateEnd?: string | undefined;
  availableTariffs?: AvailableTariff[] | undefined;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useActiveSimulation(): UseActiveSimulationState {
  const [data, setData] = useState<ExamSimulationStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ExamSimulationService.checkActiveSimulation();
      setData(response);

      // Guardar is_virtual en storage para uso en navegación
      if (response?.data?.is_virtual !== undefined) {
        SimulationStorageService.setIsVirtual(response.data.is_virtual);
      }

      // Guardar exam_date en storage para mostrar en home y ficha
      if (response?.data?.exam_date !== undefined) {
        SimulationStorageService.setExamDate(response.data.exam_date);
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isActive: data?.data?.is_active ?? false,
    isVirtual: data?.data?.is_virtual ?? true, // Por defecto true (virtual, sin foto)
    isInscriptionOpen: data?.data?.is_inscription_open ?? true,
    isVocational: data?.data?.include_vocational ?? false,
    description: data?.data?.description,
    examDate: data?.data?.exam_date ?? null,
    examDateStart: data?.data?.exam_date_start,
    examDateEnd: data?.data?.exam_date_end,
    availableTariffs: data?.data?.available_tariffs,
    loading,
    error,
    refetch: fetchData,
  };
}
