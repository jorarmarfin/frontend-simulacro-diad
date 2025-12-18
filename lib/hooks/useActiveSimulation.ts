'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExamSimulationService } from '@/lib/services/exam-simulation.service';
import type {
  ExamSimulationStatusResponse,
  ApiError,
} from '@/lib/types/exam-simulation.types';

interface UseActiveSimulationState {
  data: ExamSimulationStatusResponse | null;
  isActive: boolean;
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
    loading,
    error,
    refetch: fetchData,
  };
}

