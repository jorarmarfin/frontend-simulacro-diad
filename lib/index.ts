/**
 * Punto de entrada centralizado para el API de simulaciones de examen
 * Importa desde aquí para mayor comodidad
 */

// Servicios
export { ExamSimulationService } from './services/exam-simulation.service';
export { SimulationApplicantService } from './services/simulation-applicant.service';

// Hooks
export { useSimulationApplicantSearch } from './hooks/useSimulationApplicantSearch';
export { useActiveSimulation } from './hooks/useActiveSimulation';
export { useAuthGuard } from './hooks/useAuthGuard';
export { useSimulationMode } from './hooks/useSimulationMode';

// Tipos
export type {
  ApiError,
  ExamSimulationStatusResponse,
  SimulationApplicantSearchRequest,
  SimulationApplicantSearchResponse,
  SimulationApplicant,
  SimulationApplicantProcess,
  SimulationApplicantSuccessResponse,
  SimulationApplicantErrorResponse,
  SimulationApplicantCreateRequest,
  SimulationApplicantCreateResponse,
  SimulationApplicantCreateSuccessResponse,
  SimulationApplicantCreateErrorResponse,
  UploadPhotoResponse,
  UploadPhotoSuccessResponse,
  UploadPhotoErrorResponse,
  PhotoStatus,
  PhotoStatusResponse,
  ConfirmApplicantRequest,
  ConfirmApplicantResponse,
  ConfirmApplicantSuccessResponse,
  ConfirmApplicantErrorResponse,
  ProcessStatusResponse,
  ProcessStatusSuccessResponse,
  ProcessStatusErrorResponse,
} from './types/exam-simulation.types';

// Configuración
export { API_CONFIG } from './config/api.config';

// Cliente API (por si necesitas usarlo directamente)
export { apiClient } from './utils/api-client';

