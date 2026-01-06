import type { Metadata } from 'next';
import { UserDataSummary } from '@/components/intranet/UserDataSummary';

export const metadata: Metadata = {
  title: "Resumen de Inscripción - Simulacro UNI",
  description: "Resumen y confirmación de datos del postulante",
}

export default function FinalPage() {
  return <UserDataSummary />;
}