/**
 * Tipos para las simulaciones de examen
 */


export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ExamSimulationStatusResponse {
  data: {
    status: 'success' | 'error';
    is_active: boolean;
    description?: string;
    exam_date_start?: string; // Fecha inicio de inscripciones
    exam_date_end?: string; // Fecha fin de inscripciones
    exam_date?: string | null; // Fecha del examen
    is_virtual?: boolean; // Indica si el examen es virtual o presencial
    message?: string;
  };
}

export interface SimulationApplicantSearchRequest {
  dni: string;
  email: string;
}

export interface SimulationApplicantProcess {
  pre_registration: string | null;
  payment: string | null;
  photo_reviewed_at: string | null; // Fecha de revisión de la foto (nuevo campo)
  confirmation: string | null; // Nombre actualizado para coincidir con el API
  registration: string | null;
}

export interface SimulationApplicant {
  id: number;
  uuid: string; // UUID único para búsquedas del postulante
  code: string | null;
  dni: string;
  last_name_father: string;
  last_name_mother: string;
  first_names: string;
  email: string;
  phone_mobile: string; // Teléfono móvil
  phone_other: string | null; // Teléfono alternativo
  exam_description: string;
  photo_url?: string; // URL de la foto del postulante
  classroom_assignment?: string; // Aula asignada proveniente del endpoint /simulation-applicants/{uuid}
  process: SimulationApplicantProcess;
}

// Request para crear un nuevo applicant
export interface SimulationApplicantCreateRequest {
  dni: string;
  last_name_father: string;
  last_name_mother: string;
  first_names: string;
  email: string;
  phone_mobile: string;
  phone_other?: string;
}

// Response al crear un applicant exitosamente
export interface SimulationApplicantCreateSuccessResponse {
  status: 'success';
  data: SimulationApplicant;
  message?: string;
}

// Response de error al crear
export interface SimulationApplicantCreateErrorResponse {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
}

export type SimulationApplicantCreateResponse =
  | SimulationApplicantCreateSuccessResponse
  | SimulationApplicantCreateErrorResponse;

export interface SimulationApplicantSuccessResponse {
  status: 'success';
  data: SimulationApplicant;
}

export interface SimulationApplicantErrorResponse {
  status: 'error';
  message: string;
}

export type SimulationApplicantSearchResponse =
  | SimulationApplicantSuccessResponse
  | SimulationApplicantErrorResponse;

// Response al subir foto exitosamente
export interface UploadPhotoSuccessResponse {
  status: 'success';
  message: string;
  data?: {
    photo_url?: string;
  };
}

// Response de error al subir foto
export interface UploadPhotoErrorResponse {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
}

export type UploadPhotoResponse =
  | UploadPhotoSuccessResponse
  | UploadPhotoErrorResponse;

// Estados posibles de la foto
export type PhotoStatus = 'pending' | 'approved' | 'rejected' | null;

// Response del estado de la foto
export interface PhotoStatusResponse {
  status: 'success' | 'error';
  found: boolean;
  photo_status?: PhotoStatus;
  photo_rejected_reason?: string; // Solo cuando photo_status es 'rejected'
  message?: string; // Cuando found es false
}

// Request para confirmar datos del postulante
export interface ConfirmApplicantRequest {
  uuid: string;
}

// Response al confirmar datos exitosamente
export interface ConfirmApplicantSuccessResponse {
  status: 'success';
  message: string;
  data?: SimulationApplicant;
}

// Response de error al confirmar
export interface ConfirmApplicantErrorResponse {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
}

export type ConfirmApplicantResponse =
  | ConfirmApplicantSuccessResponse
  | ConfirmApplicantErrorResponse;

// Response del estado del proceso de registro
export interface ProcessStatusSuccessResponse {
  status: 'success';
  message: string;
  data: {
    process: SimulationApplicantProcess;
  };
}

export interface ProcessStatusErrorResponse {
  status: 'error';
  message: string;
}

export type ProcessStatusResponse =
  | ProcessStatusSuccessResponse
  | ProcessStatusErrorResponse;

