import { CheckCircle, Award, BookOpen } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Todo lo que necesitas para prepararte
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Herramientas y recursos diseñados para simular una experiencia real del examen de admisión.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={<CheckCircle className="h-6 w-6 text-red-500" />}
            title="Examen Realista"
            description="Preguntas y estructura basadas en exámenes de admisión pasados de la UNI."
          />
          <FeatureCard
            icon={<Award className="h-6 w-6 text-red-500" />}
            title="Resultados Detallados"
            description="Obtén un análisis de tu desempeño por área para enfocar mejor tu estudio."
          />

        </div>
      </div>
    </section>
  );
}

