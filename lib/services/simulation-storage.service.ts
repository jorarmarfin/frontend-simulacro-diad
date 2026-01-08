/**
 * Servicio para manejar el almacenamiento local de datos del simulacro
 */

import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

const STORAGE_KEYS = {
  IS_VIRTUAL: 'simulacro_is_virtual',
  EXAM_DATE: 'simulacro_exam_date',
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
   * Guarda la fecha del examen
   */
  static setExamDate(examDate: string | null): void {
    if (typeof window !== 'undefined') {
      if (examDate) {
        localStorage.setItem(STORAGE_KEYS.EXAM_DATE, examDate);
      } else {
        localStorage.removeItem(STORAGE_KEYS.EXAM_DATE);
      }
    }
  }

  /**
   * Obtiene la fecha del examen
   * @returns Fecha del examen en formato ISO o null si no existe
   */
  static getExamDate(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.EXAM_DATE);
  }

  /**
   * Obtiene la fecha del examen formateada de manera amigable
   * @returns Fecha formateada (ej: "Sábado, 15 de Enero de 2026") o null
   */
  static getExamDateFormatted(): string | null {
    const examDate = this.getExamDate();
    if (!examDate) return null;

    try {
      const date = new Date(examDate);

      // Opciones para formato largo en español
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      const formatted = date.toLocaleDateString('es-PE', options);

      // Capitalizar la primera letra
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    } catch {
      return null;
    }
  }

  /**
   * Limpia todos los datos del storage (logout)
   */
  static clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.IS_VIRTUAL);
      localStorage.removeItem(STORAGE_KEYS.EXAM_DATE);
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_UUID);
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_DATA);
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

