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

    // Verificar si todos los pasos están completos:
    // 1. Datos personales (pre_registration)
    // 2. Pago (payment)
    // 3. Foto (solo si es presencial y tiene photo_url)
    // 4. Confirmación final (confirmation)
    const hasPersonalData = data.process.pre_registration !== null;
    const hasPayment = data.process.payment !== null;
    const requiresPhoto = SimulationStorageService.requiresPhoto();
    const hasPhoto = !requiresPhoto || (data.photo_url !== null);
    const hasConfirmation = data.process.confirmation !== null;

    // Solo está confirmado si tiene confirmación Y todos los pasos previos
    const fullyConfirmed = hasConfirmation && hasPersonalData && hasPayment && hasPhoto;

    // Usar setTimeout para evitar setState síncrono en effect
    setTimeout(() => {
      setUserData(data);
      setIsConfirmed(fullyConfirmed);
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

