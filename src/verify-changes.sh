#!/bin/bash

# Script de verificación de cambios responsive
# Ejecutar con: bash verify-changes.sh

echo "================================================"
echo "🔍 VERIFICACIÓN DE CAMBIOS RESPONSIVE"
echo "================================================"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador
total=0
passed=0

# Función para verificar archivo
check_file() {
    total=$((total + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        passed=$((passed + 1))
    else
        echo -e "${RED}✗${NC} $2 - FALTA"
    fi
}

# Función para verificar contenido
check_content() {
    total=$((total + 1))
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $3"
        passed=$((passed + 1))
    else
        echo -e "${RED}✗${NC} $3 - NO ENCONTRADO"
    fi
}

echo "📁 VERIFICANDO ARCHIVOS NUEVOS..."
echo "----------------------------------------"
check_file "hooks/useResponsive.ts" "Hook useResponsive creado"
check_file "components/ResponsiveIndicator.tsx" "Componente ResponsiveIndicator creado"
check_file "RESPONSIVE_GUIDE.md" "Documentación responsive creada"
check_file "GITHUB_DEPLOY_CHECKLIST.md" "Checklist de deploy creado"
echo ""

echo "🔧 VERIFICANDO ACTUALIZACIONES..."
echo "----------------------------------------"
check_content "App.tsx" "useResponsive" "App.tsx usa hook useResponsive"
check_content "App.tsx" "AnimatePresence" "App.tsx usa AnimatePresence"
check_content "styles/globals.css" "@custom-media" "globals.css tiene breakpoints personalizados"
check_content "styles/globals.css" "text-responsive" "globals.css tiene utilities responsive"
check_content "components/HeroSection.tsx" "useResponsive" "HeroSection es responsive"
check_content "components/ServiciosSection.tsx" "sm:grid-cols-2" "ServiciosSection usa grid responsive"
check_content "components/Footer.tsx" "sm:grid-cols-2" "Footer es responsive"
check_content "components/NosotrosSection.tsx" "sm:grid-cols-2" "NosotrosSection es responsive"
echo ""

echo "🎨 VERIFICANDO BREAKPOINTS CSS..."
echo "----------------------------------------"
check_content "styles/globals.css" "--mobile-lg" "Breakpoint mobile-lg definido"
check_content "styles/globals.css" "--tablet" "Breakpoint tablet definido"
check_content "styles/globals.css" "--laptop" "Breakpoint laptop definido"
check_content "styles/globals.css" "--desktop" "Breakpoint desktop definido"
echo ""

echo "⚛️ VERIFICANDO IMPORTS..."
echo "----------------------------------------"
check_content "App.tsx" "import { useResponsive }" "Import useResponsive en App.tsx"
check_content "components/HeroSection.tsx" "import { useResponsive }" "Import useResponsive en HeroSection"
echo ""

echo "================================================"
echo "📊 RESUMEN"
echo "================================================"
echo -e "Total de verificaciones: ${total}"
echo -e "${GREEN}Pasadas: ${passed}${NC}"
echo -e "${RED}Fallidas: $((total - passed))${NC}"
echo ""

if [ $passed -eq $total ]; then
    echo -e "${GREEN}🎉 ¡TODOS LOS CAMBIOS ESTÁN CORRECTOS!${NC}"
    echo ""
    echo "Puedes proceder a subir a GitHub con:"
    echo "  git add ."
    echo "  git commit -m \"feat: implementar diseño responsive completo\""
    echo "  git push origin main"
else
    echo -e "${YELLOW}⚠️  Faltan algunos archivos o cambios${NC}"
    echo ""
    echo "Revisa los archivos marcados con ${RED}✗${NC}"
fi

echo ""
echo "================================================"
echo "📋 SIGUIENTE PASO: Ejecuta estos comandos"
echo "================================================"
echo ""
echo "# 1. Ver estado actual"
echo "git status"
echo ""
echo "# 2. Agregar todos los cambios"
echo "git add ."
echo ""
echo "# 3. Hacer commit"
echo 'git commit -m "feat: sistema responsive completo para todos los dispositivos"'
echo ""
echo "# 4. Subir a GitHub"
echo "git push origin main"
echo ""
