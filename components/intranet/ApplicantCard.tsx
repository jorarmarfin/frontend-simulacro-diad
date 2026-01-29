'use client';

import { forwardRef, useState, useEffect } from 'react';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import Image from "next/image";

interface ApplicantCardProps {
  data: SimulationApplicant;
}

/**
 * Componente de ficha imprimible del postulante
 * Diseñado para ser convertido a PDF con información legible
 */
export const ApplicantCard = forwardRef<HTMLDivElement, ApplicantCardProps>(
  ({ data }, ref) => {
    // Obtener la fecha del examen formateada desde localStorage
    const examDateFormatted = SimulationStorageService.getExamDateFormatted();

    // Estado para saber si el simulacro es virtual
    const [isVirtual, setIsVirtual] = useState<boolean>(false);

    // Leer el flag de localStorage al montar el componente
    useEffect(() => {
      const virtualFlag = SimulationStorageService.getIsVirtual();
      setIsVirtual(virtualFlag === true);
    }, []);

    return (
      <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto">
        {/* Encabezado oficial */}
        <div className="border-b-4 border-red-900 mb-6 flex">
          <Image src='/escudo-uni.png' alt='Escudo de la UNI' width={80} height={80} className="mx-2 mb-4" />
          <div className='items-center mt-3'>
            <h1 className="text-3xl font-bold text-red-900">
              UNIVERSIDAD NACIONAL DE INGENIERÍA
            </h1>
            <h2 className="text-xl font-semibold text-red-800">
              FICHA DE INSCRIPCIÓN - SIMULACRO DE EXAMEN DE ADMISIÓN
            </h2>
          </div>

        </div>

        {/* Información principal con foto */}
        <div className="flex gap-6 mb-8">
          {/* Foto del postulante - solo para exámenes presenciales */}
          {!isVirtual && (
            <div className="shrink-0">
              <div className="w-40 h-48 border-4 border-red-900 rounded-lg overflow-hidden bg-gray-100">
                {data.photo_url ? (
                  <img
                    src={data.photo_url}
                    alt="Foto del postulante"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    SIN FOTO
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Datos principales */}
          <div className="flex-1">
            {/* Código de postulante destacado */}
            {data.code && (
              <div className="bg-red-900 text-white p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-1">CÓDIGO DE POSTULANTE</p>
                <p className="text-3xl font-bold tracking-wider">{data.code}</p>
              </div>
            )}

            {/* Datos personales */}
            <div className="space-y-3">
              <div className="border-b-2 border-gray-300 pb-2">
                <p className="text-xs text-gray-600 font-medium uppercase">Apellidos y Nombres</p>
                <p className="text-lg font-bold text-gray-900">
                  {data.last_name_father} {data.last_name_mother}, {data.first_names}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-b-2 border-gray-300 pb-2">
                  <p className="text-xs text-gray-600 font-medium uppercase">DNI</p>
                  <p className="text-lg font-bold text-gray-900">{data.dni}</p>
                </div>
                <div className="border-b-2 border-gray-300 pb-2">
                  <p className="text-xs text-gray-600 font-medium uppercase">Correo</p>
                  <p className="text-sm font-semibold text-gray-900 break-all">{data.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información del examen */}
        <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-4 uppercase">
            📋 Información del Examen
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-700 font-medium uppercase">Modalidad</p>
              <p className="text-lg font-bold text-gray-900">{data.exam_description}</p>
            </div>

            {isVirtual ? (
              /* Información para examen virtual */
              <>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase">Fecha del Examen</p>
                  <p className="text-base font-bold text-gray-900">
                    {examDateFormatted || 'Por confirmar'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase">Plataforma Virtual</p>
                  <p className="text-base font-bold text-gray-900">
                    El enlace de acceso será enviado a su correo electrónico
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-700 font-medium uppercase">Horario de Conexión</p>
                  <p className="text-sm font-bold text-gray-900">El examen estara habilitado todo el día, con una duración de 3 horas.</p>
                </div>
              </>
            ) : (
              /* Información para examen presencial */
              <>
                {/* Fecha y aula del examen */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-700 font-medium uppercase">Fecha del Examen</p>
                    <p className="text-base font-bold text-gray-900">
                      {examDateFormatted || 'Por confirmar'}  <br /> Hora Ingreso: 7:30 a 8:30 a. m.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-700 font-medium uppercase">Aula Asignada</p>
                    <p className="text-base font-bold text-gray-900">
                      {data.classroom_assignment ?? 'Por asignar'}
                    </p>
                  </div>
                </div>

                {/* Puertas de ingreso habilitadas (información oficial) */}
                <div className="mt-4">
                  <p className="text-xs text-gray-700 font-medium uppercase">Puertas de ingreso habilitadas</p>
                  <p className="text-sm text-gray-900">Puerta N.° 3 – ubicada en el paradero Puente (Av. Túpac Amaru).</p>
                  <p className="text-sm text-gray-900">Puerta N.° 4 – Av. Habich.</p>
                </div>
              </>
            )}

          </div>
        </div>


        {/* Instrucciones importantes */}
        <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-red-900 mb-3 uppercase">
            ⚠️ Instrucciones Importantes
          </h3>
          {isVirtual ? (
            /* Instrucciones para examen virtual */
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
              <li>El examen estara habilitado todo el día, con una duración de 3 horas.</li>
              <li>El acceso a la plataforma se cerrara a las 23:59 de la noche.</li>
              <li>Contar con una conexión a internet estable (mínimo 5 Mbps)</li>
              <li>Utilizar una computadora o laptop</li>
              <li>Ubicarse en un ambiente tranquilo, bien iluminado y sin interrupciones</li>
              <li>Tener el navegador actualizado (Chrome, Firefox o Edge recomendados)</li>
            </ul>
          ) : (
            /* Instrucciones para examen presencial */
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
              <li>Debe presentarse 30 minutos antes del inicio del examen</li>
              <li>Traer documento de identidad original (DNI)</li>
              <li>Traer esta ficha impresa</li>
              <li>No está permitido ingresar con artículos electrónicos, como celulares, relojes inteligentes, USBs u otros dispositivos.</li>
              <li>No se permite el uso de aretes, capuchas, gorros, bufandas ni accesorios similares.</li>
              <li>La institución proporcionará lápiz, borrador y tajador a todos los postulantes.</li>
            </ul>
          )}
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-4 text-center">
          <p className="text-xs text-gray-600">
            Fecha de impresión: {new Date().toLocaleString('es-PE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Esta ficha es de uso personal e intransferible
          </p>
        </div>

        {/* Estilos para impresión */}
        <style jsx>{`
          @media print {
            @page {
              size: A4;
              margin: 1cm;
            }
            
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        `}</style>
      </div>
    );
  }
);

ApplicantCard.displayName = 'ApplicantCard';

