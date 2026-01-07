'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, FileText, Loader2, AlertCircle, CheckCircle, Save } from 'lucide-react';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';
import type { SimulationApplicantCreateRequest } from '@/lib/types/exam-simulation.types';

// Tipo del formulario (extiende el request con campos adicionales del form)
interface PersonalDataFormData extends SimulationApplicantCreateRequest {
  document_type: string;
}

export function PersonalDataForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isExistingUser, setIsExistingUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm<PersonalDataFormData>({
    mode: 'onChange',
    defaultValues: {
      document_type: 'DNI',
      dni: '',
      last_name_father: '',
      last_name_mother: '',
      first_names: '',
      email: '',
      phone_mobile: '',
      phone_other: ''
    }
  });

  // Cargar datos guardados del localStorage si existen
  useEffect(() => {
    const savedData = SimulationStorageService.getApplicantData();
    if (savedData) {
      setIsExistingUser(true);
      reset({
        document_type: 'DNI',
        dni: savedData.dni,
        last_name_father: savedData.last_name_father,
        last_name_mother: savedData.last_name_mother,
        first_names: savedData.first_names,
        email: savedData.email,
        phone_mobile: savedData.phone_mobile || '',
        phone_other: savedData.phone_other || ''
      });
    }
  }, [reset]);

  const documentType = watch('document_type');

  const onSubmit = async (data: PersonalDataFormData) => {
    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});
    setIsLoading(true);

    try {
      // Preparar los datos para el API (sin document_type)
      const requestData: SimulationApplicantCreateRequest = {
        dni: data.dni,
        last_name_father: data.last_name_father,
        last_name_mother: data.last_name_mother,
        first_names: data.first_names,
        email: data.email,
        phone_mobile: data.phone_mobile,
        phone_other: data.phone_other || undefined
      };

      let response;
      const existingUuid = SimulationStorageService.getApplicantUuid();

      if (isExistingUser && existingUuid) {
        // Actualizar datos existentes
        response = await SimulationApplicantService.update(existingUuid, requestData);
      } else {
        // Crear nuevo registro
        response = await SimulationApplicantService.create(requestData);
      }

      if (SimulationApplicantService.isSuccessResponse(response)) {
        // Guardar datos completos en localStorage
        SimulationStorageService.setApplicantData(response.data);

        if (isExistingUser) {
          // Si es actualización, mostrar mensaje de éxito
          setSuccessMessage('Datos actualizados correctamente');
        } else {
          // Si es nuevo registro, redirigir según el modo del simulacro
          const nextRoute = SimulationStorageService.requiresPhoto()
            ? '/intranet/personal-photo'
            : '/intranet/payments-data';
          router.push(nextRoute);
        }
      } else {
        // Mostrar errores del servidor
        setError(response.message || 'Error al procesar. Intente nuevamente.');

        // Si hay errores de validación por campo
        if ('errors' in response && response.errors) {
          setFieldErrors(response.errors);
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado. Intente nuevamente.';
      setError(errorMessage);
      console.error('Error en registro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para continuar al siguiente paso
  const handleContinue = () => {
    const nextRoute = SimulationStorageService.requiresPhoto()
      ? '/intranet/personal-photo'
      : '/intranet/payments-data';
    router.push(nextRoute);
  };

  // Función para obtener el error de un campo específico
  const getFieldError = (fieldName: string): string | undefined => {
    return fieldErrors[fieldName]?.[0];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {isExistingUser ? 'Confirma tus Datos Personales' : 'Registro de Datos Personales'}
          </h1>
          <p className="mt-2 text-slate-600">
            {isExistingUser
              ? 'Verifica que tu información sea correcta antes de continuar.'
              : 'Por favor, completa tus datos para la inscripción al simulacro.'}
          </p>
        </div>

        {/* Mensaje de error general */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Tipo de Documento */}
          <div>
            <label htmlFor="document_type" className="block text-sm font-medium text-slate-700 mb-1">
              Tipo de Documento
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FileText className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <select
                id="document_type"
                {...register('document_type', { required: 'Seleccione un tipo de documento' })}
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
              >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>

          {/* Número de Documento (DNI) */}
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-slate-700 mb-1">
              Número de Documento
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FileText className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="dni"
                type="text"
                maxLength={documentType === 'DNI' ? 8 : 12}
                readOnly={isExistingUser}
                {...register('dni', {
                  required: 'El número de documento es requerido',
                  pattern: documentType === 'DNI'
                    ? { value: /^\d{8}$/, message: 'El DNI debe tener 8 dígitos' }
                    : { value: /^[A-Za-z0-9]+$/, message: 'Formato de documento inválido' }
                })}
                className={`block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ${
                  isExistingUser 
                    ? 'bg-slate-100 cursor-not-allowed'
                    : errors.dni || getFieldError('dni') 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-slate-300 focus:ring-blue-600'
                } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                placeholder={documentType === 'DNI' ? '12345678' : 'Número de Pasaporte'}
              />
            </div>
            {(errors.dni || getFieldError('dni')) && (
              <p className="mt-1 text-sm text-red-600">{errors.dni?.message || getFieldError('dni')}</p>
            )}
          </div>

          {/* Apellido Paterno */}
          <div>
            <label htmlFor="last_name_father" className="block text-sm font-medium text-slate-700 mb-1">
              Apellido Paterno
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="last_name_father"
                type="text"
                autoComplete="family-name"
                {...register('last_name_father', {
                  required: 'El apellido paterno es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                className={`block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ${
                  errors.last_name_father || getFieldError('last_name_father')
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-slate-300 focus:ring-blue-600'
                } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                placeholder="Apellido Paterno"
              />
            </div>
            {(errors.last_name_father || getFieldError('last_name_father')) && (
              <p className="mt-1 text-sm text-red-600">{errors.last_name_father?.message || getFieldError('last_name_father')}</p>
            )}
          </div>

          {/* Apellido Materno */}
          <div>
            <label htmlFor="last_name_mother" className="block text-sm font-medium text-slate-700 mb-1">
              Apellido Materno
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="last_name_mother"
                type="text"
                autoComplete="family-name"
                {...register('last_name_mother', {
                  required: 'El apellido materno es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                className={`block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ${
                  errors.last_name_mother || getFieldError('last_name_mother')
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-slate-300 focus:ring-blue-600'
                } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                placeholder="Apellido Materno"
              />
            </div>
            {(errors.last_name_mother || getFieldError('last_name_mother')) && (
              <p className="mt-1 text-sm text-red-600">{errors.last_name_mother?.message || getFieldError('last_name_mother')}</p>
            )}
          </div>

          {/* Nombres */}
          <div>
            <label htmlFor="first_names" className="block text-sm font-medium text-slate-700 mb-1">
              Nombres
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="first_names"
                type="text"
                autoComplete="given-name"
                {...register('first_names', {
                  required: 'Los nombres son requeridos',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                className={`block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ${
                  errors.first_names || getFieldError('first_names')
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-slate-300 focus:ring-blue-600'
                } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                placeholder="Nombres"
              />
            </div>
            {(errors.first_names || getFieldError('first_names')) && (
              <p className="mt-1 text-sm text-red-600">{errors.first_names?.message || getFieldError('first_names')}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                className={`block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ${
                  errors.email || getFieldError('email')
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-slate-300 focus:ring-blue-600'
                } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                placeholder="correo@ejemplo.com"
              />
            </div>
            {(errors.email || getFieldError('email')) && (
              <p className="mt-1 text-sm text-red-600">{errors.email?.message || getFieldError('email')}</p>
            )}
          </div>

          {/* Teléfono Móvil */}
          <div>
            <label htmlFor="phone_mobile" className="block text-sm font-medium text-slate-700 mb-1">
              Teléfono Móvil
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="phone_mobile"
                type="tel"
                autoComplete="tel"
                maxLength={9}
                {...register('phone_mobile', {
                  required: 'El teléfono móvil es requerido',
                  pattern: {
                    value: /^9\d{8}$/,
                    message: 'Debe ser un número de 9 dígitos que inicie con 9'
                  }
                })}
                className={`block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ${
                  errors.phone_mobile || getFieldError('phone_mobile')
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-slate-300 focus:ring-blue-600'
                } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                placeholder="987654321"
              />
            </div>
            {(errors.phone_mobile || getFieldError('phone_mobile')) && (
              <p className="mt-1 text-sm text-red-600">{errors.phone_mobile?.message || getFieldError('phone_mobile')}</p>
            )}
          </div>

          {/* Teléfono Alternativo (Opcional) */}
          <div>
            <label htmlFor="phone_other" className="block text-sm font-medium text-slate-700 mb-1">
              Teléfono Alternativo <span className="text-slate-400">(Opcional)</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="phone_other"
                type="tel"
                autoComplete="tel"
                {...register('phone_other')}
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Teléfono fijo u otro"
              />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            {/* Botón principal: Registrar o Actualizar */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full flex justify-center items-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isExistingUser ? 'Actualizando...' : 'Registrando...'}
                </>
              ) : (
                <>
                  {isExistingUser ? (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Actualizar Datos
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Registrar Datos
                    </>
                  )}
                </>
              )}
            </button>

            {/* Botón secundario: Continuar (solo para usuarios existentes) */}
            {isExistingUser && (
              <button
                type="button"
                onClick={handleContinue}
                className="w-full flex justify-center items-center rounded-md bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200 border border-slate-300 transition-all duration-200"
              >
                Continuar sin cambios
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

