'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

/**
 * Botón de cerrar sesión con lógica de navegación
 */
export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Limpiar todo el localStorage del simulacro
    SimulationStorageService.clear();
    // Redirigir al inicio
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Cerrar Sesión</span>
    </button>
  );
}

