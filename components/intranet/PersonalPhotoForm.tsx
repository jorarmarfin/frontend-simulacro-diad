'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  ImageIcon,
  Loader2
} from 'lucide-react';
import { useSimulationMode } from '@/lib/hooks/useSimulationMode';
import { SimulationApplicantService } from '@/lib/services/simulation-applicant.service';
import { SimulationStorageService } from '@/lib/services/simulation-storage.service';

export function PersonalPhotoForm() {
  const router = useRouter();
  const { requiresPhoto, isLoading: isModeLoading } = useSimulationMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Validar el archivo seleccionado
  const validateFile = useCallback((file: File): string | null => {
    // Validar tipo de archivo (solo JPG/JPEG)
    const validTypes = ['image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return 'Solo se permiten archivos en formato JPG/JPEG';
    }

    // Validar tamaño (máximo 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return 'El archivo no debe superar los 2MB';
    }

    return null;
  }, []);

  // Manejar la selección de archivo
  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setPreview(null);
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [validateFile]);

  // Manejar drag & drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  // Redirigir si es simulacro virtual (no requiere foto)
  useEffect(() => {
    if (!isModeLoading && !requiresPhoto) {
      router.replace('/intranet/payments-data');
    }
  }, [isModeLoading, requiresPhoto, router]);

  // Manejar cambio en el input file
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Eliminar foto seleccionada
  const handleRemovePhoto = () => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Abrir selector de archivos
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Enviar foto al backend
  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Debe seleccionar una foto');
      return;
    }

    // Obtener el UUID del postulante desde el storage
    const uuid = SimulationStorageService.getApplicantUuid();
    if (!uuid) {
      setError('No se encontró información del postulante. Por favor, complete primero sus datos personales.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await SimulationApplicantService.uploadPhoto(uuid, selectedFile);

      if (SimulationApplicantService.isUploadSuccessResponse(response)) {
        // Foto subida exitosamente, redirigir a la siguiente página
        router.push('/intranet/payments-data');
      } else {
        // Mostrar error del servidor
        setError(response.message || 'Error al subir la foto. Intente nuevamente.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al subir la foto. Intente nuevamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar loading mientras se verifica el modo
  if (isModeLoading || !requiresPhoto) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 flex items-center justify-center min-h-75">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Camera className="h-8 w-8 text-blue-500" />
            Foto del Postulante
          </h1>
          <p className="mt-2 text-slate-600">
            Sube una fotografía reciente que cumpla con los requisitos indicados.
          </p>
        </div>

        {/* Instrucciones importantes */}
        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Requisitos de la fotografía:</h3>
              <ul className="text-sm text-blue-800 space-y-1.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Formato:</strong> JPG/JPEG únicamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Tipo:</strong> Tamaño pasaporte a color</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Encuadre:</strong> A partir de los hombros, rostro centrado</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Fondo:</strong> Color blanco, uniforme y sin sombras</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Expresión:</strong> Rostro visible, con expresión neutral</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Tamaño máximo:</strong> 2 MB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Restricciones */}
        <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">No se permitirá:</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Uso de lentes oscuros o de sol</li>
                <li>• Gorras, sombreros o cualquier accesorio en la cabeza</li>
                <li>• Implementos que dificulten la identificación</li>
                <li>• Fotos borrosas, pixeladas o con filtros</li>
                <li>• Imágenes recortadas de otras fotografías</li>
                <li>• Selfies o fotos con el celular reflejado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Área de carga de foto */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg"
            onChange={handleInputChange}
            className="hidden"
          />

          {!preview ? (
            // Zona de drop cuando no hay imagen
            <div
              onClick={handleOpenFileDialog}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-slate-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-700">
                    Arrastra tu foto aquí
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    o haz clic para seleccionar un archivo
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Seleccionar Foto
                </button>
              </div>
            </div>
          ) : (
            // Preview de la imagen seleccionada
            <div className="relative">
              <div className="border-2 border-green-300 rounded-xl p-4 bg-green-50/30">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Imagen preview */}
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview de foto"
                      className="w-40 h-48 object-cover rounded-lg shadow-md border-2 border-white"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Info del archivo */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-green-700 mb-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Foto cargada correctamente</span>
                    </div>
                    {selectedFile && (
                      <div className="text-sm text-slate-600 space-y-1">
                        <p><strong>Archivo:</strong> {selectedFile.name}</p>
                        <p><strong>Tamaño:</strong> {(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleOpenFileDialog}
                      className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Cambiar foto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !selectedFile}
            className="w-full flex justify-center items-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Subiendo foto...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Guardar y Continuar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

