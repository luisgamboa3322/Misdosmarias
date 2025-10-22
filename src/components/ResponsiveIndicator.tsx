import { useResponsive } from '../hooks/useResponsive';
import { Smartphone, Tablet, Laptop, Monitor } from 'lucide-react';

/**
 * Componente de desarrollo para visualizar el breakpoint actual
 * Solo se muestra en modo desarrollo
 * 
 * @example
 * ```tsx
 * // En App.tsx (solo para desarrollo)
 * {process.env.NODE_ENV === 'development' && <ResponsiveIndicator />}
 * ```
 */
export default function ResponsiveIndicator() {
  const { breakpoint, deviceType, width, height, isMobile, isTablet, isLaptop, isDesktop } = useResponsive();

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getIcon = () => {
    if (isMobile) return <Smartphone className="w-4 h-4" />;
    if (isTablet) return <Tablet className="w-4 h-4" />;
    if (isLaptop) return <Laptop className="w-4 h-4" />;
    if (isDesktop) return <Monitor className="w-4 h-4" />;
    return null;
  };

  const getColor = () => {
    if (isMobile) return 'bg-blue-500';
    if (isTablet) return 'bg-green-500';
    if (isLaptop) return 'bg-purple-500';
    if (isDesktop) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
      <div className={`${getColor()} text-white px-4 py-3 rounded-lg shadow-2xl border-2 border-white/20 backdrop-blur-sm`}>
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div className="text-xs space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold uppercase">{breakpoint}</span>
              <span>•</span>
              <span className="capitalize">{deviceType}</span>
            </div>
            <div className="opacity-80">
              {width}px × {height}px
            </div>
          </div>
        </div>
      </div>
      
      {/* Breakpoint Legend */}
      <div className="mt-2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs space-y-0.5">
        <div className="font-bold mb-1">Breakpoints:</div>
        <div className={breakpoint === 'xs' ? 'text-blue-400 font-bold' : 'opacity-60'}>xs: 0-479px</div>
        <div className={breakpoint === 'sm' ? 'text-blue-400 font-bold' : 'opacity-60'}>sm: 480-639px</div>
        <div className={breakpoint === 'md' ? 'text-blue-400 font-bold' : 'opacity-60'}>md: 640-767px</div>
        <div className={breakpoint === 'lg' ? 'text-green-400 font-bold' : 'opacity-60'}>lg: 768-1023px</div>
        <div className={breakpoint === 'xl' ? 'text-purple-400 font-bold' : 'opacity-60'}>xl: 1024-1279px</div>
        <div className={breakpoint === '2xl' ? 'text-orange-400 font-bold' : 'opacity-60'}>2xl: 1280+px</div>
      </div>
    </div>
  );
}
