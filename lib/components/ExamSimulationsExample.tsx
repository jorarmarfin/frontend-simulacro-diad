/**
 * Ejemplo de componente que usa el API de simulaciones de examen
 * Este es un ejemplo de referencia - puedes adaptarlo según tus necesidades
 */

'use client';

import { useExamSimulations } from '@/lib/hooks/useExamSimulations';
import type { ExamSimulation } from '@/lib/types/exam-simulation.types';

export function ExamSimulationsExample() {
  const { data: simulations, loading, error, refetch } = useExamSimulations();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <h3 className="text-red-800 font-semibold">Error al cargar las simulaciones</h3>
        <p className="text-red-600 mt-2">{error.message}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!simulations || simulations.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p>No hay simulaciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Simulaciones de Examen</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {simulations.map((simulation) => (
          <SimulationCard key={simulation.id} simulation={simulation} />
        ))}
      </div>
    </div>
  );
}

function SimulationCard({ simulation }: { simulation: ExamSimulation }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-2">{simulation.title}</h3>
      {simulation.description && (
        <p className="text-gray-600 text-sm mb-3">{simulation.description}</p>
      )}
      <div className="flex flex-col gap-2 text-sm text-gray-500">
        {simulation.duration && (
          <div className="flex items-center gap-2">
            <span>⏱️ Duración:</span>
            <span className="font-medium">{simulation.duration} min</span>
          </div>
        )}
        {simulation.totalQuestions && (
          <div className="flex items-center gap-2">
            <span>📝 Preguntas:</span>
            <span className="font-medium">{simulation.totalQuestions}</span>
          </div>
        )}
        {simulation.status && (
          <div className="flex items-center gap-2">
            <span>Estado:</span>
            <span
              className={`font-medium ${
                simulation.status === 'active'
                  ? 'text-green-600'
                  : simulation.status === 'completed'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {simulation.status}
            </span>
          </div>
        )}
      </div>
      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Ver detalles
      </button>
    </div>
  );
}

