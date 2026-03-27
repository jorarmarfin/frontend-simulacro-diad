'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle,
  Edit,
  Camera
} from 'lucide-react';
import { MajorService } from '@/lib/services/major.service';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import { SiteService } from '@/lib/services/site.service';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

export function UserDataSummary() {
  const router = useRouter();
  const [userData, setUserData] = useState<SimulationApplicant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canConfirm, setCanConfirm] = useState(false);
  const [resolvedSite, setResolvedSite] = useState<{ siteId: number; label: string } | null>(null);
  const [resolvedMajor, setResolvedMajor] = useState<{ majorId: number; label: string } | null>(null);

  // Función para cargar el estado del proceso
  const loadProcessStatus = async (uuid: string) => {
    try {
      const response = await SimulationApplicantService.getProcessStatus(uuid);

      if (response.status === 'success' && response.data?.process) {
        // Actualizar solo el proceso en userData
        setUserData(prevData => {
          if (!prevData) return null;
          const updatedData = {
            ...prevData,
            process: response.data.process,
          };
          // Actualizar también en localStorage
          SimulationStorageService.setApplicantData(updatedData);
          return updatedData;
        });
      }
    } catch (error) {
      console.error('Error al cargar estado del proceso:', error);
    }
  };

  // Cargar datos del usuario desde localStorage y refrescar desde API
  useEffect(() => {
    const loadApplicantData = async () => {
      const localData = SimulationStorageService.getApplicantData();
      if (!localData?.uuid) {
        setUserData(localData);
        return;
      }

      try {
        const [processResponse, applicantResponse] = await Promise.all([
          SimulationApplicantService.getProcessStatus(localData.uuid),
          SimulationApplicantService.getByUuid(localData.uuid)
        ]);

        const freshestApplicantData =
          SimulationApplicantService.isSuccessResponse(applicantResponse)
            ? { ...localData, ...applicantResponse.data }
            : localData;

        const updatedData =
          processResponse.status === 'success' && processResponse.data?.process
            ? { ...freshestApplicantData, process: processResponse.data.process }
            : freshestApplicantData;

        SimulationStorageService.setApplicantData(updatedData);
        setUserData(updatedData);
      } catch (error) {
        console.error('Error cargando datos completos del postulante:', error);
        setUserData(localData);
      }
    };

    loadApplicantData();
  }, []);

  const siteNameFromData = userData?.site?.name ?? userData?.site_name ?? null;
  const majorNameFromData = userData?.major?.name ?? userData?.major_name ?? null;

  const siteDisplay = siteNameFromData
    ? (userData?.site?.code ? `${userData.site.code} - ${siteNameFromData}` : siteNameFromData)
    : (resolvedSite && resolvedSite.siteId === userData?.site_id
      ? resolvedSite.label
      : (userData?.site_id ? `ID ${userData.site_id}` : 'No aplica'));

  const majorDisplay = majorNameFromData
    ? (userData?.major?.code ? `${userData.major.code} - ${majorNameFromData}` : majorNameFromData)
    : (resolvedMajor && resolvedMajor.majorId === userData?.major_id
      ? resolvedMajor.label
      : (userData?.major_id ? `ID ${userData.major_id}` : 'No registrada'));

  // Resolver nombre de sede cuando solo se tiene site_id
  useEffect(() => {
    let cancelled = false;
    const siteId = userData?.site_id;

    if (siteNameFromData || siteId == null) {
      return;
    }

    (async () => {
      try {
        const sitesResp = await SiteService.getAll();
        if (cancelled || sitesResp.status !== 'success') return;

        const match = sitesResp.data.find((site) => site.id === siteId);
        if (match) {
          setResolvedSite({ siteId, label: `${match.code} - ${match.name}` });
        }
      } catch (error) {
        console.error('Error resolving site on summary:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [siteNameFromData, userData?.site_id]);

  // Resolver nombre de especialidad cuando solo se tiene major_id
  useEffect(() => {
    let cancelled = false;
    const majorId = userData?.major_id;

    if (majorNameFromData || majorId == null) {
      return;
    }

    (async () => {
      try {
        const majorsResp = await MajorService.getAll();
        if (cancelled || majorsResp.status !== 'success') return;

        const match = majorsResp.data.find((major) => major.id === majorId);
        if (match) {
          setResolvedMajor({ majorId, label: match.name });
        }
      } catch (error) {
        console.error('Error resolving major on summary:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [majorNameFromData, userData?.major_id]);

  // Recalcular canConfirm cada vez que userData cambie
  useEffect(() => {
    if (userData) {
      const hasPersonalData = userData.process.pre_registration !== null;
      const hasPayment = userData.process.payment !== null;
      const requiresPhoto = SimulationStorageService.requiresPhoto();
      const hasPhotoReviewed = !requiresPhoto || (userData.process.photo_reviewed_at !== null);

      // Debug: Ver valores
      console.log('🔍 Validación de confirmación:', {
        hasPersonalData,
        hasPayment,
        requiresPhoto,
        hasPhotoReviewed,
        photo_reviewed_at: userData.process.photo_reviewed_at,
        canConfirm: hasPersonalData && hasPayment && hasPhotoReviewed
      });

      // Puede confirmar si tiene todos los pasos previos completos
      setCanConfirm(hasPersonalData && hasPayment && hasPhotoReviewed);
    } else {
      setCanConfirm(false);
    }
  }, [userData]); // Se ejecuta cada vez que userData cambie

  // Función para confirmar datos
  const handleConfirmData = async () => {
    if (!userData?.uuid) {
      setErrorMessage('No se encontró el identificador del postulante');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await SimulationApplicantService.confirm(userData.uuid);

      if (response.status === 'success') {
        setIsConfirmed(true);

        // Actualizar los datos en localStorage si vienen en la respuesta
        if (response.data) {
          const mergedData = {
            ...userData,
            ...response.data,
            process: response.data.process ?? userData.process
          } as SimulationApplicant;
          SimulationStorageService.setApplicantData(mergedData);
          setUserData(mergedData);
        }

        // Recargar el estado del proceso después de confirmar
        await loadProcessStatus(userData.uuid);

        // Redirigir a la página final después de 1 segundo
        setTimeout(() => {
          router.push('/intranet/final');
        }, 1000);
      } else {
        setErrorMessage(response.message || 'Error al confirmar los datos');
      }
    } catch (error) {
      console.error('Error al confirmar datos:', error);
      setErrorMessage('Error inesperado al confirmar los datos. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center justify-center gap-3 text-slate-500">
            <AlertCircle className="h-6 w-6" />
            <p>No se encontraron datos del postulante.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Resumen de Inscripción
          </h1>
          <p className="mt-2 text-slate-600">
            Verifica que todos tus datos sean correctos antes de confirmar
          </p>
        </div>

        {/* Foto y datos principales */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Foto del postulante */}
          <div className="shrink-0">
            <div className="w-40 h-48 mx-auto md:mx-0 rounded-lg overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
              {userData.photo_url ? (
                <img
                  src={userData.photo_url}
                  alt="Foto del postulante"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-16 w-16 text-slate-300" />
                </div>
              )}
            </div>
            {userData.photo_url && (
              <p className="text-center text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Foto registrada
              </p>
            )}
          </div>

          {/* Datos del postulante */}
          <div className="flex-1 space-y-4">
            {/* Nombre completo */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                <User className="h-4 w-4" />
                <span>Nombre completo</span>
              </div>
              <p className="text-lg font-semibold text-slate-900">
                {userData.first_names} {userData.last_name_father} {userData.last_name_mother}
              </p>
            </div>

            {/* DNI */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                <FileText className="h-4 w-4" />
                <span>Documento de identidad</span>
              </div>
              <p className="text-lg font-semibold text-slate-900">
                DNI: {userData.dni}
              </p>
            </div>

            {/* Email */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                <Mail className="h-4 w-4" />
                <span>Correo electrónico</span>
              </div>
              <p className="text-lg font-semibold text-slate-900">
                {userData.email}
              </p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Código de postulante */}
          {userData.code && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 text-sm mb-1">
                <FileText className="h-4 w-4" />
                <span>Código de postulante</span>
              </div>
              <p className="text-lg font-bold text-blue-800">
                {userData.code}
              </p>
            </div>
          )}

          {/* Sede */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <FileText className="h-4 w-4" />
              <span>Sede</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">
              {siteDisplay}
            </p>
          </div>

          {/* Especialidad */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <FileText className="h-4 w-4" />
              <span>Especialidad</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">
              {majorDisplay}
            </p>
          </div>
        </div>

        {/* Estado del proceso */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Estado del proceso</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Pre-registro */}
            <div className={`rounded-lg p-3 text-center ${userData.process.pre_registration ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Pre-registro</p>
              <p className={`text-sm font-medium ${userData.process.pre_registration ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.pre_registration || 'Pendiente'}
              </p>
            </div>

            {/* Pago */}
            <div className={`rounded-lg p-3 text-center ${userData.process.payment ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Pago</p>
              <p className={`text-sm font-medium ${userData.process.payment ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.payment || 'Pendiente'}
              </p>
            </div>

            {/* Foto Revisada - Solo mostrar si el simulacro requiere foto */}
            {SimulationStorageService.requiresPhoto() && (
              <div className={`rounded-lg p-3 text-center ${userData.process.photo_reviewed_at ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
                <p className="text-xs text-slate-500 mb-1">Foto Revisada</p>
                <p className={`text-sm font-medium ${userData.process.photo_reviewed_at ? 'text-green-700' : 'text-slate-400'}`}>
                  {userData.process.photo_reviewed_at || 'Pendiente'}
                </p>
              </div>
            )}

            {/* Confirmación */}
            <div className={`rounded-lg p-3 text-center ${userData.process.confirmation ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Confirmación</p>
              <p className={`text-sm font-medium ${userData.process.confirmation ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.confirmation || 'Pendiente'}
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de advertencia si falta completar pasos */}
        {!canConfirm && !isConfirmed && (
          <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium mb-2">
                Completa todos los pasos antes de confirmar
              </p>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                {!userData?.process.pre_registration && <li>Registra tus datos personales</li>}
                {!userData?.process.payment && <li>Realiza el pago del simulacro</li>}
                {SimulationStorageService.requiresPhoto() && !userData?.process.photo_reviewed_at && <li>Espera que tu fotografía sea revisada</li>}
              </ul>
            </div>
          </div>
        )}

        {/* Mensaje de confirmación exitosa */}
        {isConfirmed && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-700 font-medium">
              ¡Datos confirmados exitosamente!
            </p>
          </div>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-700 font-medium">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Botones de navegación/edición - Solo si no ha confirmado */}
        {!isConfirmed && !userData?.process.confirmation && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => router.push('/intranet/payments-data')}
              className="flex justify-center items-center rounded-md bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200 border border-slate-300 transition-all duration-200"
            >
              <Edit className="mr-2 h-5 w-5" />
              Ver Datos de Pago
            </button>

            {SimulationStorageService.requiresPhoto() && (
              <button
                type="button"
                onClick={() => router.push('/intranet/personal-photo')}
                className="flex justify-center items-center rounded-md bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200 border border-slate-300 transition-all duration-200"
              >
                <Camera className="mr-2 h-5 w-5" />
                Editar Fotografía
              </button>
            )}
          </div>
        )}

        {/* Botón confirmar */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleConfirmData}
            disabled={isLoading || isConfirmed || !canConfirm}
            className="w-full flex justify-center items-center rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Confirmando...
              </>
            ) : isConfirmed ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Datos Confirmados
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Confirmar Datos
              </>
            )}
          </button>

          {!canConfirm && !isConfirmed && (
            <p className="mt-2 text-center text-xs text-slate-500">
              Completa todos los pasos previos para confirmar tus datos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
