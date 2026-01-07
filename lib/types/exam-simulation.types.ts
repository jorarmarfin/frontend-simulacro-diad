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
    exam_date_start?: string;
    exam_date_end?: string;
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
  data_confirmation: string | null;
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
  photo_url: string | null; // URL de la foto del postulante
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

