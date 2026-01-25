/**
 * Tipos para las simulaciones de examen
 */


export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface AvailableTariff {
  id: number;
  code: string;
  description: string;
  amount: string; // Mantener como string ya que el API devuelve "80.00"
}

export interface ExamSimulationStatusResponse {
  data: {
    status: 'success' | 'error';
    is_active: boolean;
    is_inscription_open?: boolean; // Nuevo campo: si las inscripciones están abiertas
    description?: string;
    exam_date_start?: string; // Fecha inicio de inscripciones
    exam_date_end?: string; // Fecha fin de inscripciones
    exam_date?: string | null; // Fecha del examen
    is_virtual?: boolean; // Indica si el examen es virtual o presencial
    is_vocational?: boolean; // Nuevo campo: si incluye vocacional
    available_tariffs?: AvailableTariff[]; // Nuevos datos de tarifas disponibles
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

  // Campos nuevos/alternativos que pueden venir desde el API
  photo?: string | null; // ruta o id de la foto en el proceso
  photo_status?: PhotoStatus; // estado de la foto: 'pending' | 'approved' | 'rejected' | null
  photo_rejected_reason?: string | null;
  data_confirmation?: string | null; // nuevo nombre posible para confirmation
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
  photo_path?: string | null; // nuevo campo: ruta en storage
  include_vocational?: boolean; // si el postulante solicitó incluir vocacional
  exam_is_virtual?: boolean; // si el examen (en general) es virtual
  exam_include_vocational?: boolean; // si el examen incluye vocacional
  gender?: string; // nombre del género (puede venir como texto)
  birth_date?: string; // fecha de nacimiento
  ubigeo?: string; // ubigeo en formato 'DEPARTAMENTO/PROVINCIA/DISTRITO'
  tariff?: AvailableTariff | null; // tarifa seleccionada por el postulante
  requires_photo?: boolean; // si el examen requiere foto
  has_photo?: boolean; // si ya cargó foto
  classroom_assignment?: string | null; // Aula asignada proveniente del endpoint /simulation-applicants/{uuid}
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

export interface Gender {
  id: number;
  name: string;
}

export interface GendersResponse {
  status: 'success' | 'error';
  message?: string;
  data: Gender[];
}

export interface UbigeoItem {
  // Algunos endpoints ahora devuelven `id` en lugar de `code` para provincias
  id?: number;
  code?: string; // código antiguo (ej: 150200)
  // El nombre puede venir en distintas propiedades según el endpoint: 'province', 'name' o 'district'
  province?: string;
  name?: string;
  district?: string;
}

export interface UbigeoResponse {
  status: 'success' | 'error';
  message?: string;
  data: UbigeoItem[];
}
