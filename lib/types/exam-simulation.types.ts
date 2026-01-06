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
  code: string | null;
  dni: string;
  last_name_father: string;
  last_name_mother: string;
  first_names: string;
  email: string;
  exam_description: string;
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

