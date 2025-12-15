import { IconWrapper } from './IconWrapper';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <IconWrapper>{icon}</IconWrapper>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-slate-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

