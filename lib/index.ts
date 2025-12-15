/**
 * Punto de entrada centralizado para el API de simulaciones de examen
 * Importa desde aquí para mayor comodidad
 */

// Servicios
export { ExamSimulationService } from './services/exam-simulation.service';

// Hooks
export { useExamSimulations, useExamSimulation } from './hooks/useExamSimulations';

// Tipos
export type {
  ExamSimulation,
  ExamSimulationsResponse,
  ApiError,
} from './types/exam-simulation.types';

// Configuración
export { API_CONFIG } from './config/api.config';

// Cliente API (por si necesitas usarlo directamente)
export { apiClient } from './utils/api-client';

