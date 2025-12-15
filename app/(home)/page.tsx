import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoTopButton } from '@/components/ui/GoTopButton';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-700">
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>

      <Footer />
      <GoTopButton />
    </div>
  );
}
