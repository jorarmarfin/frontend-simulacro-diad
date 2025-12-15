'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, User, CreditCard, FileCheck, LogOut } from 'lucide-react';
export function IntranetHeader() {
  const pathname = usePathname();
  const navItems = [
    { href: '/intranet/personal-data', label: 'Datos Personales', icon: User },
    { href: '/intranet/payments-data', label: 'Pagos', icon: CreditCard },
    { href: '/intranet/final', label: 'Finalizar', icon: FileCheck },
  ];
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-blue-500" />
            <span className="text-xl font-bold text-slate-800">Simulacro UNI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
}
