export function IntranetFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Simulacro UNI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

