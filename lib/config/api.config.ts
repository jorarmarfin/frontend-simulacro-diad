/**
 * Configuración centralizada de la API
 */
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://backend-inscripcion.local/api',
  endpoints: {
    examSimulations: '/exam-simulations',
    genders: '/genders', // nuevo endpoint
    ubigeos: {
      departments: '/ubigeos/departments',
      provinces: '/ubigeos/provinces',
      districts: '/ubigeos/districts',
    },
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
  timeout: 30000, // 30 segundos
} as const;

export { API_CONFIG };
