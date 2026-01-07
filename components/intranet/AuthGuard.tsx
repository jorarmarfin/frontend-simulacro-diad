'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthGuard } from '@/lib/hooks/useAuthGuard';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

interface AuthGuardProps {
  children: ReactNode;
}

// Rutas que no requieren autenticación
const PUBLIC_ROUTES = ['/intranet/personal-data'];


/**
 * Componente que protege las rutas del intranet
 * - Verifica la sesión del usuario
 * - Restringe acceso a rutas según el estado de confirmación
 * - Después de confirmar, solo permite acceso a /intranet/final
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const { isAuthenticated, isLoading } = useAuthGuard({ skip: isPublicRoute });
  const [isCheckingConfirmation, setIsCheckingConfirmation] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || isLoading || isPublicRoute) {
      setTimeout(() => setIsCheckingConfirmation(false), 0);
      return;
    }

    // Verificar estado de confirmación
    const userData = SimulationStorageService.getApplicantData();
    const isConfirmed = userData?.process?.confirmation !== null;
    const isFinalPage = pathname === '/intranet/final';

    if (isConfirmed && !isFinalPage) {
      // Si ya confirmó, redirigir a la página final
      setTimeout(() => router.push('/intranet/final'), 0);
    } else if (!isConfirmed && isFinalPage) {
      // Si no ha confirmado, no permitir acceso a la página final
      setTimeout(() => router.push('/intranet/personal-data'), 0);
    }

    setTimeout(() => setIsCheckingConfirmation(false), 0);
  }, [isAuthenticated, isLoading, pathname, router, isPublicRoute]);

  // Si es ruta pública, mostrar directamente el contenido
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Mostrar loading mientras verifica
  if (isLoading || isCheckingConfirmation) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-slate-500">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no renderizar nada (ya se redirigió)
  if (!isAuthenticated) {
    return null;
  }

  // Usuario autenticado, mostrar contenido
  return <>{children}</>;
}

