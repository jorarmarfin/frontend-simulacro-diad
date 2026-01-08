interface StepProps {
  icon: React.ReactNode;
  num: string;
  title: string;
  description: string;
}

export function Step({ icon, num, title, description }: StepProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-red-500 text-white text-3xl font-bold rounded-full">
        {num}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          {icon}
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

