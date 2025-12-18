/**
 * Servicio para manejar las operaciones relacionadas con las simulaciones de examen
 */

import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type {
  ExamSimulationStatusResponse,
} from '@/lib/types/exam-simulation.types';

export class ExamSimulationService {
  /**
   * Verifica si hay un simulacro activo
   */
  static async checkActiveSimulation(): Promise<ExamSimulationStatusResponse> {
    try {
      return await apiClient.get<ExamSimulationStatusResponse>(
        API_CONFIG.endpoints.examSimulations
      );
    } catch (error) {
      console.error('Error checking active simulation:', error);
      throw error;
    }
  }
}

