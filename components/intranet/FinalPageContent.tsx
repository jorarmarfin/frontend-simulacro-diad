'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { UserDataSummary } from '@/components/intranet/UserDataSummary';
import { FichaApplicant } from '@/components/intranet/FichaApplicant';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

/**
 * Componente cliente que maneja la lógica de la página final
 * Muestra el resumen si no está confirmado, o la ficha si ya confirmó
 */
export function FinalPageContent() {
  const router = useRouter();
  const [userData, setUserData] = useState<SimulationApplicant | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplicantData = async () => {
      // Obtener datos del localStorage
      const localData = SimulationStorageService.getApplicantData();

      if (!localData) {
        // Si no hay datos, redirigir al inicio
        router.push('/intranet/personal-data');
        return;
      }

      try {
        // Consultar la API para obtener el estado actualizado del proceso
        const response = await SimulationApplicantService.getProcessStatus(localData.uuid);

        if (response.status === 'success') {
          // Actualizar el proceso en el localStorage
          const updatedData = {
            ...localData,
            process: response.data.process
          };
          SimulationStorageService.setApplicantData(updatedData);

          // Verificar si todos los pasos están completos:
          // 1. Datos personales (pre_registration)
          // 2. Pago (payment)
          // 3. Foto revisada (solo si es presencial - photo_reviewed_at)
          // 4. Confirmación final (confirmation)
          const hasPersonalData = response.data.process.pre_registration !== null;
          const hasPayment = response.data.process.payment !== null;
          const requiresPhoto = SimulationStorageService.requiresPhoto();
          const hasPhotoReviewed = !requiresPhoto || (response.data.process.photo_reviewed_at !== null);
          const hasConfirmation = response.data.process.confirmation !== null;

          // Solo está confirmado si tiene confirmación Y todos los pasos previos
          const fullyConfirmed = hasConfirmation && hasPersonalData && hasPayment && hasPhotoReviewed;

          setUserData(updatedData);
          setIsConfirmed(fullyConfirmed);
        } else {
          // Si hay error en la API, usar los datos del localStorage
          console.error('Error al obtener el estado del proceso:', response.message);

          const hasPersonalData = localData.process.pre_registration !== null;
          const hasPayment = localData.process.payment !== null;
          const requiresPhoto = SimulationStorageService.requiresPhoto();
          const hasPhotoReviewed = !requiresPhoto || (localData.process.photo_reviewed_at !== null);
          const hasConfirmation = localData.process.confirmation !== null;
          const fullyConfirmed = hasConfirmation && hasPersonalData && hasPayment && hasPhotoReviewed;

          setUserData(localData);
          setIsConfirmed(fullyConfirmed);
        }
      } catch (error) {
        console.error('Error al cargar el estado del proceso:', error);

        // Fallback a los datos del localStorage
        const hasPersonalData = localData.process.pre_registration !== null;
        const hasPayment = localData.process.payment !== null;
        const requiresPhoto = SimulationStorageService.requiresPhoto();
        const hasPhotoReviewed = !requiresPhoto || (localData.process.photo_reviewed_at !== null);
        const hasConfirmation = localData.process.confirmation !== null;
        const fullyConfirmed = hasConfirmation && hasPersonalData && hasPayment && hasPhotoReviewed;

        setUserData(localData);
        setIsConfirmed(fullyConfirmed);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplicantData();
  }, [router]);

  // Mostrar estado de carga mientras se consulta la API
  if (isLoading || !userData) {
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

