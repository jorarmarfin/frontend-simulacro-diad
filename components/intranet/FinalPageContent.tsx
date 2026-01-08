'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { FichaApplicant } from '@/components/intranet/FichaApplicant';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

/**
 * Componente cliente que maneja la lógica de la página final
 * Solo muestra la ficha si el usuario ya confirmó sus datos
 * Si no ha confirmado, redirige a personal-data-confirm
 */
export function FinalPageContent() {
  const router = useRouter();
  const [userData, setUserData] = useState<SimulationApplicant | null>(null);
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

          // Verificar si ya confirmó sus datos
          const hasConfirmation = response.data.process.confirmation !== null;

          if (!hasConfirmation) {
            // Si no ha confirmado, redirigir a la página de confirmación
            router.push('/intranet/personal-data-confirm');
            return;
          }

          // Si ya confirmó, mostrar los datos
          setUserData(updatedData);
        } else {
          // Si hay error en la API, verificar con datos del localStorage
          console.error('Error al obtener el estado del proceso:', response.message);

          const hasConfirmation = localData.process.confirmation !== null;

          if (!hasConfirmation) {
            router.push('/intranet/personal-data-confirm');
            return;
          }

          setUserData(localData);
        }
      } catch (error) {
        console.error('Error al cargar el estado del proceso:', error);

        // Fallback a los datos del localStorage
        const hasConfirmation = localData.process.confirmation !== null;

        if (!hasConfirmation) {
          router.push('/intranet/personal-data-confirm');
          return;
        }

        setUserData(localData);
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

  // Mostrar la ficha imprimible
  return <FichaApplicant userData={userData} />;
}

