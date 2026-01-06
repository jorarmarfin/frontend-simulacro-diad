'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

interface UseSimulationModeState {
  isVirtual: boolean | null;
  requiresPhoto: boolean;
  isLoading: boolean;
}

/**
 * Hook para obtener el modo del simulacro desde storage
 * Útil para componentes que necesitan saber si mostrar la opción de foto
 */
export function useSimulationMode(): UseSimulationModeState {
  const [state, setState] = useState<{ isVirtual: boolean | null; isLoading: boolean }>({
    isVirtual: null,
    isLoading: true,
  });

  useEffect(() => {
    // Leer del storage al montar el componente
    const storedValue = SimulationStorageService.getIsVirtual();
    setState({ isVirtual: storedValue, isLoading: false });
  }, []);

  return {
    isVirtual: state.isVirtual,
    // Requiere foto solo si NO es virtual (es presencial)
    requiresPhoto: state.isVirtual === false,
    isLoading: state.isLoading,
  };
}

