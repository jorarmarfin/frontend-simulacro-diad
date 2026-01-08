"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreditCard, Mail, ArrowRight, Loader2, UserPlus, AlertCircle } from 'lucide-react';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

// Tipos para el formulario
interface LoginFormData {
    dni: string;
    email: string;
}

export const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm<LoginFormData>({
        mode: 'onChange',
        defaultValues: {
            dni: '',
            email: ''
        }
    });

    const dniValue = watch('dni');

    // Navegar al formulario de registro
    const handleRegister = () => {
        router.push('/intranet/personal-data');
    };

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        setIsLoading(true);

        try {
            // 1. Buscar postulante por DNI y email
            const searchResponse = await SimulationApplicantService.search({
                dni: data.dni,
                email: data.email
            });

            if (SimulationApplicantService.isSuccessResponse(searchResponse)) {
                // Limpiar datos anteriores del usuario
                SimulationStorageService.clearApplicantData();

                // 2. Obtener datos completos del postulante usando el UUID
                const uuid = searchResponse.data.uuid;
                const fullDataResponse = await SimulationApplicantService.getByUuid(uuid);

                if (SimulationApplicantService.isSuccessResponse(fullDataResponse)) {
                    const applicantData = fullDataResponse.data;

                    // 3. Obtener el estado del proceso
                    const processResponse = await SimulationApplicantService.getProcessStatus(uuid);

                    if (processResponse.status === 'success') {
                        // Actualizar los datos con el estado del proceso más reciente
                        const updatedData = {
                            ...applicantData,
                            process: processResponse.data.process
                        };

                        // Guardar datos completos en localStorage
                        SimulationStorageService.setApplicantData(updatedData);

                        // 4. Verificar si ya confirmó sus datos
                        const hasConfirmed = processResponse.data.process.confirmation !== null;

                        if (hasConfirmed) {
                            // Si ya confirmó, redirigir directamente a la página final (ficha)
                            router.push('/intranet/final');
                        } else {
                            // Si no ha confirmado, verificar si ya completó los pasos previos
                            const hasPreRegistration = processResponse.data.process.pre_registration !== null;
                            const hasPayment = processResponse.data.process.payment !== null;

                            if (hasPreRegistration && hasPayment) {
                                // Si ya completó datos y pago, ir directo a confirmar
                                router.push('/intranet/personal-data-confirm');
                            } else {
                                // Si falta completar pasos, ir a datos personales
                                router.push('/intranet/personal-data');
                            }
                        }
                    } else {
                        // Si falla obtener el estado del proceso, guardar los datos básicos
                        SimulationStorageService.setApplicantData(applicantData);
                        router.push('/intranet/personal-data');
                    }
                } else {
                    // Si falla obtener datos completos, guardar los básicos
                    SimulationStorageService.setApplicantData(searchResponse.data);
                    router.push('/intranet/personal-data');
                }
            } else {
                // Mostrar mensaje de error del servidor
                setError(searchResponse.message || 'No se encontró el registro. Verifique sus datos o regístrese.');
            }
        } catch (err: unknown) {
            // Capturar mensaje de error específico
            const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error al buscar. Intente nuevamente.';
            setError(errorMessage);
            console.error('Error en login:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div>
                <label htmlFor="dni" className="sr-only">
                    DNI
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CreditCard className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                        id="dni"
                        type="text"
                        inputMode="numeric"
                        maxLength={8}
                        {...register('dni', {
                            required: 'El DNI es requerido',
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: 'El DNI debe tener 8 dígitos'
                            }
                        })}
                        className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                        placeholder="DNI (8 dígitos)"
                    />
                </div>
                {errors.dni && (
                    <p className="mt-1 text-xs text-red-500">{errors.dni.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email-address" className="sr-only">
                    Correo Electrónico
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                        id="email-address"
                        type="email"
                        autoComplete="email"
                        {...register('email', {
                            required: 'El correo es requerido',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Ingrese un correo válido'
                            }
                        })}
                        className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                        placeholder="Correo Electrónico"
                    />
                </div>
                {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading || !isValid || dniValue?.length !== 8}
                    className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Verificando...
                        </>
                    ) : (
                        <>
                            Continuar
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                    )}
                </button>
            </div>

            {/* Separador */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500">¿No tienes cuenta?</span>
                </div>
            </div>

            {/* Botón de registro llamativo */}
            <div>
                <button
                    type="button"
                    onClick={handleRegister}
                    className="group relative flex w-full justify-center items-center rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-3 text-sm font-semibold text-white hover:from-emerald-600 hover:to-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                    <UserPlus className="mr-2 h-5 w-5" />
                    ¡Regístrate ahora!
                </button>
            </div>
        </form>
    );
}