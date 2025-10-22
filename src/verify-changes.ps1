# Script de verificación de cambios responsive para Windows PowerShell
# Ejecutar con: powershell -ExecutionPolicy Bypass -File verify-changes.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🔍 VERIFICACIÓN DE CAMBIOS RESPONSIVE" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$total = 0
$passed = 0

# Función para verificar archivo
function Check-File {
    param($path, $description)
    $script:total++
    if (Test-Path $path) {
        Write-Host "✓ $description" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "✗ $description - FALTA" -ForegroundColor Red
    }
}

# Función para verificar contenido
function Check-Content {
    param($path, $pattern, $description)
    $script:total++
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        if ($content -match [regex]::Escape($pattern)) {
            Write-Host "✓ $description" -ForegroundColor Green
            $script:passed++
        } else {
            Write-Host "✗ $description - NO ENCONTRADO" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ $description - ARCHIVO NO EXISTE" -ForegroundColor Red
    }
}

Write-Host "📁 VERIFICANDO ARCHIVOS NUEVOS..." -ForegroundColor Yellow
Write-Host "----------------------------------------"
Check-File "hooks/useResponsive.ts" "Hook useResponsive creado"
Check-File "components/ResponsiveIndicator.tsx" "Componente ResponsiveIndicator creado"
Check-File "RESPONSIVE_GUIDE.md" "Documentación responsive creada"
Check-File "GITHUB_DEPLOY_CHECKLIST.md" "Checklist de deploy creado"
Write-Host ""

Write-Host "🔧 VERIFICANDO ACTUALIZACIONES..." -ForegroundColor Yellow
Write-Host "----------------------------------------"
Check-Content "App.tsx" "useResponsive" "App.tsx usa hook useResponsive"
Check-Content "App.tsx" "AnimatePresence" "App.tsx usa AnimatePresence"
Check-Content "styles/globals.css" "@custom-media" "globals.css tiene breakpoints personalizados"
Check-Content "styles/globals.css" "text-responsive" "globals.css tiene utilities responsive"
Check-Content "components/HeroSection.tsx" "useResponsive" "HeroSection es responsive"
Check-Content "components/ServiciosSection.tsx" "sm:grid-cols-2" "ServiciosSection usa grid responsive"
Check-Content "components/Footer.tsx" "sm:grid-cols-2" "Footer es responsive"
Check-Content "components/NosotrosSection.tsx" "sm:grid-cols-2" "NosotrosSection es responsive"
Write-Host ""

Write-Host "🎨 VERIFICANDO BREAKPOINTS CSS..." -ForegroundColor Yellow
Write-Host "----------------------------------------"
Check-Content "styles/globals.css" "--mobile-lg" "Breakpoint mobile-lg definido"
Check-Content "styles/globals.css" "--tablet" "Breakpoint tablet definido"
Check-Content "styles/globals.css" "--laptop" "Breakpoint laptop definido"
Check-Content "styles/globals.css" "--desktop" "Breakpoint desktop definido"
Write-Host ""

Write-Host "⚛️ VERIFICANDO IMPORTS..." -ForegroundColor Yellow
Write-Host "----------------------------------------"
Check-Content "App.tsx" "import { useResponsive }" "Import useResponsive en App.tsx"
Check-Content "components/HeroSection.tsx" "import { useResponsive }" "Import useResponsive en HeroSection"
Write-Host ""

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "📊 RESUMEN" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Total de verificaciones: $total"
Write-Host "Pasadas: $passed" -ForegroundColor Green
Write-Host "Fallidas: $($total - $passed)" -ForegroundColor Red
Write-Host ""

if ($passed -eq $total) {
    Write-Host "🎉 ¡TODOS LOS CAMBIOS ESTÁN CORRECTOS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Puedes proceder a subir a GitHub con:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor White
    Write-Host '  git commit -m "feat: implementar diseño responsive completo"' -ForegroundColor White
    Write-Host "  git push origin main" -ForegroundColor White
} else {
    Write-Host "⚠️  Faltan algunos archivos o cambios" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Revisa los archivos marcados con ✗" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "📋 COMANDOS GIT PARA EJECUTAR" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "# 1. Ver estado actual" -ForegroundColor Yellow
Write-Host "git status" -ForegroundColor White
Write-Host ""
Write-Host "# 2. Agregar todos los cambios" -ForegroundColor Yellow
Write-Host "git add ." -ForegroundColor White
Write-Host ""
Write-Host "# 3. Hacer commit" -ForegroundColor Yellow
Write-Host 'git commit -m "feat: sistema responsive completo para todos los dispositivos"' -ForegroundColor White
Write-Host ""
Write-Host "# 4. Subir a GitHub" -ForegroundColor Yellow
Write-Host "git push origin main" -ForegroundColor White
Write-Host ""
