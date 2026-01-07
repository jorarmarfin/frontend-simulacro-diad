'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthGuard } from '@/lib/hooks/useAuthGuard';

interface AuthGuardProps {
  children: ReactNode;
}

// Rutas que no requieren autenticación
const PUBLIC_ROUTES = ['/intranet/personal-data'];

/**
 * Componente que protege las rutas del intranet
 * Muestra loading mientras verifica la sesión
 * Redirige al inicio si no hay sesión
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const { isAuthenticated, isLoading } = useAuthGuard({ skip: isPublicRoute });

  // Si es ruta pública, mostrar directamente el contenido
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Mostrar loading mientras verifica
  if (isLoading) {
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

