/**
 * Punto de entrada centralizado para el API de simulaciones de examen
 * Importa desde aquí para mayor comodidad
 */

// Servicios
export { ExamSimulationService } from './services/exam-simulation.service';
export { SimulationApplicantService } from './services/simulation-applicant.service';

// Hooks
export { useExamSimulations, useExamSimulation } from './hooks/useExamSimulations';
export { useSimulationApplicantSearch } from './hooks/useSimulationApplicantSearch';

// Tipos
export type {
  ExamSimulation,
  ExamSimulationsResponse,
  ExamSimulationStatusResponse,
  ApiError,
  SimulationApplicantSearchRequest,
  SimulationApplicantSearchResponse,
  SimulationApplicant,
  SimulationApplicantProcess,
  SimulationApplicantSuccessResponse,
  SimulationApplicantErrorResponse,
} from './types/exam-simulation.types';

// Configuración
export { API_CONFIG } from './config/api.config';

// Cliente API (por si necesitas usarlo directamente)
export { apiClient } from './utils/api-client';

