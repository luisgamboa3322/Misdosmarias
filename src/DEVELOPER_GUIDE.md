# 👨‍💻 Guía Rápida para Desarrolladores

## 🎯 Inicio Rápido

### Estructura del Proyecto

```
mis-dos-marias/
├── components/           # Componentes React
│   ├── SEO.tsx          # Meta tags y SEO
│   ├── ErrorBoundary.tsx # Manejo de errores
│   ├── SkipToContent.tsx # Accesibilidad
│   └── [SectionName].tsx # Secciones de la página
├── hooks/               # Custom React hooks
│   ├── useScrollSpy.ts  # Detección de scroll
│   └── useFormValidation.ts # Validación de formularios
├── utils/               # Funciones auxiliares
│   ├── constants.ts     # Constantes del proyecto
│   ├── accessibility.ts # Helpers de a11y
│   └── security.ts      # Funciones de seguridad
└── styles/
    └── globals.css      # Estilos globales Tailwind v4
```

---

## 🛠️ Herramientas y Utilidades

### 1. Custom Hooks

#### `useScrollSpy`
Detecta qué sección está visible durante el scroll.

```typescript
import { useScrollSpy } from './hooks/useScrollSpy';

const activeSection = useScrollSpy(['inicio', 'nosotros', 'servicios']);
// Retorna: 'inicio' | 'nosotros' | 'servicios'
```

#### `useFormValidation`
Validación de formularios con sanitización automática.

```typescript
import { useFormValidation } from './hooks/useFormValidation';

const { values, errors, handleChange, handleBlur, validateAll } = useFormValidation(
  { email: '', nombre: '' },
  {
    email: { 
      required: true, 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email inválido' 
    },
    nombre: { 
      required: true, 
      minLength: 2,
      message: 'Nombre debe tener al menos 2 caracteres'
    }
  }
);

// En el JSX
<input 
  value={values.email}
  onChange={(e) => handleChange('email', e.target.value)}
  onBlur={() => handleBlur('email')}
/>
{errors.email && <span className="text-red-600">{errors.email}</span>}
```

---

### 2. Funciones de Accesibilidad

#### `trapFocus`
Mantiene el foco dentro de un modal.

```typescript
import { trapFocus } from './utils/accessibility';

useEffect(() => {
  if (isModalOpen) {
    const cleanup = trapFocus(modalRef.current);
    return cleanup;
  }
}, [isModalOpen]);
```

#### `announceToScreenReader`
Anuncia cambios dinámicos a lectores de pantalla.

```typescript
import { announceToScreenReader } from './utils/accessibility';

// Después de guardar un formulario
announceToScreenReader('Reserva guardada exitosamente', 'polite');

// Para alertas urgentes
announceToScreenReader('Error: Formulario inválido', 'assertive');
```

#### `toggleBodyScroll`
Previene scroll cuando un modal está abierto.

```typescript
import { toggleBodyScroll } from './utils/accessibility';

useEffect(() => {
  toggleBodyScroll(isModalOpen);
  return () => toggleBodyScroll(false);
}, [isModalOpen]);
```

---

### 3. Funciones de Seguridad

#### `sanitizeInput`
Limpia inputs de usuario.

```typescript
import { sanitizeInput } from './utils/security';

const handleSubmit = (data: FormData) => {
  const cleanData = {
    nombre: sanitizeInput(data.nombre),
    comentarios: sanitizeInput(data.comentarios)
  };
  // Usar cleanData...
};
```

#### `formRateLimiter`
Previene spam en formularios.

```typescript
import { formRateLimiter } from './utils/security';

const handleSubmit = () => {
  if (!formRateLimiter.check(userEmail)) {
    alert('Demasiadas solicitudes. Espere un minuto.');
    return;
  }
  // Procesar formulario...
};
```

#### Validaciones específicas

```typescript
import { 
  isValidEmail, 
  isValidPeruvianPhone,
  isValidDate 
} from './utils/security';

if (!isValidEmail(email)) {
  setError('Email inválido');
}

if (!isValidPeruvianPhone(phone)) {
  setError('Teléfono debe ser formato peruano: +51 9XXXXXXXX');
}

if (!isValidDate(fechaViaje)) {
  setError('Fecha debe ser futura');
}
```

---

### 4. Constantes

Siempre usa las constantes del proyecto en lugar de hardcodear valores.

```typescript
import { 
  COMPANY_INFO, 
  NAVIGATION_SECTIONS,
  VALIDATION_PATTERNS,
  ACCESSIBILITY 
} from './utils/constants';

// ✅ CORRECTO
<h1>{COMPANY_INFO.name}</h1>
<a href={`mailto:${COMPANY_INFO.contact.email}`}>Email</a>

// ❌ INCORRECTO
<h1>Mis Dos Marías E.I.R.L.</h1>
<a href="mailto:info@misdosmarias.com">Email</a>
```

---

## 🎨 Guía de Estilos

### Colores del Proyecto

```typescript
// Usar clases de Tailwind
className="bg-slate-900"    // Navy principal
className="bg-yellow-400"   // Amarillo/Ámbar
className="bg-blue-600"     // Azul fuerte
className="text-slate-900"  // Texto principal
className="text-gray-600"   // Texto secundario
```

### Sistema de Tipografía

```css
/* NO uses clases de font-size, font-weight, line-height */
/* El sistema está en globals.css */

/* ✅ CORRECTO - Usa elementos semánticos */
<h1>Título Principal</h1>  /* Automáticamente styled */
<h2>Subtítulo</h2>
<p>Párrafo normal</p>

/* ❌ INCORRECTO - No uses clases de texto */
<div className="text-2xl font-bold">Título</div>
```

### Espaciado Consistente

```typescript
// Usar escala de Tailwind
className="space-y-4"    // Gap vertical pequeño
className="space-y-6"    // Gap vertical medio
className="space-y-8"    // Gap vertical grande
className="px-4 py-6"    // Padding interno
className="mb-8"         // Margin bottom
```

---

## ♿ Checklist de Accesibilidad

Al crear un nuevo componente, verifica:

- [ ] Todos los botones tienen texto o `aria-label`
- [ ] Imágenes tienen `alt` descriptivo
- [ ] Formularios tienen `<label>` asociados
- [ ] Estados interactivos tienen `:focus-visible`
- [ ] Contraste de color cumple WCAG AA (4.5:1)
- [ ] Navegación por teclado funciona
- [ ] Estados de loading son anunciados
- [ ] Modales atrapan el foco

### Ejemplo de Componente Accesible

```typescript
function AccessibleButton() {
  return (
    <button
      onClick={handleClick}
      className="
        bg-blue-600 text-white px-6 py-3 rounded-lg
        hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
      "
      aria-label="Enviar formulario de reserva"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
          <span>Enviando...</span>
        </>
      ) : (
        'Enviar'
      )}
    </button>
  );
}
```

---

## 🔒 Checklist de Seguridad

Al manejar datos de usuario:

- [ ] Sanitizar TODOS los inputs con `sanitizeInput()`
- [ ] Validar formato de email con `isValidEmail()`
- [ ] Validar teléfonos con `isValidPeruvianPhone()`
- [ ] Aplicar rate limiting en formularios
- [ ] No mostrar errores sensibles al usuario
- [ ] Usar HTTPS en producción
- [ ] Validar longitud máxima de campos
- [ ] Escapar HTML en contenido dinámico

---

## 🚀 Performance Tips

### 1. Lazy Loading de Componentes

```typescript
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminDashboard />
    </Suspense>
  );
}
```

### 2. Memoización

```typescript
import { useMemo, useCallback } from 'react';

// Memoizar valores computados
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoizar callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 3. Imágenes Optimizadas

```typescript
// ✅ CORRECTO - Con lazy loading
<img 
  src={imageUrl} 
  alt="Descripción"
  loading="lazy"
  width={800}
  height={600}
/>

// Para imágenes críticas (above the fold)
<img 
  src={heroImage} 
  alt="Hero"
  loading="eager"
  fetchpriority="high"
/>
```

---

## 📝 Convenciones de Código

### Nomenclatura de Archivos

```
// Componentes: PascalCase
HeroSection.tsx
AdminDashboard.tsx

// Hooks: camelCase con 'use'
useScrollSpy.ts
useFormValidation.ts

// Utils: camelCase
constants.ts
security.ts
```

### Imports Organizados

```typescript
// 1. React y bibliotecas externas
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// 2. Components
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

// 3. Hooks
import { useScrollSpy } from './hooks/useScrollSpy';

// 4. Utils y constantes
import { COMPANY_INFO } from './utils/constants';
import { sanitizeInput } from './utils/security';

// 5. Types
import type { Reservation } from './types';

// 6. Styles (si aplica)
import './styles/custom.css';
```

### Comentarios Útiles

```typescript
/**
 * Componente principal de navegación
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {boolean} props.isOpen - Estado del menú móvil
 */
export function Navigation({ isOpen }: NavigationProps) {
  // ...
}

// TODO: Implementar búsqueda de reservas
// FIXME: Corregir validación de fecha en Safari
// HACK: Workaround temporal para iOS keyboard issue
```

---

## 🧪 Testing (Preparado)

### Estructura de Tests

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🐛 Debugging

### React DevTools

```typescript
// Agregar displayName para mejor debugging
ComponentName.displayName = 'ComponentName';

// Console logging condicional
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### Error Boundaries

Todos los componentes ya están envueltos en ErrorBoundary. Para errores específicos:

```typescript
try {
  await riskyOperation();
} catch (error) {
  console.error('Error en operación:', error);
  // Mostrar mensaje al usuario
  announceToScreenReader('Error al procesar solicitud', 'assertive');
}
```

---

## 📞 Ayuda y Recursos

### Enlaces Útiles
- [Documentación de React](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)

### Comandos Comunes

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0
