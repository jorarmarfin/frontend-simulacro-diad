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

