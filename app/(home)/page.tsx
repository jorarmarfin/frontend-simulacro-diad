import type { Metadata } from 'next';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {GoTopButton} from '@/components/ui/GoTopButton';
import Link from 'next/link';
import {HeroSection} from '@/components/home/HeroSection';
import {FeaturesSection} from '@/components/home/FeaturesSection';
import {HowItWorksSection} from '@/components/home/HowItWorksSection';
import {CTASection} from '@/components/home/CTASection';
import {RegistrationStatus} from '@/components/home/RegistrationStatus';
import {SimulationDates} from '@/components/home/SimulationDates';
import {ExamSimulationService} from '@/lib/services/exam-simulation.service';

// Deshabilitar el caché de la página para obtener datos frescas siempre
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: " Simulacro de Admision UNI - Página Principal",
    description: "Prepárate para tu admisión a la UNI con nuestro simulacro de examen en línea. Regístrate ahora y mejora tus habilidades.",
}
export default async function HomePage() {
    // Datos del simulacro
    let isActive = false;
    let isVirtual = false;
    let dateStart = '';
    let dateEnd = '';
    let examDate = null;
    let isInscriptionOpen = true; // Nuevo: por defecto asumimos abiertas

    try {
        const response = await ExamSimulationService.checkActiveSimulation();
        isActive = response.data.is_active;
        isVirtual = response.data.is_virtual ?? false;
        dateStart = response.data.exam_date_start ?? '';
        dateEnd = response.data.exam_date_end ?? '';
        examDate = response.data.exam_date ?? null;
        // Leer el nuevo campo is_inscription_open (si no viene, asumimos true para compatibilidad)
        isInscriptionOpen = typeof response.data.is_inscription_open === 'boolean'
            ? response.data.is_inscription_open
            : true;
    } catch (error) {
        // Si hay error en el API, mostrar como no activo
        console.error('Error al verificar simulacro activo:', error);
        isActive = false;
    }

    return (
        <div className="bg-slate-50 min-h-screen text-slate-700">

            <Header/>

            <main>
                {isActive ? (
                    // Si el simulacro está activo pero las inscripciones están cerradas,
                    // mostramos un card informativo en lugar del landing completo.
                    isInscriptionOpen ? (
                        <>
                            {/* Banner con fechas y guarda is_virtual en localStorage */}
                            {dateStart && dateEnd && (
                                <SimulationDates
                                    dateStart={dateStart}
                                    dateEnd={dateEnd}
                                    examDate={examDate}
                                    isVirtual={isVirtual}
                                />
                            )}
                            <HeroSection/>
                            <FeaturesSection/>
                            <HowItWorksSection/>
                            <CTASection/>
                        </>
                    ) : (
                        // Card cuando las inscripciones han finalizado
                        <div className="max-w-4xl mx-auto my-12">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Inscripciones cerradas</h2>
                                <p className="text-gray-700 mb-4">
                                    Lamentamos informarte que las inscripciones para este simulacro han finalizado.
                                </p>
                                <p className="text-gray-600 mb-6">
                                    Agradecemos tu interés. Si no pudiste inscribirte esta vez, por favor mantente atento a nuestras próximas convocatorias. Te invitamos a visitar nuevamente esta página más adelante.
                                </p>
                                {/* Información de contacto */}
                                <div className="mt-6 text-left max-w-xl mx-auto">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contacto</h3>
                                    <p className="text-gray-700 mb-2"><strong>Horario de atención:</strong> Lunes a viernes de 09:00 am a 05:00 pm</p>
                                    <p className="text-gray-700 mb-1"><strong>Llamadas:</strong> 981 606 955 – 981 600 816</p>
                                    <p className="text-gray-700 mb-1"><strong>WhatsApp:</strong> <a href="https://wa.me/51981600816" target="_blank" rel="noopener noreferrer" className="text-red-900 font-medium">981 600 816</a></p>
                                    <p className="text-gray-700 mb-4"><strong>Email:</strong> <a href="mailto:informes.admision@uni.edu.pe" className="text-red-900 font-medium">informes.admision@uni.edu.pe</a></p>

                                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                                        <a href="https://www.facebook.com/admision.uni" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
                                            Facebook
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCwiaeredvwo4XnoTLFeZsAw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium">
                                            YouTube
                                        </a>
                                        <a href="https://www.tiktok.com/@admision_uni" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:opacity-90 text-white rounded-md text-sm font-medium">
                                            TikTok
                                        </a>
                                        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium">
                                            Página web
                                        </Link>
                                    </div>
                                </div>

                             </div>
                        </div>
                    )
                ) : (
                    <RegistrationStatus isActive={isActive}/>
                )}
             </main>

             <Footer/>
             <GoTopButton/>
         </div>
     );
 }
