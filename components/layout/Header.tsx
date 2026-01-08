'use client';
import Link from 'next/link';
import Image from "next/image";
export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image width={28}
                   height={28} alt='Universidad Nacional de Ingenieria' src='/escudo-uni.png' className='h-7 w-7' />
            <span className="text-xl font-bold text-slate-800">Simulacro UNI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-red-500 transition-colors">
              Características
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-red-500 transition-colors">
              ¿Cómo funciona?
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-red-500 transition-colors">
              Precios
            </a>
          </nav>
          <div className="flex items-center">
            <Link
              href="/auth"
              className="hidden sm:inline-block text-sm font-medium text-slate-600 hover:text-red-500 mr-6 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
