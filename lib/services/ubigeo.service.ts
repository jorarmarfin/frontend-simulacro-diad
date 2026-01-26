import { apiClient } from '@/lib/utils/api-client';
import { API_CONFIG } from '@/lib/config/api.config';
import type { UbigeoResponse, UbigeoItem } from '@/lib/types/exam-simulation.types';

export interface NormalizedUbigeo {
  id: string; // siempre string para usar como value en selects
  name: string; // nombre legible
}

export class UbigeoService {
  static async getDepartments(): Promise<NormalizedUbigeo[]> {
    try {
      const resp = await apiClient.get<UbigeoResponse>(API_CONFIG.endpoints.ubigeos.departments);
      if (resp?.status === 'success' && Array.isArray(resp.data)) {
        return resp.data.map((item: UbigeoItem) => ({
          id: item.code ?? String(item.id ?? ''),
          name: item.province ?? item.name ?? item.district ?? '',
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
    }
  }

  /**
   * Obtener provincias por department code o por department id.
   * Acepta tanto '150000' (string code) como 15 (number id) según la API.
   * NOTA: si se pasa una cadena numérica se considera como CODE (por diseño del API actual),
   * solo cuando se pasa un `number` se usará department_id.
   */
  static async getProvinces(department: string | number): Promise<NormalizedUbigeo[]> {
    try {
      let endpoint: string;

      const isNumberType = typeof department === 'number';
      if (isNumberType) {
        // Usar department_id cuando se pasa un id numérico (tipo number)
        endpoint = `${API_CONFIG.endpoints.ubigeos.provinces}?department_id=${encodeURIComponent(String(department))}`;
      } else {
        // Por compatibilidad usar department_code (incluso si la cadena contiene solo dígitos)
        endpoint = `${API_CONFIG.endpoints.ubigeos.provinces}?department_code=${encodeURIComponent(String(department))}`;
      }

      const resp = await apiClient.get<UbigeoResponse>(endpoint);
      if (resp?.status === 'success' && Array.isArray(resp.data)) {
        return resp.data.map((item: UbigeoItem) => ({
          id: item.id ? String(item.id) : (item.code ?? ''),
          name: item.province ?? item.name ?? item.district ?? '',
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return [];
    }
  }

  /**
   * Obtener distritos por province code o por province id.
   * Si se pasa `number` se usa province_id; si se pasa `string` se usa province_code.
   */
  static async getDistricts(province: string | number): Promise<NormalizedUbigeo[]> {
    try {
      const isNumberType = typeof province === 'number';
      const endpoint = isNumberType
        ? `${API_CONFIG.endpoints.ubigeos.districts}?province_id=${encodeURIComponent(String(province))}`
        : `${API_CONFIG.endpoints.ubigeos.districts}?province_code=${encodeURIComponent(String(province))}`;

      const resp = await apiClient.get<UbigeoResponse>(endpoint);
      if (resp?.status === 'success' && Array.isArray(resp.data)) {
        return resp.data.map((item: UbigeoItem) => ({
          id: item.id ? String(item.id) : (item.code ?? ''),
          name: item.district ?? item.province ?? item.name ?? '',
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  }
}
