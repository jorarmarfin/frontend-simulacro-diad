# Contexto del Proyecto: Frontend Simulacro DIAD

## 📋 Descripción General
Este es un proyecto **Next.js 16** (React 19) para una plataforma de simulacros de examen de admisión a la UNI. La aplicación permite que los usuarios se registren, proporcionen datos personales, suban fotos y completen formularios para un examen simulado.

## 🛠️ Stack Tecnológico

### Core
- **Next.js**: v16.0.8 (SSR/SSG)
- **React**: v19.2.1
- **TypeScript**: v5
- **Tailwind CSS**: v4 (con PostCSS)

### Librerías principales
- **react-hook-form**: v7.69.0 - Gestión de formularios con validación
- **lucide-react**: v0.395.0 - Iconos
- **react-icons**: v5.5.0 - Más iconos
- **react-to-print**: v3.2.0 - Funcionalidad de impresión
- **@headlessui/react**: v2.2.9 - Componentes base

### Herramientas de desarrollo
- **ESLint**: v9 (Linting)
- **@tailwindcss/postcss**: v4 (Compilación de estilos)

## 📁 Estructura de Directorios

### `/app` - Rutas y páginas
```
app/
├── (home)/                    # Rutas públicas (grupo)
│   ├── layout.tsx            # Layout simple sin header/footer especial
│   └── page.tsx              # Página principal (Server Component)
├── auth/                      # Autenticación
│   └── page.tsx              # Página de login/verificación
├── intranet/                 # Rutas protegidas por autenticación
│   ├── layout.tsx            # Layout con navegación y AuthGuard
│   ├── final/                # Confirmación final
│   ├── payments-data/        # Datos de pago
│   ├── personal-data/        # Formulario de datos personales
│   ├── personal-data-confirm/ # Confirmación de datos
│   └── personal-photo/       # Carga de foto
├── layout.tsx                # Layout raíz
└── globals.css               # Estilos globales
```

### `/components` - Componentes React
```
components/
├── auth/
│   └── login.tsx             # Componente de login (Client)
├── home/                     # Componentes de página principal
│   ├── CTASection.tsx        # Llamada a la acción
│   ├── FeaturesSection.tsx   # Características
│   ├── HeroSection.tsx       # Sección principal
│   ├── HowItWorksSection.tsx # Cómo funciona
│   ├── NotificationButton.tsx
│   ├── RegistrationStatus.tsx
│   └── SimulationDates.tsx
├── intranet/                 # Componentes área privada
│   ├── ApplicantCard.tsx
│   ├── AuthGuard.tsx         # Protector de rutas (Client)
│   ├── FichaApplicant.tsx
│   ├── FinalPageContent.tsx
│   ├── IntranetNav.tsx       # Navegación intranet
│   ├── LogoutButton.tsx
│   ├── PaymentInstructions.tsx
│   ├── PersonalDataForm.tsx  # Formulario datos (Client, 918 líneas)
│   ├── PersonalPhotoForm.tsx
│   └── UserDataSummary.tsx
├── layout/                   # Layouts globales
│   ├── Footer.tsx            # Footer público
│   ├── Header.tsx            # Header público
│   ├── IntranetFooter.tsx    # Footer intranet
│   └── IntranetHeader.tsx    # Header intranet
└── ui/                       # Componentes reutilizables
    ├── FeatureCard.tsx
    ├── GoTopButton.tsx
    ├── IconWrapper.tsx
    ├── Modal.tsx
    └── Step.tsx
```

### `/lib` - Lógica de aplicación
```
lib/
├── config/
│   ├── api.config.ts         # Configuración centralizada del API
│   └── session.config.ts     # Configuración de sesión
├── hooks/                    # Hooks personalizados
│   ├── useActiveSimulation.ts   # Verifica simulacro activo
│   ├── useAuthGuard.ts          # Protege rutas (redirección)
│   ├── useSimulationApplicantSearch.ts
│   └── useSimulationMode.ts
├── services/                 # Servicios API (clases estáticas)
│   ├── exam-simulation.service.ts
│   ├── gender.service.ts     # Obtiene géneros
│   ├── major.service.ts      # Obtiene especialidades (majors)
│   ├── site.service.ts       # Obtiene sedes (sites)
│   ├── simulation-applicant.service.ts  # CRUD aplicantes
│   ├── simulation-storage.service.ts    # localStorage + TTL sesión
│   └── ubigeo.service.ts     # Datos geográficos (depts/prov/dist)
├── types/
│   └── exam-simulation.types.ts  # Tipos y interfaces centralizadas
├── utils/
│   ├── api-client.ts         # Cliente HTTP con timeout y errores
│   └── index.ts
└── index.ts
```

## 🔑 Conceptos Clave

### Autenticación
- **Sin login tradicional**: Se usa DNI + email para búsqueda/verificación
- **Session Storage**: UUID del aplicante se guarda en `localStorage` con TTL
- **AuthGuard**: Componente que verifica si hay sesión válida en rutas `/intranet`
- **TTL (Time To Live)**: Sesiones expiran tras 60 minutos (configurable)
- **Ruta pública de intranet**: `/intranet/personal-data` se considera pública en `AuthGuard` (permite ingreso para registro inicial)
- **Regla post-confirmación**: si el usuario completó pre-registro, pago, foto (si aplica) y confirmación, se redirige a `/intranet/final`

### Flujo de usuario típico
1. **Home** (`/`) - Información sobre el simulacro
2. **Auth** (`/auth`) - Verifica DNI + email
3. **Intranet** (`/intranet`) - Área protegida:
   - `/personal-data` - Completa datos
   - `/personal-data-confirm` - Confirma datos
   - `/personal-photo` - Sube foto
   - `/payments-data` - Datos de pago
   - `/final` - Confirmación final

### Almacenamiento
- **localStorage**: Datos de aplicante (UUID, datos, foto)
- **TTL Session**: Sistema con expiración automática
- **No backend session**: Todo client-side con validación en server cuando sea necesario
- **Claves usadas**:
  - `simulacro_is_virtual`
  - `simulacro_exam_date`
  - `simulacro_applicant_uuid`
  - `simulacro_applicant_data`
  - `simulacro_session_expires_at`
  - `simulacro_session_ttl_minutes`
- **Variable de entorno para TTL**: `NEXT_PUBLIC_SESSION_TTL` (si no existe, fallback a 60 minutos)

## 📡 API Integration

### Configuración
- **Base URL**: `process.env.NEXT_PUBLIC_API_URL` || `http://backend-inscripcion.local/api`
- **Timeout**: 30 segundos
- **Cliente HTTP**: Clase `ApiClient` con manejo de errores y timeouts
- **Fetch sin caché para GET**: `cache: 'no-store'` y `next: { revalidate: 0 }`

### Endpoints principales
```
GET    /exam-simulations                    # Estado del simulacro
GET    /sites                               # Lista de sedes disponibles
GET    /majors                              # Lista de especialidades
GET    /genders                             # Lista de géneros
GET    /ubigeos/departments                 # Departamentos
GET    /ubigeos/provinces                   # Provincias (por dept)
GET    /ubigeos/districts                   # Distritos (por prov)
POST   /simulation-applicants/search        # Buscar aplicante
POST   /simulation-applicants               # Crear aplicante
POST   /simulation-applicants/{uuid}        # Actualizar aplicante
POST   /simulation-applicants/{uuid}/upload-photo  # Subir foto
GET    /simulation-applicants/{uuid}        # Obtener aplicante por UUID
GET    /simulation-applicants/{uuid}/photo-status  # Estado foto
POST   /simulation-applicants/confirm       # Confirmar datos
GET    /simulation-applicants/{uuid}/status # Estado general
```

### Detalle útil de rutas API (según implementación actual)
- `GET /ubigeos/provinces` acepta:
  - `?department_code={code}` cuando se envía string
  - `?department_id={id}` cuando se envía number
- `GET /ubigeos/districts` acepta:
  - `?province_code={code}` cuando se envía string
  - `?province_id={id}` cuando se envía number
- `POST /simulation-applicants/search` body: `{ dni, email }`
- `POST /simulation-applicants/confirm` body: `{ uuid }`
- `POST /simulation-applicants/{uuid}/upload-photo` usa `FormData` con campo `photo`
- `POST /simulation-applicants` y `POST /simulation-applicants/{uuid}` ahora aceptan:
  - `site_id` (número)
  - `major_id` (número)

### Reglas funcionales nuevas (sedes/local)
- El endpoint `GET /exam-simulations` ahora incluye el campo booleano `is_local`.
- Si `is_local = false`, en `registroParticipan` se debe mostrar el `select` de sedes.
- El `select` se alimenta con `GET /sites` y muestra por opción: `id` y `name`.
- Estado en código actual:
  - Integrado: `is_local` en tipos y consulta real en `PersonalDataForm`.
  - Integrado: `site.service.ts` y consumo de `GET /sites`.
  - Integrado: `select` condicional de sedes (`site_id`) cuando `is_local = false`.
- Respuesta esperada de `GET /sites`:
```json
{
  "data": [
    {
      "id": 1,
      "code": "CIX",
      "name": "Chiclayo",
      "local": "Glorioso Centenario Colegio Nacional San José",
      "direction": "Av. Elvira García y García 167, Chiclayo 14009",
      "google_maps_url": "https://maps.app.goo.gl/3q8ELGa2xY9P22977"
    }
  ]
}
```

### Especialidades (majors)
- Endpoint: `GET /majors`
- Respuesta esperada:
```json
{
  "data": [
    { "id": 1, "code": "A1", "name": "Arquitectura" },
    { "id": 7, "code": "N6", "name": "Ciencia de la Computación" }
  ]
}
```
- UI:
  - En `PersonalDataForm` se muestra siempre el `select` de especialidad (sin condicional).
  - El valor seleccionado se envía como `major_id`.

### Regla de vocacional por simulacro
- El endpoint `GET /exam-simulations` incluye `include_vocational`.
- Si `include_vocational = false`, el checkbox **Incluir Examen vocacional** no se muestra en `PersonalDataForm`.
- En ese caso, el frontend fuerza `include_vocational = false` en el payload.

## 🎨 Estilos y UI

### CSS Framework
- **Tailwind CSS v4**: Utility-first CSS
- **PostCSS**: Procesamiento de estilos
- **Responsive**: Mobile-first approach

### Componentes UI
- Botones, modales, tarjetas, pasos
- Iconos: Lucide + React Icons
- Animaciones: CSS custom en globals.css

## 🔒 Tipos TypeScript principales

### SimulationApplicant
```typescript
{
  id: number
  uuid: string              // ID único para cliente
  dni: string
  last_name_father: string
  last_name_mother: string
  first_names: string
  email: string
  phone_mobile: string
  phone_other?: string
  birth_date?: string
  gender_id?: number
  ubigeo_id?: number        // ID distrito
  site_id?: number          // ID sede
  major_id?: number         // ID especialidad
  include_vocational?: boolean
  photo_url?: string
  photo_status?: 'pending' | 'approved' | 'rejected'
  exam_date?: string
  exam_is_virtual?: boolean
}
```

### ExamSimulationStatusResponse
```typescript
{
  data: {
    status: 'success' | 'error'
    is_active: boolean
    is_inscription_open?: boolean
    description?: string
    is_virtual?: boolean
    is_local?: boolean // nuevo en backend
    include_vocational?: boolean
    exam_date_start?: string
    exam_date_end?: string
    exam_date?: string | null
    available_tariffs?: AvailableTariff[]
    message?: string
  }
}
```

## 🧭 Flujo técnico real (frontend)

### Home (`app/(home)/page.tsx`)
- Llama `ExamSimulationService.checkActiveSimulation()` en Server Component.
- Usa estos campos para pintar la landing:
  - `is_active`
  - `is_inscription_open`
  - `is_virtual`
  - `exam_date_start`, `exam_date_end`, `exam_date`
  - `include_vocational`
  - `available_tariffs`
- Exporta `dynamic = 'force-dynamic'` y `revalidate = 0`.

### Login (`components/auth/login.tsx`)
- Flujo al enviar DNI + email:
  1. `POST /simulation-applicants/search`
  2. `GET /simulation-applicants/{uuid}`
  3. `GET /simulation-applicants/{uuid}/status`
  4. Guarda datos en `localStorage` con TTL
  5. Redirección según estado del proceso:
     - confirmado -> `/intranet/final`
     - pre-registro + pago -> `/intranet/personal-data-confirm`
     - en otro caso -> `/intranet/personal-data`

### Datos personales (`components/intranet/PersonalDataForm.tsx`)
- Carga opciones de:
  - `GET /exam-simulations` (para reglas de `is_local` y `include_vocational`)
  - `GET /majors`
  - `GET /sites` (solo si `is_local = false`)
  - `GET /ubigeos/departments`
  - `GET /ubigeos/provinces?...`
  - `GET /ubigeos/districts?...`
  - `GET /genders`
- Envío de formulario:
  - nuevo: `POST /simulation-applicants`
  - existente: `POST /simulation-applicants/{uuid}`
  - payload incluye `major_id` y `site_id` (cuando aplica)
- Navegación siguiente paso depende de `is_virtual` guardado:
  - presencial -> `/intranet/personal-photo`
  - virtual -> `/intranet/payments-data`

### Foto (`components/intranet/PersonalPhotoForm.tsx`)
- Solo para simulacro presencial (`requiresPhoto = true`).
- Reglas de archivo en UI:
  - formatos: JPG/JPEG
  - tamaño máximo: 2MB
- Consulta estado: `GET /simulation-applicants/{uuid}/photo-status`
- Subida: `POST /simulation-applicants/{uuid}/upload-photo`

### Confirmación y final
- `UserDataSummary` usa `GET /simulation-applicants/{uuid}/status` para refrescar proceso y confirmar con `POST /simulation-applicants/confirm`.
- `FinalPageContent` vuelve a verificar estado de proceso y solo muestra ficha si existe confirmación.

## 🚀 Scripts npm

```bash
npm run dev      # Iniciar servidor (hot reload)
npm run build    # Build para producción
npm start        # Iniciar servidor producción
npm run lint     # Verificar errores de linting
```

## 📝 Configuración Importante

### `.env.local` (crear si no existe)
```env
NEXT_PUBLIC_API_URL=http://backend-inscripcion.local/api
```

### `next.config.ts`
- Caché agresivo deshabilitado
- Configuración para datos frescos en cada request

### `tsconfig.json`
- Rutas alias: `@/*` apunta a raíz del proyecto
- Strict mode activado
- Target: ES2017

## 🔄 Patrones usados

### Server Components
- Página principal (`page.tsx`) - Server Component
- Llamadas a API en servidor para datos iniciales

### Client Components
- Componentes con `'use client'` para interactividad
- Formularios (react-hook-form)
- Navegación y estado local

### Servicios
- Clases estáticas para agrupar métodos relacionados
- Manejo de errores centralizado
- Type-safe con TypeScript

### Almacenamiento
- `SimulationStorageService`: Interfaz para localStorage
- TTL manual con timestamp de expiración
- Validación en componentes y hooks

## 📚 Archivos de referencia rápida

- **Configuración API**: `/lib/config/api.config.ts`
- **Tipos globales**: `/lib/types/exam-simulation.types.ts`
- **Cliente HTTP**: `/lib/utils/api-client.ts`
- **Servicios principales**: `/lib/services/`
- **Hooks personalizados**: `/lib/hooks/`

## 🎯 Notas de desarrollo

1. **Performance**: Usar Server Components por defecto, Client Components solo cuando sea necesario
2. **Validación**: react-hook-form en formularios, validación en API también
3. **Errores**: ApiClient lanza objetos `ApiError` tipados
4. **Autenticación**: Basada en UUID en localStorage, sin tokens JWT
5. **Sessions**: TTL configurable, por defecto 60 minutos
6. **Ambientes**: Usar `NEXT_PUBLIC_API_URL` para endpoint del API
