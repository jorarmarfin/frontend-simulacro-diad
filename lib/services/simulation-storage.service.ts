/**
 * Servicio para manejar el almacenamiento local de datos del simulacro
 */

import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

const STORAGE_KEYS = {
  IS_VIRTUAL: 'simulacro_is_virtual',
  EXAM_DATE: 'simulacro_exam_date',
  APPLICANT_UUID: 'simulacro_applicant_uuid',
  APPLICANT_DATA: 'simulacro_applicant_data',
  // Nuevas claves para gestionar sesión con TTL
  SESSION_EXPIRES_AT: 'simulacro_session_expires_at', // ISO string
  SESSION_TTL_MINUTES: 'simulacro_session_ttl_minutes' // number (minutes)
} as const;

export class SimulationStorageService {
  // Valor por defecto de TTL en minutos (se puede cambiar con setSessionTtlMinutes)
  private static DEFAULT_TTL_MINUTES = 60; // Asunción: 60 minutos por defecto

  // Debug: activar para ver la cuenta regresiva en consola (quitar luego)
  private static DEBUG = true;
  private static debugIntervalId: number | null = null;

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
      // Parsear la fecha en la zona horaria local para evitar problemas con UTC
      const [year, month, day] = examDate.split('-').map(Number);
      const date = new Date(year, month - 1, day);

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
      // Nuevas claves
      localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRES_AT);
      localStorage.removeItem(STORAGE_KEYS.SESSION_TTL_MINUTES);
    }
    this.stopDebugTimer();
  }

  /**
   * Guarda los datos completos del postulante
   */
  static setApplicantData(data: SimulationApplicant): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.APPLICANT_DATA, JSON.stringify(data));
      // También guardar el UUID para acceso rápido
      this.setApplicantUuid(data.uuid);

      // Al guardar datos del postulante, generar/actualizar la expiración de la sesión
      // Si no existe un TTL configurado, se usará DEFAULT_TTL_MINUTES
      this.setSessionExpirationFromNow();
    }
  }

  /**
   * Limpia solo los datos del usuario (mantiene configuración del simulacro)
   */
  static clearApplicantData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_UUID);
      localStorage.removeItem(STORAGE_KEYS.APPLICANT_DATA);
      // También eliminar expiración de sesión al hacer logout
      localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRES_AT);
    }
    this.stopDebugTimer();
  }

  /**
   * === Funciones de TTL / expiración de sesión ===
   */

  /**
   * Establece el TTL de sesión en minutos (valor editable)
   */
  static setSessionTtlMinutes(minutes: number): void {
    if (typeof window === 'undefined') return;
    const m = Math.max(1, Math.floor(minutes));
    localStorage.setItem(STORAGE_KEYS.SESSION_TTL_MINUTES, String(m));
  }

  /**
   * Obtiene el TTL de sesión en minutos
   */
  static getSessionTtlMinutes(): number {
    if (typeof window === 'undefined') return this.DEFAULT_TTL_MINUTES;
    const value = localStorage.getItem(STORAGE_KEYS.SESSION_TTL_MINUTES);
    if (!value) return this.DEFAULT_TTL_MINUTES;
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : this.DEFAULT_TTL_MINUTES;
  }

  /**
   * Calcula y guarda la fecha/hora de expiración de la sesión a partir del TTL actual
   */
  static setSessionExpirationFromNow(): void {
    if (typeof window === 'undefined') return;
    const ttl = this.getSessionTtlMinutes();
    const expiresAt = new Date(Date.now() + ttl * 60 * 1000).toISOString();
    localStorage.setItem(STORAGE_KEYS.SESSION_EXPIRES_AT, expiresAt);

    // Iniciar temporizador de depuración para mostrar cuenta regresiva en consola
    // (solo para debug, se puede quitar luego)
    // if (this.DEBUG) {
    //   this.startDebugTimer();
    // }
  }

  /**
   * Obtiene la fecha de expiración almacenada (ISO) o null
   */
  static getSessionExpiration(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRES_AT);
  }

  /**
   * Indica si la sesión ya expiró. NO modifica el storage.
   */
  static isSessionExpired(): boolean {
    if (typeof window === 'undefined') return true;
    const iso = this.getSessionExpiration();
    if (!iso) return true;
    const expires = Date.parse(iso);
    if (Number.isNaN(expires)) return true;
    return Date.now() > expires;
  }

  /**
   * Indica el tiempo restante en segundos hasta la expiración (puede ser negativo si ya expiró)
   */
  static getRemainingSeconds(): number {
    const iso = this.getSessionExpiration();
    if (!iso) return Number.NEGATIVE_INFINITY;
    const expires = Date.parse(iso);
    if (Number.isNaN(expires)) return Number.NEGATIVE_INFINITY;
    return Math.ceil((expires - Date.now()) / 1000);
  }

  /**
   * Verifica si existe sesión válida. Si está expirada limpia los datos del postulante.
   */
  static isSessionValid(): boolean {
    const hasApplicant = this.getApplicantUuid() !== null;
    if (!hasApplicant) return false;

    // Si hay UUID pero la sesión expiró, limpiar y retornar false
    if (this.isSessionExpired()) {
      if (this.DEBUG) {
        const iso = this.getSessionExpiration();
        console.log('[DEBUG] Session expired at', iso, '- clearing applicant data now');
      }
      this.clearApplicantData();
      this.stopDebugTimer();
      return false;
    }

    if (this.DEBUG) {
      const remaining = this.getRemainingSeconds();
      console.log('[DEBUG] Session is valid. Remaining seconds:', remaining);
    }

    return true;
  }

  /**
   * Inicia un intervalo de depuración que imprime la cuenta regresiva en consola.
   * Este timer es útil para verificar que la expiración y la limpieza ocurren.
   */
  private static startDebugTimer(): void {
    if (typeof window === 'undefined') return;

    // Si ya hay uno, limpiarlo
    if (this.debugIntervalId !== null) {
      window.clearInterval(this.debugIntervalId);
      this.debugIntervalId = null;
    }

    const tick = () => {
      const remaining = this.getRemainingSeconds();
      if (remaining === Number.NEGATIVE_INFINITY) {
        console.log('[DEBUG] No session expiration set');
        return;
      }
      if (remaining > 0) {
        console.log('[DEBUG] Session expires in', remaining, 'seconds');
      } else {
        console.log('[DEBUG] Session expired. Remaining seconds:', remaining, '- clearing applicant data');
        // Limpiar datos al expirar (esto asegura que la limpieza ocurra justo al llegar a 0)
        this.clearApplicantData();
        // parar el timer
        if (this.debugIntervalId !== null) {
          window.clearInterval(this.debugIntervalId);
          this.debugIntervalId = null;
        }
      }
    };

    // Llamada inmediata y luego interval cada segundo
    tick();
    this.debugIntervalId = window.setInterval(tick, 1000);
  }

  /**
   * Detiene el timer de depuración si existe
   */
  private static stopDebugTimer(): void {
    if (typeof window === 'undefined') return;
    if (this.debugIntervalId !== null) {
      window.clearInterval(this.debugIntervalId);
      this.debugIntervalId = null;
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

}
