import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type {
  SimulationApplicantSearchRequest,
  SimulationApplicantSearchResponse,
  SimulationApplicant,
} from '@/lib/types/exam-simulation.types';

export class SimulationApplicantService {
  /**
   * Busca un aplicante por DNI y email
   * @param data - Datos de búsqueda (DNI y email)
   * @returns Información del aplicante o error si no se encuentra
   */
  static async search(
    data: SimulationApplicantSearchRequest
  ): Promise<SimulationApplicantSearchResponse> {
    try {
      return await apiClient.post<SimulationApplicantSearchResponse>(
        API_CONFIG.endpoints.simulationApplicants.search,
        data
      );
    } catch (error) {
      console.error('Error searching simulation applicant:', error);

      // Si es un error de la API con respuesta estructurada
      if (error && typeof error === 'object' && 'status' in error) {
        return error as SimulationApplicantSearchResponse;
      }

      // Error genérico
      return {
        status: 'error',
        message: 'No se encontró un aplicante con los datos proporcionados',
      };
    }
  }

  /**
   * Type guard para verificar si la respuesta es exitosa
   * @param response - Respuesta de la búsqueda
   * @returns true si la respuesta es exitosa
   */
  static isSuccessResponse(
    response: SimulationApplicantSearchResponse
  ): response is { status: 'success'; data: SimulationApplicant } {
    return response.status === 'success' && 'data' in response;
  }

  /**
   * Type guard para verificar si la respuesta es un error
   * @param response - Respuesta de la búsqueda
   * @returns true si la respuesta es un error
   */
  static isErrorResponse(
    response: SimulationApplicantSearchResponse
  ): response is { status: 'error'; message: string } {
    return response.status === 'error' && 'message' in response;
  }
}

