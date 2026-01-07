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
 * - Permite acceso libre a todas las páginas mientras no haya confirmado
 * - Después de confirmar completamente, solo permite acceso a /intranet/final
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

    // Verificar si todos los pasos están completos para considerar confirmado
    const hasPersonalData = userData?.process?.pre_registration !== null;
    const hasPayment = userData?.process?.payment !== null;
    const requiresPhoto = SimulationStorageService.requiresPhoto();
    const hasPhoto = !requiresPhoto || (userData?.photo_url !== null);
    const hasConfirmation = userData?.process?.confirmation !== null;

    // Solo está confirmado si tiene confirmación Y todos los pasos previos
    const isConfirmed = hasConfirmation && hasPersonalData && hasPayment && hasPhoto;

    const isFinalPage = pathname === '/intranet/final';

    // Si ya confirmó completamente, solo permitir acceso a la página final
    if (isConfirmed && !isFinalPage) {
      // Si ya confirmó, redirigir a la página final
      setTimeout(() => router.push('/intranet/final'), 0);
    }
    // Si NO está confirmado, permitir acceso a todas las páginas (incluida /final)
    // para que pueda completar el proceso y confirmar sus datos

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

