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
   */
  static async getProvinces(department: string | number): Promise<NormalizedUbigeo[]> {
    try {
      let endpoint: string;

      const asNumber = typeof department === 'number' || /^\d+$/.test(String(department));
      if (asNumber && Number.isFinite(Number(department))) {
        // Usar department_id cuando se pasa un id numérico
        endpoint = `${API_CONFIG.endpoints.ubigeos.provinces}?department_id=${encodeURIComponent(String(department))}`;
      } else {
        // Por compatibilidad usar department_code
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
   */
  static async getDistricts(province: string | number): Promise<NormalizedUbigeo[]> {
    try {
      const asNumber = typeof province === 'number' || /^\d+$/.test(String(province));
      const endpoint = asNumber
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
