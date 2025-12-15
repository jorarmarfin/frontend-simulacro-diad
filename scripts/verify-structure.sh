#!/bin/bash

# Script de verificación del proyecto

echo "🔍 Verificando estructura del proyecto..."
echo ""

# Verificar archivos clave
echo "📁 Verificando archivos principales:"
files=(
  "app/(home)/page.tsx"
  "app/(home)/layout.tsx"
  "app/intranet/layout.tsx"
  "app/intranet/personal-data/page.tsx"
  "components/layout/Header.tsx"
  "components/layout/Footer.tsx"
  "components/layout/IntranetHeader.tsx"
  "components/layout/IntranetFooter.tsx"
  "lib/config/api.config.ts"
  "lib/services/exam-simulation.service.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (no encontrado)"
  fi
done

echo ""
echo "🔨 Verificando TypeScript..."
npx tsc --noEmit > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✅ Sin errores de TypeScript"
else
  echo "  ❌ Errores encontrados en TypeScript"
  echo "  Ejecuta: npx tsc --noEmit para ver los detalles"
fi

echo ""
echo "📦 Verificando dependencias..."
if [ -d "node_modules" ]; then
  echo "  ✅ node_modules instalado"
else
  echo "  ❌ node_modules no encontrado. Ejecuta: npm install"
fi

echo ""
echo "🎨 Verificando archivos de estilo..."
if [ -f "app/globals.css" ]; then
  echo "  ✅ globals.css encontrado"
else
  echo "  ❌ globals.css no encontrado"
fi

echo ""
echo "📝 Estructura de componentes:"
echo ""
echo "  Layout Components:"
find components/layout -name "*.tsx" 2>/dev/null | while read file; do
  echo "    - $(basename $file)"
done

echo ""
echo "  Home Components:"
find components/home -name "*.tsx" 2>/dev/null | while read file; do
  echo "    - $(basename $file)"
done

echo ""
echo "  UI Components:"
find components/ui -name "*.tsx" 2>/dev/null | while read file; do
  echo "    - $(basename $file)"
done

echo ""
echo "  Intranet Components:"
find components/intranet -name "*.tsx" 2>/dev/null | while read file; do
  echo "    - $(basename $file)"
done

echo ""
echo "✅ Verificación completada!"
echo ""
echo "💡 Comandos útiles:"
echo "  npm run dev          - Iniciar servidor de desarrollo"
echo "  npm run build        - Construir para producción"
echo "  npm run lint         - Verificar código"
echo "  npx tsc --noEmit     - Verificar tipos"

