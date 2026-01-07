import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Deshabilitar el caché agresivo de Next.js para obtener datos frescos
  experimental: {
    // Deshabilitar pre-generación estática
    staticGenerationMaxConcurrency: 1,
  },
};

export default nextConfig;
