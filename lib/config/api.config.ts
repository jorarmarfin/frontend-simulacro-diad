/**
 * Configuración centralizada de la API
 */
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://backend-inscripcion.local/api',
  endpoints: {
    examSimulations: '/exam-simulations',
    simulationApplicants: {
      base: '/simulation-applicants',
      search: '/simulation-applicants/search',
      uploadPhoto: (uuid: string) => `/simulation-applicants/${uuid}/upload-photo`,
      searchByUuid: (uuid: string) => `/simulation-applicants/${uuid}`,
      update: (uuid: string) => `/simulation-applicants/${uuid}`,
      photoStatus: (uuid: string) => `/simulation-applicants/${uuid}/photo-status`,
      confirm: '/simulation-applicants/confirm',
      status: (uuid: string) => `/simulation-applicants/${uuid}/status`,
    },
  },
} as const;

export { API_CONFIG };

