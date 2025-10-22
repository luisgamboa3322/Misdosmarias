# 🚀 Cómo Ejecutar el Proyecto en VS Code

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- ✅ **Node.js** (versión 18 o superior)
  - Verifica con: `node --version`
  - Descarga: https://nodejs.org/

- ✅ **npm** o **yarn** (viene con Node.js)
  - Verifica con: `npm --version`

---

## 🎯 Pasos para Ejecutar el Proyecto

### **1. Abrir Terminal en VS Code**

Hay 3 formas:

**Opción A: Atajo de teclado (más rápido)**
```
Ctrl + `  (tecla acento grave, junto al número 1)
```

**Opción B: Menú superior**
```
Terminal → Nueva Terminal
```

**Opción C: Menú Ver**
```
Ver → Terminal
```

---

### **2. Verificar que estás en la carpeta correcta**

En la terminal, ejecuta:

```bash
pwd
```

Deberías ver la ruta de tu proyecto. Si no estás en la carpeta correcta:

```bash
cd ruta/a/tu/proyecto
```

---

### **3. Instalar Dependencias (Primera vez o después de cambios)**

Si es la **primera vez** que ejecutas el proyecto, o descargaste el código de GitHub:

**Con npm:**
```bash
npm install
```

**Con yarn:**
```bash
yarn install
```

**Con pnpm:**
```bash
pnpm install
```

⏳ **Esto tomará 1-3 minutos.** Verás algo como:

```
added 1234 packages in 2m

12 packages are looking for funding
  run `npm fund` for details
```

✅ **Cuando termine, verás el prompt de nuevo.**

---

### **4. Ejecutar el Proyecto en Modo Desarrollo**

**Con npm:**
```bash
npm run dev
```

**Con yarn:**
```bash
yarn dev
```

**Con pnpm:**
```bash
pnpm dev
```

---

### **5. Abrir en el Navegador**

Verás algo como:

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Opciones para abrir:**

**A) Clic directo en VS Code:**
- Mantén presionada la tecla `Ctrl` (Windows/Linux) o `Cmd` (Mac)
- Haz clic en `http://localhost:5173/`

**B) Copiar y pegar:**
- Copia `http://localhost:5173/`
- Pégalo en tu navegador (Chrome, Edge, Firefox)

**C) Atajo rápido:**
- Presiona `Ctrl + Click` en el enlace

---

## 🎨 Ver el Indicador Responsive (Opcional)

Si quieres ver el componente de debugging que muestra el tamaño de pantalla:

1. Abre `/App.tsx`
2. Agrega antes del cierre del `<div>`:

```tsx
{/* Indicador de desarrollo */}
{process.env.NODE_ENV === 'development' && <ResponsiveIndicator />}
```

3. Importa el componente al inicio:

```tsx
import ResponsiveIndicator from './components/ResponsiveIndicator';
```

Verás una etiqueta en la esquina inferior derecha mostrando el dispositivo actual.

---

## 🛠️ Comandos Útiles

### **Detener el Servidor**
```
Ctrl + C  (en la terminal)
```
Aparecerá: `Terminate batch job (Y/N)?` → Presiona `Y` y Enter

### **Limpiar Terminal**
```bash
clear    # Linux/Mac
cls      # Windows CMD
Clear-Host  # Windows PowerShell
```

### **Instalar una Dependencia Nueva**
```bash
npm install nombre-paquete
```

### **Ver Dependencias Instaladas**
```bash
npm list --depth=0
```

---

## 🔍 Probar en Diferentes Dispositivos

### **Método 1: Chrome DevTools (Recomendado)**

1. **Abre tu aplicación** en Chrome
2. **Presiona F12** o Click derecho → Inspeccionar
3. **Click en el icono de dispositivos** (arriba a la izquierda)
4. **Selecciona un dispositivo:**
   - iPhone SE
   - iPhone 12/13/14
   - iPad
   - Responsive (personalizado)

### **Método 2: Cambiar Tamaño de Ventana**

Simplemente redimensiona la ventana del navegador y verás cómo se adapta.

### **Método 3: Diferentes URLs**

Desde otros dispositivos en tu red local:

```bash
npm run dev -- --host
```

Te mostrará:
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.100:5173/
```

Abre la URL de Network en tu celular/tablet (deben estar en la misma WiFi).

---

## ❌ Solución de Problemas Comunes

### **Error: "command not found: npm"**

**Solución:** Instala Node.js desde https://nodejs.org/

### **Error: "Cannot find module 'vite'"**

**Solución:**
```bash
npm install
```

### **Error: "Port 5173 is already in use"**

**Solución:** Otra aplicación está usando el puerto.

```bash
# Opción A: Detener la otra aplicación
# Busca procesos en el puerto
npx kill-port 5173

# Opción B: Usar otro puerto
npm run dev -- --port 3000
```

### **Error: "EACCES: permission denied"**

**Solución (Linux/Mac):**
```bash
sudo npm install
```

**Solución (Windows):** Ejecuta VS Code como Administrador

### **La página no carga / pantalla en blanco**

**Solución:**
1. Abre la consola del navegador (F12)
2. Revisa errores en la pestaña "Console"
3. Verifica que no haya errores de importación

### **Cambios no se reflejan**

**Solución:**
1. Guarda el archivo (Ctrl + S)
2. Espera 1-2 segundos (Hot Module Replacement)
3. Si no funciona, recarga la página (Ctrl + R)
4. Si aún no funciona, detén el servidor (Ctrl + C) y vuelve a ejecutar `npm run dev`

---

## 📊 Scripts Disponibles

Revisa tu `package.json` para ver todos los scripts. Comúnmente:

```bash
npm run dev       # Ejecutar en desarrollo
npm run build     # Crear versión de producción
npm run preview   # Ver versión de producción localmente
npm run lint      # Revisar errores de código
```

---

## 🎯 Workflow Diario Recomendado

```bash
# 1. Abrir VS Code
code .

# 2. Abrir terminal (Ctrl + `)

# 3. Ejecutar proyecto
npm run dev

# 4. Abrir navegador
# http://localhost:5173/

# 5. Trabajar (los cambios se reflejan automáticamente)

# 6. Al terminar, detener servidor
# Ctrl + C en la terminal
```

---

## 🚀 Primer Uso - Checklist Completo

- [ ] **Instalar Node.js** (si no lo tienes)
- [ ] **Abrir VS Code**
- [ ] **Abrir carpeta del proyecto** (Archivo → Abrir Carpeta)
- [ ] **Abrir terminal** (Ctrl + `)
- [ ] **Instalar dependencias** (`npm install`)
- [ ] **Ejecutar proyecto** (`npm run dev`)
- [ ] **Abrir navegador** (`http://localhost:5173/`)
- [ ] **Probar responsive** (F12 → Device Toolbar)
- [ ] **¡Empezar a desarrollar!** 🎉

---

## 📱 Testing Responsive Rápido

Una vez que el proyecto esté corriendo:

```bash
# 1. Abre Chrome
http://localhost:5173/

# 2. Presiona F12

# 3. Click en icono de dispositivos (Ctrl + Shift + M)

# 4. Prueba estos tamaños:
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- iPad (768px)
- Responsive (arrastra para cambiar tamaño)
```

---

## 💡 Tips Pro

### **Múltiples Terminales**

Puedes tener varias terminales abiertas:

1. Click en el **+** junto a la terminal actual
2. O presiona `Ctrl + Shift + ` `

Útil para:
- Terminal 1: `npm run dev` (servidor corriendo)
- Terminal 2: Ejecutar comandos Git
- Terminal 3: Instalar paquetes

### **Terminal Dividida**

Click en el icono de **Split Terminal** (🔀) para dividir la terminal.

### **Cambiar Tipo de Terminal**

Click en la flecha ▼ junto al + y selecciona:
- Command Prompt
- PowerShell
- Git Bash
- WSL (si tienes Windows Subsystem for Linux)

---

## 🎨 Verificar que el Responsive Funciona

1. **Ejecuta el proyecto** (`npm run dev`)
2. **Abre DevTools** (F12)
3. **Activa modo responsive** (icono de móvil)
4. **Prueba estos tamaños:**

| Tamaño | Qué deberías ver |
|--------|------------------|
| **375px (Mobile)** | Menú hamburguesa, 1 columna de servicios |
| **768px (Tablet)** | Menú hamburguesa, 2 columnas de servicios |
| **1024px (Laptop)** | Menú horizontal, 4 columnas de servicios |
| **1440px (Desktop)** | Menú horizontal espaciado, todo optimizado |

---

## 📞 Ayuda Adicional

Si tienes problemas:

1. **Revisa la consola** de VS Code (terminal)
2. **Revisa la consola** del navegador (F12 → Console)
3. **Lee los mensajes de error** completos
4. **Verifica que Node.js esté instalado:** `node --version`
5. **Verifica que npm funcione:** `npm --version`

---

## ✅ Confirmación de Éxito

Sabrás que todo funciona cuando:

- ✅ La terminal muestra: `ready in XXX ms`
- ✅ El navegador carga la página sin errores
- ✅ Ves el contenido de "Mis Dos Marías E.I.R.L."
- ✅ Los cambios que hagas se reflejan automáticamente

---

**¡Listo! Ahora puedes desarrollar tu aplicación.** 🎉

**Próximo paso:** Prueba el sistema responsive siguiendo `RESPONSIVE_GUIDE.md`
