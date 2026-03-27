import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type { Site, SitesResponse } from '@/lib/types/exam-simulation.types';

interface RawSitesResponse {
  data?: Site[];
  message?: string;
}

export class SiteService {
  /**
   * Obtiene las sedes desde la API
   */
  static async getAll(): Promise<SitesResponse> {
    try {
      const response = await apiClient.get<SitesResponse | RawSitesResponse>(
        API_CONFIG.endpoints.sites
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
      console.error('Error fetching sites:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        const apiError = error as { message?: string };
        return {
          status: 'error',
          message: apiError.message || 'Error al obtener las sedes',
          data: [],
        };
      }

      return {
        status: 'error',
        message: 'Error al obtener las sedes',
        data: [],
      };
    }
  }
}
