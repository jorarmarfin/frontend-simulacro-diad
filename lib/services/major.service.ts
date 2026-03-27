import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type { Major, MajorsResponse } from '@/lib/types/exam-simulation.types';

interface RawMajorsResponse {
  data?: Major[];
  message?: string;
}

export class MajorService {
  /**
   * Obtiene las especialidades desde la API
   */
  static async getAll(): Promise<MajorsResponse> {
    try {
      const response = await apiClient.get<MajorsResponse | RawMajorsResponse>(
        API_CONFIG.endpoints.majors
      );

      // Compatibilidad con respuesta simple { data: [...] } sin campo status
      if ('status' in response) {
        return response;
      }

      return {
        status: 'success',
        data: Array.isArray(response.data) ? response.data : [],
        message: response.message,
      };
    } catch (error) {
      console.error('Error fetching majors:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        const apiError = error as { message?: string };
        return {
          status: 'error',
          message: apiError.message || 'Error al obtener las especialidades',
          data: [],
        };
      }

      return {
        status: 'error',
        message: 'Error al obtener las especialidades',
        data: [],
      };
    }
  }
}
