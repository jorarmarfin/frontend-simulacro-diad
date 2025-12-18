This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🎉 Refactorización Completada

El proyecto ha sido completamente refactorizado siguiendo las mejores prácticas de Next.js 14+:

### ✨ Mejoras Implementadas

- ✅ **Arquitectura Modular**: Componentes organizados por función y área
- ✅ **Server Components**: Por defecto para mejor performance
- ✅ **Client Components**: Solo donde se necesita interactividad
- ✅ **Separación de Layouts**: Header/Footer específicos para público e intranet
- ✅ **API Implementado**: Sistema completo con tipos, servicios y hooks
- ✅ **Type Safety**: TypeScript en toda la aplicación
- ✅ **Código DRY**: Componentes reutilizables y bien estructurados

### 📁 Nueva Estructura

```
app/
├── (home)/           # Rutas públicas
│   ├── layout.tsx   # Layout simple
│   └── page.tsx     # Página principal (Server Component)
├── intranet/        # Rutas autenticadas
│   ├── layout.tsx   # Layout con navegación interna
│   └── ...
└── login/            # Autenticación

components/
├── layout/          # Headers y Footers
├── home/            # Componentes del home
├── intranet/        # Componentes de área privada
└── ui/              # Componentes reutilizables

lib/
├── config/          # Configuración
├── types/           # Tipos TypeScript
├── utils/           # Utilidades
├── services/        # Servicios de API
└── hooks/           # Hooks personalizados
```

### 📖 Documentación

- **[REFACTORING.md](./REFACTORING.md)** - Guía completa de la refactorización
- **[REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)** - Resumen ejecutivo
- **[lib/API_USAGE.md](./lib/API_USAGE.md)** - Guía del API

### 🚀 Script de Verificación

```bash
./scripts/verify-structure.sh
```

Este script verifica:
- ✅ Estructura de archivos
- ✅ Errores de TypeScript
- ✅ Dependencias instaladas
- ✅ Archivos de configuración

## API Implementation

Este proyecto incluye una implementación completa del API para simulaciones de examen.

### Configuración

1. Crea un archivo `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Configura la URL del backend:
```env
NEXT_PUBLIC_API_URL=http://backend-inscripcion.local/api
```

### Uso Rápido

```tsx
// En un componente cliente
'use client';
import { useExamSimulations } from '@/lib';

export default function ExamList() {
  const { data, loading, error } = useExamSimulations();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(exam => (
        <li key={exam.id}>{exam.title}</li>
      ))}
    </ul>
  );
}
```

Para más información detallada, consulta [lib/API_USAGE.md](./lib/API_USAGE.md).


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
