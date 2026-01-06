/**
 * Servicio para manejar el almacenamiento local de datos del simulacro
 */

import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

const STORAGE_KEYS = {
  IS_VIRTUAL: 'simulacro_is_virtual',
  APPLICANT_UUID: 'simulacro_applicant_uuid',
  APPLICANT_DATA: 'simulacro_applicant_data',
} as const;

export class SimulationStorageService {
  /**
   * Guarda si el simulacro es virtual o presencial
   */
  static setIsVirtual(isVirtual: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.IS_VIRTUAL, JSON.stringify(isVirtual));
    }
  }

  /**
   * Obtiene si el simulacro es virtual
   * @returns true si es virtual, false si es presencial, null si no hay dato
   */
  static getIsVirtual(): boolean | null {
    if (typeof window === 'undefined') return null;

    const value = localStorage.getItem(STORAGE_KEYS.IS_VIRTUAL);
    if (value === null) return null;

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  /**
   * Verifica si requiere foto (solo cuando NO es virtual)
   */
  static requiresPhoto(): boolean {
    const isVirtual = this.getIsVirtual();
    // Si es virtual (true), NO requiere foto
    // Si es presencial (false), SÍ requiere foto
    return isVirtual === false;
  }

  /**
   * Limpia los datos del storage
   */
  static clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.IS_VIRTUAL);
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_UUID);
    }
  }

  /**
   * Guarda el UUID del postulante
   */
  static setApplicantUuid(uuid: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.APPLICANT_UUID, uuid);
    }
  }

  /**
   * Obtiene el UUID del postulante
   * @returns UUID del postulante o null si no existe
   */
  static getApplicantUuid(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.APPLICANT_UUID);
  }

  /**
   * Verifica si existe un postulante registrado
   */
  static hasApplicant(): boolean {
    return this.getApplicantUuid() !== null;
  }

  /**
   * Guarda los datos completos del postulante
   */
  static setApplicantData(data: SimulationApplicant): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.APPLICANT_DATA, JSON.stringify(data));
      // También guardar el UUID para acceso rápido
      this.setApplicantUuid(data.uuid);
    }
  }

  /**
   * Obtiene los datos completos del postulante
   */
  static getApplicantData(): SimulationApplicant | null {
    if (typeof window === 'undefined') return null;

    const value = localStorage.getItem(STORAGE_KEYS.APPLICANT_DATA);
    if (!value) return null;

    try {
      return JSON.parse(value) as SimulationApplicant;
    } catch {
      return null;
    }
  }

  /**
   * Limpia solo los datos del usuario (mantiene configuración del simulacro)
   */
  static clearApplicantData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_UUID);
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_DATA);
    }
  }
}

