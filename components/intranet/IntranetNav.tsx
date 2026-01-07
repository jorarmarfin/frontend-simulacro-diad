'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Camera, CreditCard, FileCheck, LucideIcon } from 'lucide-react';
import { useSimulationMode } from '@/lib/hooks/useSimulationMode';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import { useEffect, useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  requiresPresencial?: boolean; // Solo mostrar si es presencial (no virtual)
}

// Configuración de navegación
const NAV_ITEMS: NavItem[] = [
  { href: '/intranet/personal-data', label: 'Datos Personales', icon: User },
  { href: '/intranet/personal-photo', label: 'Foto', icon: Camera, requiresPresencial: true },
  { href: '/intranet/payments-data', label: 'Pagos', icon: CreditCard },
  { href: '/intranet/final', label: 'Finalizar', icon: FileCheck },
];

/**
 * Componente de navegación del intranet con estado activo reactivo
 * Muestra/oculta el menú de foto según si el simulacro es virtual o presencial
 * Desactiva los enlaces cuando el usuario ya confirmó sus datos
 */
export function IntranetNav() {
  const pathname = usePathname();
  const { requiresPhoto } = useSimulationMode();
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Verificar si el usuario ya confirmó sus datos
  useEffect(() => {
    const userData = SimulationStorageService.getApplicantData();

    // Verificar si todos los pasos están completos para considerar confirmado
    const hasPersonalData = userData?.process?.pre_registration !== null;
    const hasPayment = userData?.process?.payment !== null;
    const requiresPhotoCheck = SimulationStorageService.requiresPhoto();
    const hasPhotoReviewed = !requiresPhotoCheck || (userData?.process?.photo_reviewed_at !== null);
    const hasConfirmation = userData?.process?.confirmation !== null;

    // Solo está confirmado si tiene confirmación Y todos los pasos previos
    const fullyConfirmed = hasConfirmation && hasPersonalData && hasPayment && hasPhotoReviewed;

    setTimeout(() => setIsConfirmed(fullyConfirmed), 0);
  }, [pathname]); // Revalidar cuando cambia la ruta

  // Filtrar items según el modo del simulacro
  const visibleItems = NAV_ITEMS.filter(item => {
    // Si el item requiere presencial, solo mostrar si requiresPhoto es true
    if (item.requiresPresencial) {
      return requiresPhoto;
    }
    return true;
  });

  return (
    <nav className="hidden md:flex items-center gap-1">
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        const isFinalPage = item.href === '/intranet/final';

        // Si está confirmado, solo permitir acceso a la página final
        const isDisabled = isConfirmed && !isFinalPage;

        if (isDisabled) {
          // Mostrar como desactivado
          return (
            <div
              key={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-400 cursor-not-allowed opacity-50"
              title="Ya has confirmado tus datos. No puedes modificar esta sección."
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

