/**
 * Cliente HTTP con manejo de errores y configuración centralizada
 */

import { API_CONFIG } from '@/lib/config/api.config';
import type { ApiError } from '@/lib/types/exam-simulation.types';

interface RequestConfig extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, timeout: number = 30000) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  /**
   * Método privado para realizar peticiones HTTP
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, ...fetchConfig } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchConfig,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchConfig.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = {
          message: `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };

        try {
          const errorData = await response.json();
          error.message = errorData.message || error.message;
          error.errors = errorData.errors;
        } catch {
          // Si no se puede parsear el error, usar el mensaje por defecto
        }

        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw {
            message: 'La petición ha excedido el tiempo límite',
            status: 408,
          } as ApiError;
        }
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Petición GET
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * Petición POST
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Petición PUT
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Petición PATCH
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Petición DELETE
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Instancia única del cliente API
export const apiClient = new ApiClient(
  API_CONFIG.baseURL,
  API_CONFIG.timeout
);

