import { PersonalDataForm } from '@/components/intranet/PersonalDataForm';

export const metadata = {
  title: 'Datos Personales | Simulacro UNI',
  description: 'Completa tus datos personales para la inscripción al simulacro',
};

export default function PersonalDataPage() {
  return <PersonalDataForm />;
}
