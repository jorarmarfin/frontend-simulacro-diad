import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {GoTopButton} from '@/components/ui/GoTopButton';
import {HeroSection} from '@/components/home/HeroSection';
import {FeaturesSection} from '@/components/home/FeaturesSection';
import {HowItWorksSection} from '@/components/home/HowItWorksSection';
import {CTASection} from '@/components/home/CTASection';
import {RegistrationStatus} from '@/components/home/RegistrationStatus';
import {ExamSimulationService} from '@/lib/services/exam-simulation.service';
export const metadata = {
    title: " Simulacro de Admision UNI - Página Principal",
    description: "Prepárate para tu admisión a la UNI con nuestro simulacro de examen en línea. Regístrate ahora y mejora tus habilidades.",
}
export default async function HomePage() {
    // Verificar si hay un simulacro activo
    let isActive = false;

    try {
        const response = await ExamSimulationService.checkActiveSimulation();
        isActive = response.data.is_active;
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