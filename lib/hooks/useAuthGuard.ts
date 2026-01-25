'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

interface UseAuthGuardOptions {
  skip?: boolean; // Si es true, no verifica autenticación
}

/**
 * Hook para proteger rutas del intranet
 * Redirige al inicio si no existe sesión (APPLICANT_UUID en localStorage)
 */
export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { skip = false } = options;
  const router = useRouter();
  // Evitar setState sincronico en useEffect: inicializar estados según `skip`
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(skip ? true : null);
  const [isLoading, setIsLoading] = useState(!skip);

  const checkAuth = useCallback(() => {
    if (skip) return true;

    // Usar la nueva verificación que considera expiración de sesión
    const isValid = SimulationStorageService.isSessionValid();

    if (!isValid) {
      // Si la sesión no es válida, redirigir al inicio
      router.replace('/');
      return false;
    }
    return true;
  }, [router, skip]);

  useEffect(() => {
    if (skip) {
      // Ya inicializamos isAuthenticated y isLoading según skip
      return;
    }

    const timer = setTimeout(() => {
      const authenticated = checkAuth();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [checkAuth, skip]);

  return { isAuthenticated, isLoading };
}
