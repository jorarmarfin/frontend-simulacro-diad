// Configuración relacionada con la sesión y TTL

/**
 * Obtiene el TTL de sesión (en minutos) a usar por defecto.
 * Lee la variable de entorno NEXT_PUBLIC_SESSION_TTL si está definida.
 * Si no, devuelve 60 minutos.
 */
export function getDefaultSessionTtl(): number {
  const raw = process?.env?.NEXT_PUBLIC_SESSION_TTL;
  if (!raw) return 60;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 60;
}
