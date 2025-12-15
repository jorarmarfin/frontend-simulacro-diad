export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Simulacro UNI. Todos los derechos reservados.</p>
          <p className="mt-2">Un proyecto para la comunidad de postulantes.</p>
        </div>
      </div>
    </footer>
  );
}

