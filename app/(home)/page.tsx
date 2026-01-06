import type { Metadata } from 'next';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {GoTopButton} from '@/components/ui/GoTopButton';
import {HeroSection} from '@/components/home/HeroSection';
import {FeaturesSection} from '@/components/home/FeaturesSection';
import {HowItWorksSection} from '@/components/home/HowItWorksSection';
import {CTASection} from '@/components/home/CTASection';
import {RegistrationStatus} from '@/components/home/RegistrationStatus';
import {SimulationDates} from '@/components/home/SimulationDates';
import {ExamSimulationService} from '@/lib/services/exam-simulation.service';
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

    try {
        const response = await ExamSimulationService.checkActiveSimulation();
        isActive = response.data.is_active;
        isVirtual = response.data.is_virtual ?? false;
        dateStart = response.data.exam_date_start ?? '';
        dateEnd = response.data.exam_date_end ?? '';
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
                    <>
                        {/* Banner con fechas y guarda is_virtual en localStorage */}
                        {dateStart && dateEnd && (
                            <SimulationDates
                                dateStart={dateStart}
                                dateEnd={dateEnd}
                                isVirtual={isVirtual}
                            />
                        )}
                        <HeroSection/>
                        <FeaturesSection/>
                        <HowItWorksSection/>
                        <CTASection/>
                    </>

                ) : (
                    <RegistrationStatus isActive={isActive}/>
                )}
            </main>

            <Footer/>
            <GoTopButton/>
        </div>
    );
}