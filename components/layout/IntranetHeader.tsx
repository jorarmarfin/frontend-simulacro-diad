import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { IntranetNav } from '@/components/intranet/IntranetNav';
import { LogoutButton } from '@/components/intranet/LogoutButton';

/**
 * Header del intranet - Server Component
 * La lógica reactiva está separada en componentes cliente
 */
export function IntranetHeader() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-blue-500" />
            <span className="text-xl font-bold text-slate-800">Simulacro UNI</span>
          </Link>

          {/* Navegación (Client Component) */}
          <IntranetNav />

          {/* Botón Logout (Client Component) */}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
