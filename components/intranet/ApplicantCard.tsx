'use client';

import { forwardRef, useState, useEffect } from 'react';
import type { SimulationApplicant } from '@/lib/types/exam-simulation.types';
import { MajorService } from '@/lib/services/major.service';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import { SiteService } from '@/lib/services/site.service';
import { MapPin } from 'lucide-react';
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

    const isVirtual = SimulationStorageService.getIsVirtual() === true;
    const isLocalSimulation = SimulationStorageService.getIsLocal() === true;
    const [resolvedSite, setResolvedSite] = useState<{
      siteId: number;
      name: string;
      local: string;
      direction: string;
      googleMapsUrl: string;
    } | null>(null);
    const [resolvedMajor, setResolvedMajor] = useState<{ majorId: number; label: string } | null>(null);

    const siteNameFromData = data.site?.name ?? data.site_name ?? null;
    const siteLocalFromData = data.site?.local ?? null;
    const siteDirectionFromData = data.site?.direction ?? null;
    const siteGoogleMapsFromData = data.site?.google_maps_url ?? null;
    const majorNameFromData = data.major?.name ?? data.major_name ?? null;

    const siteNameDisplay = siteNameFromData
      ? siteNameFromData
      : (resolvedSite && resolvedSite.siteId === data.site_id
        ? resolvedSite.name
        : (data.site_id ? `ID ${data.site_id}` : 'No aplica'));
    const siteLocalDisplay = siteLocalFromData
      ?? (resolvedSite && resolvedSite.siteId === data.site_id ? resolvedSite.local : null);
    const siteDirectionDisplay = siteDirectionFromData
      ?? (resolvedSite && resolvedSite.siteId === data.site_id ? resolvedSite.direction : null);
    const siteGoogleMapsUrl = siteGoogleMapsFromData
      ?? (resolvedSite && resolvedSite.siteId === data.site_id ? resolvedSite.googleMapsUrl : null);
    const normalizedSiteName = (siteNameDisplay || '').trim().toUpperCase();
    const showEntryGates = normalizedSiteName === 'LIMA';
    const showClassroomAssignment = Boolean(data.classroom_assignment && String(data.classroom_assignment).trim());

    const majorDisplay = majorNameFromData
      ? (data.major?.code ? `${data.major.code} - ${majorNameFromData}` : majorNameFromData)
      : (resolvedMajor && resolvedMajor.majorId === data.major_id
        ? resolvedMajor.label
        : (data.major_id ? `ID ${data.major_id}` : 'No registrada'));

    const hasCompleteSiteInfoFromData = Boolean(
      siteNameFromData && siteLocalFromData && siteDirectionFromData && siteGoogleMapsFromData
    );

    // Resolver datos completos de sede cuando no vienen en el payload
    useEffect(() => {
      let cancelled = false;
      const siteId = data.site_id;

      if (isLocalSimulation || hasCompleteSiteInfoFromData || siteId == null) {
        return;
      }

      (async () => {
        try {
          const sitesResp = await SiteService.getAll();
          if (cancelled || sitesResp.status !== 'success') return;
          const match = sitesResp.data.find((site) => site.id === siteId);
          if (match) {
            setResolvedSite({
              siteId,
              name: match.name,
              local: match.local,
              direction: match.direction,
              googleMapsUrl: match.google_maps_url
            });
          }
        } catch (error) {
          console.error('Error resolving site for applicant card:', error);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [
      hasCompleteSiteInfoFromData,
      data.site_id,
      isLocalSimulation,
      siteNameFromData,
      siteLocalFromData,
      siteDirectionFromData,
      siteGoogleMapsFromData
    ]);

    // Resolver nombre de especialidad cuando solo se tiene major_id
    useEffect(() => {
      let cancelled = false;
      const majorId = data.major_id;

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
          console.error('Error resolving major for applicant card:', error);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [majorNameFromData, data.major_id]);

    return (
      <div ref={ref} className="applicant-card bg-white p-8 max-w-4xl mx-auto print:p-4 print:max-w-none">
        {/* Encabezado oficial */}
        <div className="card-header border-b-4 border-red-900 mb-6 flex print:mb-3">
          <Image src='/escudo-uni.png' alt='Escudo de la UNI' width={80} height={80} className="mx-2 mb-4 print:mb-1 print:w-16 print:h-16" />
          <div className='items-center mt-3'>
            <h1 className="text-3xl font-bold text-red-900 print:text-2xl">
              UNIVERSIDAD NACIONAL DE INGENIERÍA
            </h1>
            <h2 className="text-xl font-semibold text-red-800 print:text-base">
              FICHA DE INSCRIPCIÓN - SIMULACRO DE EXAMEN DE ADMISIÓN
            </h2>
          </div>

        </div>

        {/* Información principal con foto */}
        <div className="flex gap-6 mb-8 print:gap-4 print:mb-4">
          {/* Foto del postulante - solo para exámenes presenciales */}
          {!isVirtual && (
            <div className="shrink-0">
              <div className="personal-photo-frame w-40 h-48 border-4 border-red-900 rounded-lg overflow-hidden bg-gray-100 print:w-32 print:h-40 print:border-2">
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
              <div className="applicant-code bg-red-900 text-white p-4 rounded-lg mb-4 print:p-3 print:mb-3">
                <p className="text-sm font-medium mb-1 print:text-xs">CÓDIGO DE POSTULANTE</p>
                <p className="text-3xl font-bold tracking-wider print:text-2xl">{data.code}</p>
              </div>
            )}

            {/* Datos personales */}
            <div className="space-y-3 print:space-y-2">
              <div className="border-b-2 border-gray-300 pb-2 print:pb-1">
                <p className="text-xs text-gray-600 font-medium uppercase">Apellidos y Nombres</p>
                <p className="text-lg font-bold text-gray-900 print:text-base">
                  {data.last_name_father} {data.last_name_mother}, {data.first_names}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 print:gap-3">
                <div className="border-b-2 border-gray-300 pb-2 print:pb-1">
                  <p className="text-xs text-gray-600 font-medium uppercase">DNI</p>
                  <p className="text-lg font-bold text-gray-900 print:text-base">{data.dni}</p>
                </div>
                <div className="border-b-2 border-gray-300 pb-2 print:pb-1">
                  <p className="text-xs text-gray-600 font-medium uppercase">Correo</p>
                  <p className="text-sm font-semibold text-gray-900 break-all print:text-xs">{data.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información del examen */}
        <div className="exam-section bg-yellow-50 border-2 border-yellow-600 rounded-lg p-6 mb-6 print:p-4 print:mb-4">
          <h3 className="text-lg font-bold text-yellow-900 mb-4 uppercase print:text-base print:mb-2">
            📋 Información del Examen
          </h3>
          <div className="space-y-3 print:space-y-2">
            <div className={`grid gap-4 print:gap-3 ${isLocalSimulation ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {!isLocalSimulation && (
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase">Sede</p>
                  <p className="text-base font-bold text-gray-900 print:text-sm">{siteNameDisplay}</p>
                  {siteLocalDisplay && (
                    <p className="text-sm text-gray-900 mt-1 print:text-xs">
                      <span className="font-semibold">Local:</span> {siteLocalDisplay}
                    </p>
                  )}
                  {siteDirectionDisplay && (
                    <p className="text-sm text-gray-900 mt-1 print:text-xs">
                      <span className="font-semibold">Dirección:</span> {siteDirectionDisplay}
                    </p>
                  )}
                  {siteGoogleMapsUrl && (
                    <a
                      href={siteGoogleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-blue-700 hover:text-blue-900 underline print:no-underline print:text-xs"
                    >
                      <MapPin className="h-4 w-4" />
                      Abrir Google Maps
                    </a>
                  )}
                </div>
              )}
              <div>
                <p className="text-xs text-gray-700 font-medium uppercase">Especialidad</p>
                <p className="text-base font-bold text-gray-900 print:text-sm">{majorDisplay}</p>
              </div>
            </div>

            {isVirtual ? (
              /* Información para examen virtual */
              <>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase">Fecha del Examen</p>
                  <p className="text-base font-bold text-gray-900 print:text-sm">
                    {examDateFormatted || 'Por confirmar'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase">Plataforma Virtual</p>
                  <p className="text-base font-bold text-gray-900 print:text-sm">
                    El enlace de acceso será enviado a su correo electrónico
                  </p>
                </div>
                <div className="mt-4 print:mt-2">
                  <p className="text-xs text-gray-700 font-medium uppercase">Horario de Conexión</p>
                  <p className="text-sm font-bold text-gray-900 print:text-xs">El examen estara habilitado todo el día, con una duración de 3 horas.</p>
                </div>
              </>
            ) : (
              /* Información para examen presencial */
              <>
                {/* Fecha y aula del examen */}
                <div className={`grid gap-4 print:gap-3 ${showClassroomAssignment ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  <div>
                    <p className="text-xs text-gray-700 font-medium uppercase">Fecha del Examen</p>
                    <p className="text-base font-bold text-gray-900 print:text-sm">
                      {examDateFormatted || 'Por confirmar'}  <br /> Hora Ingreso: 7:30 a 8:30 a. m.
                    </p>
                  </div>
                  {showClassroomAssignment && (
                    <div>
                      <p className="text-xs text-gray-700 font-medium uppercase">Aula Asignada</p>
                      <p className="text-base font-bold text-gray-900 print:text-sm">
                        {data.classroom_assignment}
                      </p>
                    </div>
                  )}
                </div>

                {/* Puertas de ingreso habilitadas (solo sede Lima) */}
                {showEntryGates && (
                  <div className="mt-4 print:mt-2">
                    <p className="text-xs text-gray-700 font-medium uppercase">Puertas de ingreso habilitadas</p>
                    <p className="text-sm text-gray-900 print:text-xs">Puerta N.° 3 – ubicada en el paradero Puente (Av. Túpac Amaru).</p>
                    <p className="text-sm text-gray-900 print:text-xs">Puerta N.° 4 – Av. Habich.</p>
                  </div>
                )}
              </>
            )}

          </div>
        </div>


        {/* Instrucciones importantes */}
        <div className="instructions-section bg-red-50 border-2 border-red-600 rounded-lg p-6 mb-6 print:p-4 print:mb-3">
          <h3 className="text-lg font-bold text-red-900 mb-3 uppercase print:text-base print:mb-2">
            ⚠️ Instrucciones Importantes
          </h3>
          {isVirtual ? (
            /* Instrucciones para examen virtual */
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-800 print:space-y-1 print:text-xs">
              <li>El examen estara habilitado todo el día, con una duración de 3 horas.</li>
              <li>El acceso a la plataforma se cerrara a las 23:59 de la noche.</li>
              <li>Contar con una conexión a internet estable (mínimo 5 Mbps)</li>
              <li>Utilizar una computadora o laptop</li>
              <li>Ubicarse en un ambiente tranquilo, bien iluminado y sin interrupciones</li>
              <li>Tener el navegador actualizado (Chrome, Firefox o Edge recomendados)</li>
            </ul>
          ) : (
            /* Instrucciones para examen presencial */
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-800 print:space-y-1 print:text-xs">
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
        <div className="border-t-2 border-gray-300 pt-4 text-center print:pt-2">
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
              margin: 0.6cm;
            }
            
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .applicant-card {
              line-height: 1.2;
            }

            .card-header,
            .exam-section,
            .instructions-section {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        `}</style>
      </div>
    );
  }
);

ApplicantCard.displayName = 'ApplicantCard';
