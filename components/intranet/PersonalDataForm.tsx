'use client';

import { User, Mail, Phone, FileText } from 'lucide-react';

export function PersonalDataForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Registro de Datos Personales
          </h1>
          <p className="mt-2 text-slate-600">
            Por favor, completa tus datos para la inscripción al simulacro.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Tipo de Documento */}
          <div>
            <label htmlFor="document-type" className="block text-sm font-medium text-slate-700 mb-1">
              Tipo de Documento
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FileText className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <select
                id="document-type"
                name="document-type"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
              >
                <option value="">Selecciona</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>

          {/* Número de Documento */}
          <div>
            <label htmlFor="document-number" className="block text-sm font-medium text-slate-700 mb-1">
              Número de Documento
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FileText className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="document-number"
                name="document-number"
                type="text"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Número de Documento"
              />
            </div>
          </div>

          {/* Apellido Paterno */}
          <div>
            <label htmlFor="paternal-lastname" className="block text-sm font-medium text-slate-700 mb-1">
              Apellido Paterno
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="paternal-lastname"
                name="paternal-lastname"
                type="text"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Apellido Paterno"
              />
            </div>
          </div>

          {/* Apellido Materno */}
          <div>
            <label htmlFor="maternal-lastname" className="block text-sm font-medium text-slate-700 mb-1">
              Apellido Materno
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="maternal-lastname"
                name="maternal-lastname"
                type="text"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Apellido Materno"
              />
            </div>
          </div>

          {/* Nombres */}
          <div>
            <label htmlFor="first-names" className="block text-sm font-medium text-slate-700 mb-1">
              Nombres
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="first-names"
                name="first-names"
                type="text"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Nombres"
              />
            </div>
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
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Correo Electrónico"
              />
            </div>
          </div>

          {/* Teléfonos */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Teléfono
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="block w-full rounded-md border-0 py-2 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                placeholder="Número de Teléfono"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01]"
            >
              Registrar Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

