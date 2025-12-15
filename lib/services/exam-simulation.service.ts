/**
 * Servicio para manejar las operaciones relacionadas con las simulaciones de examen
 */

import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type {
  ExamSimulation,
  ExamSimulationsResponse,
} from '@/lib/types/exam-simulation.types';

export class ExamSimulationService {
  /**
   * Obtiene todas las simulaciones de examen
   */
  static async getAll(): Promise<ExamSimulation[]> {
    try {
      const response = await apiClient.get<ExamSimulationsResponse>(
        API_CONFIG.endpoints.examSimulations
      );

      // Si la API devuelve un objeto con data
      if ('data' in response) {
        return response.data;
      }

      // Si la API devuelve directamente un array
      return response as unknown as ExamSimulation[];
    } catch (error) {
      console.error('Error fetching exam simulations:', error);
      throw error;
    }
  }




}

