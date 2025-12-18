"use client";

import { Lock, Mail, ArrowRight } from 'lucide-react';

export const Login = () => {

    return (
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                        placeholder="Correo Electrónico"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="password" className="sr-only">
                    Contraseña
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                        placeholder="Contraseña"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01]"
                >
                    Iniciar Sesión
                    <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </form>
    )
}