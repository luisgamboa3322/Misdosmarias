# ⚡ Comandos Git Rápidos - Copy & Paste

## 🚀 Opción 1: Subir Todo en 4 Comandos (RECOMENDADO)

Abre tu terminal (CMD, PowerShell, Git Bash o Terminal de VS Code) y ejecuta:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "feat: sistema responsive completo para mobile, tablet, laptop y desktop"
```

```bash
git push origin main
```

✅ **¡LISTO! Tus cambios están en GitHub.**

---

## 🔍 Opción 2: Verificar Primero, Luego Subir

### Paso 1: Ejecutar Script de Verificación

**Si usas Windows:**
```powershell
powershell -ExecutionPolicy Bypass -File verify-changes.ps1
```

**Si usas Linux/Mac:**
```bash
bash verify-changes.sh
```

### Paso 2: Ver Qué Cambió
```bash
git status
```

### Paso 3: Ver Cambios Detallados (Opcional)
```bash
git diff App.tsx
```

### Paso 4: Agregar y Subir
```bash
git add .
git commit -m "feat: sistema responsive completo para todos los dispositivos"
git push origin main
```

---

## 📝 Opción 3: Commit Descriptivo Completo

Si quieres un commit message más detallado:

```bash
git add .
```

```bash
git commit -m "feat: implementar sistema responsive completo

Cambios principales:
- Hook useResponsive para detección de dispositivos
- Breakpoints personalizados (xs, sm, md, lg, xl, 2xl)
- Navegación adaptativa con menú hamburguesa animado
- Componentes responsive: Hero, Servicios, Nosotros, Footer
- Utilities CSS: clamp(), safe-area, containers responsive
- Documentación: RESPONSIVE_GUIDE.md, scripts de verificación
- Componente ResponsiveIndicator para debugging

Archivos nuevos:
- hooks/useResponsive.ts
- components/ResponsiveIndicator.tsx
- RESPONSIVE_GUIDE.md
- GITHUB_DEPLOY_CHECKLIST.md
- verify-changes.sh / verify-changes.ps1
- CAMBIOS_RESPONSIVE_RESUMEN.md

Componentes actualizados:
- App.tsx - navegación responsive
- HeroSection.tsx - texto condicional
- ServiciosSection.tsx - grid adaptativo
- NosotrosSection.tsx - layout responsive
- Footer.tsx - columnas adaptativas
- styles/globals.css - breakpoints y utilities"
```

```bash
git push origin main
```

---

## 🔧 Comandos Útiles de Git

### Ver Estado Actual
```bash
git status
```

### Ver Qué Archivos Cambiaron (Resumen)
```bash
git diff --stat
```

### Ver Cambios en un Archivo Específico
```bash
git diff App.tsx
```

### Ver Últimos 5 Commits
```bash
git log --oneline -5
```

### Deshacer Cambios (Si cometiste un error)
```bash
# Deshacer cambios en un archivo específico (antes de add)
git checkout -- App.tsx

# Deshacer todos los cambios (antes de add)
git reset --hard

# Deshacer último commit (conservar cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1
```

### Ver Archivos que Subirás
```bash
git diff --cached
```

---

## 🌐 Verificar en GitHub

Después de hacer `git push`, ve a tu navegador:

```
https://github.com/TU_USUARIO/TU_REPOSITORIO
```

Deberías ver:
1. ✅ Tu commit más reciente en la página principal
2. ✅ Badge verde "Latest commit" con tu mensaje
3. ✅ Nuevos archivos en el árbol de directorios

---

## ❓ Solución Rápida de Problemas

### "Permission denied (publickey)"
```bash
# Cambiar a HTTPS
git remote set-url origin https://github.com/TU_USUARIO/TU_REPO.git
git push origin main
```

### "Updates were rejected"
```bash
# Traer cambios remotos primero
git pull origin main --rebase
git push origin main
```

### "fatal: not a git repository"
```bash
# Inicializar Git
git init
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git add .
git commit -m "feat: sistema responsive completo"
git push -u origin main
```

### "Changes not staged for commit"
```bash
# Simplemente agrega los cambios
git add .
```

---

## 📊 Verificar Después del Push

### Ver Commits en GitHub
```
https://github.com/TU_USUARIO/TU_REPO/commits/main
```

### Ver Archivos Específicos
```
https://github.com/TU_USUARIO/TU_REPO/blob/main/hooks/useResponsive.ts
https://github.com/TU_USUARIO/TU_REPO/blob/main/RESPONSIVE_GUIDE.md
```

### Ver Diff del Último Commit
```
https://github.com/TU_USUARIO/TU_REPO/commit/HASH_DEL_COMMIT
```

---

## 🎯 Checklist Final

Antes de cerrar la terminal, verifica:

- [ ] ✅ `git status` muestra "nothing to commit, working tree clean"
- [ ] ✅ GitHub.com muestra tu nuevo commit
- [ ] ✅ Archivos nuevos aparecen en GitHub
- [ ] ✅ No hay errores en la consola

---

## 💡 Tips Pro

### Alias Git para Comandos Rápidos
```bash
# Agregar alias
git config --global alias.st status
git config --global alias.cm commit
git config --global alias.co checkout

# Ahora puedes usar:
git st      # en lugar de git status
git cm -m "mensaje"  # en lugar de git commit -m "mensaje"
```

### Ver Branch Actual
```bash
git branch
```

### Crear Backup Antes de Subir
```bash
git branch backup-responsive-$(date +%Y%m%d)
```

---

## 🚀 Super Comando Todo-en-Uno

Si confías en tus cambios y quieres subirlo todo de una vez:

**Windows (PowerShell):**
```powershell
git add . ; git commit -m "feat: sistema responsive completo" ; git push origin main
```

**Linux/Mac:**
```bash
git add . && git commit -m "feat: sistema responsive completo" && git push origin main
```

---

## 📝 Resumen Ultra Rápido

```
1. git status           ← Ver qué cambió
2. git add .            ← Preparar todo
3. git commit -m "..."  ← Guardar cambios
4. git push origin main ← Subir a GitHub
```

✅ **4 comandos = Cambios en GitHub**

---

**¡Éxito! 🎉**
