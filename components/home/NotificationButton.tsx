'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

export function NotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Aquí puedes implementar la lógica de suscripción real
    setIsSubscribed(true);

    // Simular una notificación de éxito
    setTimeout(() => {
      alert('¡Te notificaremos cuando se abran las inscripciones!');
    }, 100);
  };

  if (isSubscribed) {
    return (
      <button
        disabled
        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-green-700 bg-green-50 border-2 border-green-600 rounded-lg cursor-not-allowed opacity-75"
      >
        <Bell className="mr-2 h-5 w-5" />
        Notificaciones Activadas
      </button>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-orange-700 bg-white border-2 border-orange-600 rounded-lg hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300"
    >
      <Bell className="mr-2 h-5 w-5" />
      Recibir Notificaciones
    </button>
  );
}

