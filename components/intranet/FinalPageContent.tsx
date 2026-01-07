'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { UserDataSummary } from '@/components/intranet/UserDataSummary';
import { FichaApplicant } from '@/components/intranet/FichaApplicant';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

/**
 * Componente cliente que maneja la lógica de la página final
 * Muestra el resumen si no está confirmado, o la ficha si ya confirmó
 */
export function FinalPageContent() {
  const router = useRouter();
  const [userData, setUserData] = useState<SimulationApplicant | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const data = SimulationStorageService.getApplicantData();

    if (!data) {
      // Si no hay datos, redirigir al inicio
      setTimeout(() => router.push('/intranet/personal-data'), 0);
      return;
    }

    // Usar setTimeout para evitar setState síncrono en effect
    setTimeout(() => {
      setUserData(data);
      setIsConfirmed(data.process.confirmation !== null);
    }, 0);
  }, [router]);

  // Si no hay datos, no mostrar nada
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-slate-500">
          <AlertCircle className="h-6 w-6" />
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  // Si no está confirmado, mostrar el summary para confirmar
  if (!isConfirmed) {
    return <UserDataSummary />;
  }

  // Si está confirmado, mostrar la ficha imprimible
  return <FichaApplicant userData={userData} />;
}

