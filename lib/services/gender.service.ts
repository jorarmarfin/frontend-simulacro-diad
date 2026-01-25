import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type { GendersResponse } from '@/lib/types/exam-simulation.types';

export class GenderService {
  /**
   * Obtiene los géneros desde la API
   */
  static async getAll(): Promise<GendersResponse> {
    try {
      return await apiClient.get<GendersResponse>(API_CONFIG.endpoints.genders);
    } catch (error) {
      console.error('Error fetching genders:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        return error as GendersResponse;
      }

      return {
        status: 'error',
        message: 'Error al obtener los géneros',
        data: [],
      };
    }
  }
}
