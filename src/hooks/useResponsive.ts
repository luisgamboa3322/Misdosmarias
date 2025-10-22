import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  breakpoint: Breakpoint;
  width: number;
  height: number;
}

/**
 * Custom hook para detección responsive mejorada
 * 
 * Breakpoints:
 * - Mobile: 0-767px (xs, sm, md)
 * - Tablet: 768-1023px
 * - Laptop: 1024-1439px (lg, xl)
 * - Desktop: 1440px+ (2xl)
 * 
 * @example
 * ```tsx
 * const { isMobile, isTablet, deviceType, breakpoint } = useResponsive();
 * 
 * if (isMobile) {
 *   return <MobileLayout />;
 * }
 * ```
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    // Initial state basado en window (si está disponible)
    if (typeof window !== 'undefined') {
      return getResponsiveState(window.innerWidth, window.innerHeight);
    }
    
    // Fallback para SSR
    return {
      isMobile: false,
      isTablet: false,
      isLaptop: true,
      isDesktop: false,
      deviceType: 'laptop' as DeviceType,
      breakpoint: 'lg' as Breakpoint,
      width: 1024,
      height: 768,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setState(getResponsiveState(window.innerWidth, window.innerHeight));
    };

    // Debounced resize handler para mejor performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Initial call
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}

/**
 * Calcula el estado responsive basado en ancho y alto
 */
function getResponsiveState(width: number, height: number): ResponsiveState {
  let deviceType: DeviceType;
  let breakpoint: Breakpoint;
  let isMobile = false;
  let isTablet = false;
  let isLaptop = false;
  let isDesktop = false;

  // Determinar breakpoint
  if (width < 480) {
    breakpoint = 'xs';
  } else if (width < 640) {
    breakpoint = 'sm';
  } else if (width < 768) {
    breakpoint = 'md';
  } else if (width < 1024) {
    breakpoint = 'lg';
  } else if (width < 1280) {
    breakpoint = 'xl';
  } else {
    breakpoint = '2xl';
  }

  // Determinar tipo de dispositivo
  if (width < 768) {
    deviceType = 'mobile';
    isMobile = true;
  } else if (width < 1024) {
    deviceType = 'tablet';
    isTablet = true;
  } else if (width < 1440) {
    deviceType = 'laptop';
    isLaptop = true;
  } else {
    deviceType = 'desktop';
    isDesktop = true;
  }

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    deviceType,
    breakpoint,
    width,
    height,
  };
}

/**
 * Hook simple para verificar si estamos en mobile
 */
export function useIsMobile(): boolean {
  const { isMobile } = useResponsive();
  return isMobile;
}

/**
 * Hook simple para verificar si estamos en tablet
 */
export function useIsTablet(): boolean {
  const { isTablet } = useResponsive();
  return isTablet;
}

/**
 * Hook para verificar si estamos en un breakpoint específico o mayor
 */
export function useBreakpoint(minBreakpoint: Breakpoint): boolean {
  const { width } = useResponsive();
  
  const breakpoints = {
    xs: 0,
    sm: 480,
    md: 640,
    lg: 768,
    xl: 1024,
    '2xl': 1440,
  };

  return width >= breakpoints[minBreakpoint];
}
