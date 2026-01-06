'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';

export function UserDataSummary() {
  const [userData, setUserData] = useState<SimulationApplicant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    const data = SimulationStorageService.getApplicantData();
    setUserData(data);
  }, []);

  // Función para confirmar datos (aquí va la lógica futura)
  const handleConfirmData = async () => {
    setIsLoading(true);
    try {
      // TODO: Implementar lógica de confirmación con el API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Placeholder
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error al confirmar datos:', error);
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
          <div className="flex-shrink-0">
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

          {/* Descripción del examen */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <FileText className="h-4 w-4" />
              <span>Examen</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">
              {userData.exam_description}
            </p>
          </div>
        </div>

        {/* Estado del proceso */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Estado del proceso</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`rounded-lg p-3 text-center ${userData.process.pre_registration ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Pre-registro</p>
              <p className={`text-sm font-medium ${userData.process.pre_registration ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.pre_registration || 'Pendiente'}
              </p>
            </div>
            <div className={`rounded-lg p-3 text-center ${userData.process.payment ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Pago</p>
              <p className={`text-sm font-medium ${userData.process.payment ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.payment || 'Pendiente'}
              </p>
            </div>
            <div className={`rounded-lg p-3 text-center ${userData.process.data_confirmation ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Confirmación</p>
              <p className={`text-sm font-medium ${userData.process.data_confirmation ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.data_confirmation || 'Pendiente'}
              </p>
            </div>
            <div className={`rounded-lg p-3 text-center ${userData.process.registration ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Inscripción</p>
              <p className={`text-sm font-medium ${userData.process.registration ? 'text-green-700' : 'text-slate-400'}`}>
                {userData.process.registration || 'Pendiente'}
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de confirmación exitosa */}
        {isConfirmed && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-700 font-medium">
              ¡Datos confirmados exitosamente!
            </p>
          </div>
        )}

        {/* Botón confirmar */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleConfirmData}
            disabled={isLoading || isConfirmed}
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
        </div>
      </div>
    </div>
  );
}

