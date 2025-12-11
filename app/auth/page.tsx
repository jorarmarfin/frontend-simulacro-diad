"use client";

import { useState } from 'react';
import { BookOpen, User, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-blue-500" />
            <span className="ml-3 text-3xl font-extrabold text-slate-900">Simulacro UNI</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            {isLogin ? 'Inicia Sesión' : 'Crea una Cuenta Nueva'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isLogin ? 'Accede a tu cuenta para continuar' : 'Regístrate para empezar tu preparación'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre Completo
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                  placeholder="Nombre Completo"
                />
              </div>
            </div>
          )}
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
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Contraseña"
              />
            </div>
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirmar Contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                  placeholder="Confirmar Contraseña"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01]"
            >
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-600">
          {isLogin ? (
            <span>
              ¿No tienes una cuenta?{' '}
              <button onClick={() => setIsLogin(false)} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Regístrate
              </button>
            </span>
          ) : (
            <span>
              ¿Ya tienes una cuenta?{' '}
              <button onClick={() => setIsLogin(true)} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Inicia Sesión
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
