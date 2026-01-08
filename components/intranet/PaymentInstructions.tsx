'use client';

import { CreditCard, Building2, Smartphone, Globe, Clock, FileText, AlertCircle, Wallet } from 'lucide-react';

// Tipos para la configuración de bancos
interface PaymentMethod {
  id: string;
  icon: 'building' | 'smartphone' | 'globe' | 'file' | 'wallet';
  title: string;
  description: string;
  enabled: boolean;
}

interface BankConfig {
  id: string;
  name: string;
  shortName: string;
  color: string; // bg-blue-600, bg-red-600, etc.
  enabled: boolean;
  methods: PaymentMethod[];
}

// Configuración de bancos - AQUÍ SE PUEDE MODIFICAR QUÉ SE MUESTRA
const BANKS_CONFIG: BankConfig[] = [
  {
    id: 'bcp',
    name: 'Banco de Crédito del Perú',
    shortName: 'BCP',
    color: 'bg-blue-600',
    enabled: true, // Cambiar a false para ocultar el banco completo
    methods: [
      // {
      //   id: 'bcp-ventanilla',
      //   icon: 'building',
      //   title: 'Ventanilla o Agente BCP',
      //   description: 'Indica el nombre UNIVERSIDAD NACIONAL DE INGENIERÍA, el código 15226, luego "Pago Estudiantes" y el número de DNI del postulante. Pida un voucher por cada monto a pagar.',
      //   enabled: true // Cambiar a false para ocultar este método
      // },
      // {
      //   id: 'bcp-internet',
      //   icon: 'globe',
      //   title: 'Banca por Internet',
      //   description: 'Entra a www.viabcp.com, sección: Tus Cuentas → Pago de Servicios → Universidades → UNIVERSIDAD NACIONAL DE INGENIERÍA → "Pago Estudiantes" y luego digitar el número de DNI del postulante. Hacer un pago por cada monto.',
      //   enabled: true
      // },
      // {
      //   id: 'bcp-app',
      //   icon: 'smartphone',
      //   title: 'App Móvil BCP',
      //   description: 'Entra a tu cuenta → Pagar Servicios → buscar UNIVERSIDAD NACIONAL DE INGENIERÍA → "Pago Estudiantes" → Escribe el DNI del postulante. Hacer un pago por cada monto.',
      //   enabled: true
      // },
      {
        id: 'bcp-yape',
        icon: 'wallet',
        title: 'Yape',
        description: 'Ingresa a tu app de Yape → Presiona el botón "Yapear Servicios" → Haz clic en "Busca una empresa" y digita: UNIVERSIDAD NACIONAL DE INGENIERÍA → Presiona "Ingresar Pago Estudiantes" → Digita el DNI del postulante en el recuadro → Se verifica el monto del recibo (S/ 100.00) → Presiona "Yapear Servicio" y listo. Recuerda que son 2 montos a realizar y se realizan por separado.',
        enabled: true
      }
    ]
  },
  // {
  //   id: 'scotiabank',
  //   name: 'Scotiabank',
  //   shortName: 'Scotia',
  //   color: 'bg-red-600',
  //   enabled: true,
  //   methods: [
  //     {
  //       id: 'scotia-ventanilla',
  //       icon: 'building',
  //       title: 'Ventanilla del Banco',
  //       description: 'Indicar que desea pagar el examen de admisión de la UNI al servicio "Pago de estudiantes", entregue el número de DNI del postulante. Pida un voucher por cada monto.',
  //       enabled: true
  //     },
  //     {
  //       id: 'scotia-agente',
  //       icon: 'file',
  //       title: 'Agente Scotiabank',
  //       description: 'Indique que desea pagar a la Universidad Nacional de Ingeniería, el servicio "Pago Estudiantes". Indique el número del DNI del postulante. Confirme el monto a pagar, pida un voucher por cada monto.',
  //       enabled: true
  //     },
  //     {
  //       id: 'scotia-internet',
  //       icon: 'globe',
  //       title: 'Banca por Internet',
  //       description: 'Entra a https://mi.scotiabank.com.pe/login → ingresa a tu cuenta → Click en Quiero → Pagar → Servicios o instituciones → digita Uni.Nac.Ingenieria → Pago Estudiantes → Escribe tu DNI. Verifica el monto y confirma tu operación. Haz una operación por cada monto. Guarda una captura de pantalla de tu constancia de pago.',
  //       enabled: true
  //     },
  //     {
  //       id: 'scotia-app',
  //       icon: 'smartphone',
  //       title: 'App Móvil Scotiabank',
  //       description: 'Click en Pago de servicios e instituciones → Univ.Nac. Ingeniería → Pago Estudiantes → DNI → Escoge el recibo a pagar. Confirma tu operación y haz una captura del pago. Realiza un pago por cada monto a pagar.',
  //       enabled: true
  //     }
  //   ]
  // }
];

// Función para obtener el icono según el tipo
const getIcon = (iconType: string, color: string) => {
  const iconClass = `h-5 w-5 ${color}`;

  switch (iconType) {
    case 'building':
      return <Building2 className={iconClass} />;
    case 'smartphone':
      return <Smartphone className={iconClass} />;
    case 'globe':
      return <Globe className={iconClass} />;
    case 'file':
      return <FileText className={iconClass} />;
    case 'wallet':
      return <Wallet className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
};

// Función para obtener el color del texto según el color de fondo
const getTextColor = (bgColor: string): string => {
  if (bgColor.includes('blue')) return 'text-blue-600';
  if (bgColor.includes('red')) return 'text-red-600';
  if (bgColor.includes('green')) return 'text-green-600';
  return 'text-slate-600';
};

export function PaymentInstructions() {
  // Filtrar solo los bancos habilitados
  const enabledBanks = BANKS_CONFIG.filter(bank => bank.enabled);

  // Verificar si hay algún banco habilitado
  if (enabledBanks.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center justify-center gap-3 text-slate-500">
            <AlertCircle className="h-6 w-6" />
            <p>No hay métodos de pago disponibles en este momento.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Instrucciones de Pago
          </h1>
          <p className="mt-2 text-slate-600">
            Realiza tu pago en cualquiera de las siguientes entidades bancarias
          </p>
        </div>

        {/* Aviso de validación */}
        <div className="mb-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800">Tiempo de validación</p>
              <p className="text-sm text-blue-700 mt-1">
                Una vez realizado el pago en el banco, espera a que sea validado por nuestro sistema.
                Este proceso puede durar hasta <strong>24 horas</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Renderizar cada banco habilitado */}
        {enabledBanks.map((bank) => {
          const textColor = getTextColor(bank.color);
          // Filtrar solo los métodos habilitados
          const enabledMethods = bank.methods.filter(method => method.enabled);

          // Si no hay métodos habilitados, no mostrar el banco
          if (enabledMethods.length === 0) return null;

          return (
            <div key={bank.id} className="mb-8">
              {/* Header del banco */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg ${bank.color} flex items-center justify-center text-white font-bold ${bank.shortName.length > 3 ? 'text-xs' : 'text-lg'}`}>
                  {bank.shortName}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{bank.name}</h2>
              </div>

              {/* Métodos de pago */}
              <div className="space-y-4">
                {enabledMethods.map((method) => (
                  <div key={method.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {getIcon(method.icon, textColor)}
                      <h3 className="font-semibold text-slate-900">{method.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Recordatorio final */}
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">Recuerda</p>
              <ul className="text-sm text-green-700 mt-1 space-y-1">
                <li>• Guarda tu voucher o captura de pantalla como comprobante de pago</li>
                <li>• Realiza un pago por cada monto requerido</li>
                <li>• El pago debe hacerse con el DNI del postulante</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

