/**
 * Hook para buscar aplicantes al simulacro
 */

import { useState } from 'react';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import type {
  SimulationApplicantSearchRequest,
  SimulationApplicantSearchResponse,
  SimulationApplicant,
} from '@/lib/types/exam-simulation.types';

interface UseSimulationApplicantSearchReturn {
  search: (data: SimulationApplicantSearchRequest) => Promise<void>;
  applicant: SimulationApplicant | null;
  error: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
}

/**
 * Hook para buscar aplicantes del simulacro
 *
 * @example
 * ```tsx
 * function SearchForm() {
 *   const { search, applicant, error, isLoading } = useSimulationApplicantSearch();
 *
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     await search({ dni: '71982587', email: 'diegooo@gmail.com' });
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {isLoading && <p>Buscando...</p>}
 *       {error && <p>{error}</p>}
 *       {applicant && <p>Encontrado: {applicant.first_names}</p>}
 *     </form>
 *   );
 * }
 * ```
 */
export function useSimulationApplicantSearch(): UseSimulationApplicantSearchReturn {
  const [applicant, setApplicant] = useState<SimulationApplicant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const search = async (data: SimulationApplicantSearchRequest) => {
    setIsLoading(true);
    setError(null);
    setApplicant(null);
    setIsSuccess(false);

    try {
      const response: SimulationApplicantSearchResponse =
        await SimulationApplicantService.search(data);

      if (SimulationApplicantService.isSuccessResponse(response)) {
        setApplicant(response.data);
        setIsSuccess(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error inesperado al buscar el aplicante'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setApplicant(null);
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
  };

  return {
    search,
    applicant,
    error,
    isLoading,
    isSuccess,
    reset,
  };
}

