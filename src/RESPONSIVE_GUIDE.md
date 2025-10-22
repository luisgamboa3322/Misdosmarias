# 📱 Guía de Diseño Responsive - Mis Dos Marías E.I.R.L.

## 🎯 Breakpoints Implementados

La aplicación utiliza un sistema de breakpoints adaptado a todos los dispositivos modernos:

### Breakpoints Tailwind CSS

| Breakpoint | Ancho Mínimo | Dispositivos | Uso |
|------------|--------------|--------------|-----|
| `xs` (default) | 0px - 479px | iPhone SE, pequeños Android | Mobile pequeño |
| `sm` | 480px - 639px | iPhone 12/13/14, Android medio | Mobile grande |
| `md` | 640px - 767px | iPhone Plus, landscape | Mobile landscape |
| `lg` | 768px - 1023px | iPad, tablets Android | Tablets |
| `xl` | 1024px - 1279px | iPad Pro, laptops pequeñas | Laptops |
| `2xl` | 1280px - 1439px | Laptops grandes | Desktop pequeño |
| `desktop` | 1440px+ | Monitores 1080p, 4K | Desktop grande |

### Breakpoints Personalizados (CSS)

```css
@custom-media --xs (min-width: 320px);        /* Mobile mínimo */
@custom-media --mobile-lg (min-width: 480px); /* Mobile grande */
@custom-media --tablet (min-width: 768px);    /* Tablets */
@custom-media --laptop (min-width: 1024px);   /* Laptops */
@custom-media --desktop (min-width: 1440px);  /* Desktops */
```

---

## 📐 Sistema de Espaciado Responsive

### Variables CSS Adaptativas

```css
/* Mobile (320px - 767px) */
--spacing-section: 3rem;      /* 48px */
--container-padding: 1rem;    /* 16px */

/* Tablet (768px - 1023px) */
--spacing-section: 4rem;      /* 64px */
--container-padding: 1.5rem;  /* 24px */

/* Laptop (1024px - 1439px) */
--spacing-section: 5rem;      /* 80px */
--container-padding: 2rem;    /* 32px */

/* Desktop (1440px+) */
--spacing-section: 6rem;      /* 96px */
--container-padding: 2rem;    /* 32px */
```

### Clases Utility Responsive

```tsx
// Contenedores responsivos
<div className="container-responsive container-responsive-xl">
  {/* Max-width: 1280px, padding adaptativo */}
</div>

// Texto responsive con clamp
<h1 className="text-responsive-4xl">
  {/* Font-size: clamp(2.25rem, 6vw, 3rem) */}
</h1>

// Gaps responsivos
<div className="grid gap-responsive">
  {/* Gap: clamp(1rem, 2vw, 2rem) */}
</div>
```

---

## 📱 Patrones de Diseño por Dispositivo

### 1. **Mobile (320px - 767px)**

#### Layout
- Single column layout
- Stack vertical elements
- Full-width components
- Minimal padding (1rem)

#### Typography
```tsx
// Títulos principales
<h1 className="text-3xl sm:text-4xl">

// Subtítulos
<h2 className="text-2xl sm:text-3xl">

// Texto normal
<p className="text-sm sm:text-base">
```

#### Navegación
- Menú hamburguesa
- Full-screen menu overlay
- Touch-friendly targets (min 44px)
- Bottom navigation opcional

#### Botones
```tsx
<button className="px-5 py-3 text-sm sm:text-base">
  {isMobile ? 'Reservar' : 'Reservar Ahora'}
</button>
```

#### Imágenes
- Full-width cuando sea apropiado
- Lazy loading siempre activo
- WebP con fallback

---

### 2. **Tablet (768px - 1023px)**

#### Layout
- 2 column grid cuando sea apropiado
- Sidebar para navegación secundaria
- Más padding (1.5rem)

#### Typography
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
<p className="text-base md:text-lg">
```

#### Navegación
- Menú hamburguesa o horizontal
- Tabs para navegación secundaria
- Hover states activos

#### Grid
```tsx
// 2 columnas en tablet
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

### 3. **Laptop (1024px - 1439px)**

#### Layout
- 3-4 column grids
- Sidebar navigation
- Padding generoso (2rem)
- Max-width containers

#### Typography
```tsx
<h1 className="text-5xl lg:text-6xl xl:text-7xl">
<p className="text-base lg:text-lg xl:text-xl">
```

#### Navegación
- Horizontal navbar completa
- Dropdown menus
- Mega menus para categorías

#### Components
- Cards con más espacio
- Tablas con todas las columnas
- Formularios multi-column

---

### 4. **Desktop (1440px+)**

#### Layout
- Max-width containers (1280px - 1536px)
- Wide grids (4-6 columnas)
- Generous whitespace
- Contenido centrado

#### Typography
```tsx
<h1 className="text-6xl xl:text-7xl 2xl:text-8xl">
```

#### Features Especiales
- Parallax effects
- Video backgrounds
- Animaciones complejas
- Sticky navigation

---

## 🎨 Componentes Responsive Actualizados

### Navigation Bar

```tsx
// Mobile: Hamburger menu
className="lg:hidden"

// Desktop: Full menu
className="hidden lg:flex"

// Logo adaptativo
{isMobile && breakpoint === 'xs' ? 'MDM E.I.R.L.' : 'Mis Dos Marías E.I.R.L.'}
```

### Hero Section

```tsx
// Altura adaptativa
className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:min-h-screen"

// Texto condicional
{isMobile 
  ? 'Texto corto para mobile' 
  : 'Texto completo para desktop'}

// Stats grid
className="grid grid-cols-1 xs:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
```

### Servicios Grid

```tsx
// 1 col mobile → 2 cols tablet → 4 cols desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"

// Iconos responsive
className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
```

### Footer

```tsx
// Grid adaptativo
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"

// Social icons
className="w-9 h-9 sm:w-10 sm:h-10"
```

---

## 🛠️ Hooks Personalizados

### useResponsive

```tsx
import { useResponsive } from './hooks/useResponsive';

function Component() {
  const { isMobile, isTablet, isLaptop, isDesktop, deviceType, breakpoint } = useResponsive();
  
  if (isMobile) {
    return <MobileLayout />;
  }
  
  if (isTablet) {
    return <TabletLayout />;
  }
  
  return <DesktopLayout />;
}
```

### useIsMobile / useIsTablet

```tsx
import { useIsMobile, useIsTablet } from './hooks/useResponsive';

const isMobile = useIsMobile();
const isTablet = useIsTablet();
```

### useBreakpoint

```tsx
import { useBreakpoint } from './hooks/useResponsive';

// Verifica si estamos en lg o mayor
const isLargeScreen = useBreakpoint('lg');
```

---

## 📏 Mejores Prácticas

### 1. **Mobile-First Approach**

```tsx
// ✅ CORRECTO - Mobile primero, luego desktop
className="text-sm md:text-base lg:text-lg"

// ❌ INCORRECTO - Desktop primero
className="text-lg md:text-sm"
```

### 2. **Touch Targets**

```tsx
// Mínimo 44px para elementos táctiles
className="min-h-[44px] min-w-[44px] p-2"
```

### 3. **Texto Legible**

```tsx
// Nunca menos de 14px en mobile
className="text-sm sm:text-base" // 14px → 16px
```

### 4. **Imágenes Optimizadas**

```tsx
<img 
  src={imageUrl}
  loading="lazy"
  className="w-full h-auto"
  alt="Descripción"
/>
```

### 5. **Espaciado Consistente**

```tsx
// Usar escala de spacing
className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
```

### 6. **Grids Flexibles**

```tsx
// Auto-fit para grids dinámicos
className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
```

---

## 🧪 Testing Responsive

### Dispositivos de Prueba

#### Mobile
- iPhone SE (375x667)
- iPhone 12/13/14 (390x844)
- iPhone 14 Pro Max (430x932)
- Samsung Galaxy S21 (360x800)
- Pixel 5 (393x851)

#### Tablet
- iPad (768x1024)
- iPad Air (820x1180)
- iPad Pro 11" (834x1194)
- Samsung Galaxy Tab (800x1280)

#### Laptop/Desktop
- MacBook Air (1280x800)
- MacBook Pro 13" (1440x900)
- MacBook Pro 16" (1728x1117)
- Desktop 1080p (1920x1080)
- Desktop 4K (2560x1440)

### Chrome DevTools

```
F12 → Toggle Device Toolbar
Responsive Mode: 320px → 2560px
```

### Breakpoint Debug

```tsx
// Componente para debugging
function BreakpointIndicator() {
  const { breakpoint, deviceType, width } = useResponsive();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
      {breakpoint} | {deviceType} | {width}px
    </div>
  );
}
```

---

## 🎯 Checklist de Responsive

### General
- [ ] Se ve bien en 320px (iPhone SE)
- [ ] Se ve bien en 768px (iPad)
- [ ] Se ve bien en 1024px (Laptop)
- [ ] Se ve bien en 1920px (Desktop)
- [ ] No hay scroll horizontal en ningún breakpoint
- [ ] Touch targets son mínimo 44x44px

### Navegación
- [ ] Menu hamburguesa funciona en mobile
- [ ] Menu desktop se muestra en lg+
- [ ] Logo se adapta en mobile pequeño
- [ ] Links son accesibles por teclado

### Tipografía
- [ ] Texto es legible en todos los tamaños
- [ ] Headings escalan apropiadamente
- [ ] Line-height es cómodo (1.5 - 1.7)
- [ ] Max-width en párrafos largos (65-75 caracteres)

### Imágenes
- [ ] Lazy loading activado
- [ ] Tamaños apropiados por breakpoint
- [ ] Alt text descriptivo
- [ ] No se pixelan en pantallas grandes

### Forms
- [ ] Inputs tienen tamaño táctil adecuado
- [ ] Labels siempre visibles
- [ ] Validación clara y visible
- [ ] Submit button grande en mobile

### Performance
- [ ] Lighthouse Mobile Score > 90
- [ ] Lighthouse Desktop Score > 95
- [ ] First Contentful Paint < 1.8s
- [ ] Cumulative Layout Shift < 0.1

---

## 🚀 Optimizaciones Adicionales

### Safe Areas (iPhone con notch)

```tsx
className="safe-top safe-bottom safe-left safe-right"
```

### Orientation Detection

```tsx
const isLandscape = window.matchMedia("(orientation: landscape)").matches;
```

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

### Prefers Reduced Motion

```tsx
import { prefersReducedMotion } from './utils/accessibility';

const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
```

---

## 📚 Recursos

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Responsive Design Checker](https://responsivedesignchecker.com/)

---

**Última actualización**: Octubre 2025  
**Versión**: 2.0.0  
**Compatibilidad**: Mobile, Tablet, Laptop, Desktop
