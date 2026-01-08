import { UserDataSummary } from '@/components/intranet/UserDataSummary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Confirmar Datos - Simulacro UNI",
  description: "Revisa y confirma tus datos antes de finalizar la inscripción",
}

export default function PersonalDataConfirmPage() {
  return <UserDataSummary />;
}