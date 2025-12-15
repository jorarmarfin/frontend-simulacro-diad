/**
 * Tipos para las simulaciones de examen
 */

export interface ExamSimulation {
  id: string | number;
  title: string;
  description?: string;
  duration?: number;
  totalQuestions?: number;
  status?: 'active' | 'inactive' | 'completed';
  createdAt?: string;
  updatedAt?: string;
  // Añade más campos según tu API real
}

export interface ExamSimulationsResponse {
  data: ExamSimulation[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

