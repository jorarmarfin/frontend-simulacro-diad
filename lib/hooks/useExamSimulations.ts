'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExamSimulationService } from '@/lib/services/exam-simulation.service';
import type {
  ExamSimulation,
  ApiError,
} from '@/lib/types/exam-simulation.types';

interface UseExamSimulationsState {
  data: ExamSimulation[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useExamSimulations(): UseExamSimulationsState {
  const [data, setData] = useState<ExamSimulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const simulations = await ExamSimulationService.getAll();
      setData(simulations);
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
    loading,
    error,
    refetch: fetchData,
  };
}

interface UseExamSimulationState {
  data: ExamSimulation | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useExamSimulation(
  id: string | number
): UseExamSimulationState {
  const [data, setData] = useState<ExamSimulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const simulation = await ExamSimulationService.getById(id);
      setData(simulation);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

