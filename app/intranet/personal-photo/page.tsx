import { Metadata } from 'next';
import { PersonalPhotoForm } from '@/components/intranet/PersonalPhotoForm';

export const metadata: Metadata = {
    title: "Foto del Postulante | Simulacro UNI",
    description: "Carga tu fotografía para el simulacro de admisión",
}

export default function PersonalPhotoPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <PersonalPhotoForm />
        </div>
    );
}