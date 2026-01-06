/**
 * Servicio para manejar el almacenamiento local de datos del simulacro
 */

const STORAGE_KEYS = {
  IS_VIRTUAL: 'simulacro_is_virtual',
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
    }
  }
}

