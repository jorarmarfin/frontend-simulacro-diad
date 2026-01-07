import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type {
  SimulationApplicantSearchRequest,
  SimulationApplicantSearchResponse,
  SimulationApplicantCreateRequest,
  SimulationApplicantCreateResponse,
  SimulationApplicant,
  UploadPhotoResponse,
  PhotoStatusResponse,
} from '@/lib/types/exam-simulation.types';

export class SimulationApplicantService {
  /**
   * Busca un aplicante por DNI y email
   * @param data - Datos de búsqueda (DNI y email)
   * @returns Información del aplicante o error si no se encuentra
   */
  static async search(
    data: SimulationApplicantSearchRequest
  ): Promise<SimulationApplicantSearchResponse> {
    try {
      return await apiClient.post<SimulationApplicantSearchResponse>(
        API_CONFIG.endpoints.simulationApplicants.search,
        data
      );
    } catch (error) {
      console.error('Error searching simulation applicant:', error);

      // Si es un error de la API con respuesta estructurada
      if (error && typeof error === 'object' && 'status' in error) {
        return error as SimulationApplicantSearchResponse;
      }

      // Error genérico
      return {
        status: 'error',
        message: 'No se encontró un aplicante con los datos proporcionados',
      };
    }
  }

  /**
   * Crea un nuevo aplicante para el simulacro
   * @param data - Datos del aplicante a registrar
   * @returns Respuesta con el aplicante creado o error
   */
  static async create(
    data: SimulationApplicantCreateRequest
  ): Promise<SimulationApplicantCreateResponse> {
    try {
      return await apiClient.post<SimulationApplicantCreateResponse>(
        API_CONFIG.endpoints.simulationApplicants.base,
        data
      );
    } catch (error) {
      console.error('Error creating simulation applicant:', error);

      // Si es un error de la API con respuesta estructurada
      if (error && typeof error === 'object' && 'status' in error) {
        return error as SimulationApplicantCreateResponse;
      }

      // Error genérico
      return {
        status: 'error',
        message: 'Error al registrar el aplicante. Intente nuevamente.',
      };
    }
  }

  /**
   * Actualiza los datos de un aplicante existente
   * @param uuid - UUID del aplicante
   * @param data - Datos del aplicante a actualizar
   * @returns Respuesta con el aplicante actualizado o error
   */
  static async update(
    uuid: string,
    data: SimulationApplicantCreateRequest
  ): Promise<SimulationApplicantCreateResponse> {
    try {
      return await apiClient.put<SimulationApplicantCreateResponse>(
        API_CONFIG.endpoints.simulationApplicants.update(uuid),
        data
      );
    } catch (error) {
      console.error('Error updating simulation applicant:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        return error as SimulationApplicantCreateResponse;
      }

      return {
        status: 'error',
        message: 'Error al actualizar el aplicante. Intente nuevamente.',
      };
    }
  }

  /**
   * Type guard para verificar si la respuesta es exitosa
   * @param response - Respuesta de la búsqueda
   * @returns true si la respuesta es exitosa
   */
  static isSuccessResponse(
    response: SimulationApplicantSearchResponse | SimulationApplicantCreateResponse
  ): response is { status: 'success'; data: SimulationApplicant } {
    return response.status === 'success' && 'data' in response;
  }

  /**
   * Type guard para verificar si la respuesta es un error
   * @param response - Respuesta de la búsqueda
   * @returns true si la respuesta es un error
   */
  static isErrorResponse(
    response: SimulationApplicantSearchResponse | SimulationApplicantCreateResponse
  ): response is { status: 'error'; message: string } {
    return response.status === 'error' && 'message' in response;
  }

  /**
   * Sube la foto del postulante
   * @param uuid - UUID del postulante
   * @param photo - Archivo de imagen (jpg, png, max 2MB)
   * @returns Respuesta con el resultado de la subida
   */
  static async uploadPhoto(uuid: string, photo: File): Promise<UploadPhotoResponse> {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      return await apiClient.postFormData<UploadPhotoResponse>(
        API_CONFIG.endpoints.simulationApplicants.uploadPhoto(uuid),
        formData
      );
    } catch (error) {
      console.error('Error uploading photo:', error);

      // Si es un error de la API con respuesta estructurada
      if (error && typeof error === 'object' && 'status' in error) {
        return error as UploadPhotoResponse;
      }

      // Error genérico
      return {
        status: 'error',
        message: 'Error al subir la foto. Intente nuevamente.',
      };
    }
  }

  /**
   * Type guard para verificar si la respuesta de upload es exitosa
   */
  static isUploadSuccessResponse(
    response: UploadPhotoResponse
  ): response is { status: 'success'; message: string; data?: { photo_url?: string } } {
    return response.status === 'success';
  }

  /**
   * Obtiene los datos completos del postulante por UUID
   * @param uuid - UUID del postulante
   * @returns Información completa del postulante o error
   */
  static async getByUuid(uuid: string): Promise<SimulationApplicantSearchResponse> {
    try {
      return await apiClient.get<SimulationApplicantSearchResponse>(
        API_CONFIG.endpoints.simulationApplicants.searchByUuid(uuid)
      );
    } catch (error) {
      console.error('Error getting applicant by UUID:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        return error as SimulationApplicantSearchResponse;
      }

      return {
        status: 'error',
        message: 'Error al obtener los datos del postulante.',
      };
    }
  }

  /**
   * Obtiene el estado de la foto del postulante
   * @param uuid - UUID del postulante
   * @returns Estado de la foto (pending, approved, rejected, null)
   */
  static async getPhotoStatus(uuid: string): Promise<PhotoStatusResponse> {
    try {
      return await apiClient.get<PhotoStatusResponse>(
        API_CONFIG.endpoints.simulationApplicants.photoStatus(uuid)
      );
    } catch (error) {
      console.error('Error getting photo status:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        return error as PhotoStatusResponse;
      }

      return {
        status: 'error',
        found: false,
        message: 'Error al obtener el estado de la foto.',
      };
    }
  }
}

