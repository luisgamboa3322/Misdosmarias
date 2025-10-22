import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { announceToScreenReader } from '../utils/accessibility';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'from-green-500 to-emerald-600',
  error: 'from-red-500 to-red-600',
  warning: 'from-yellow-500 to-amber-600',
  info: 'from-blue-500 to-blue-600',
};

const bgColorMap = {
  success: 'bg-green-50',
  error: 'bg-red-50',
  warning: 'bg-yellow-50',
  info: 'bg-blue-50',
};

/**
 * Componente Toast para notificaciones al usuario
 * Implementa accesibilidad con ARIA live regions
 * 
 * @example
 * ```tsx
 * const [showToast, setShowToast] = useState(false);
 * 
 * <Toast
 *   message="Reserva guardada exitosamente"
 *   type="success"
 *   isVisible={showToast}
 *   onClose={() => setShowToast(false)}
 * />
 * ```
 */
export default function Toast({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  isVisible,
}: ToastProps) {
  const Icon = iconMap[type];

  useEffect(() => {
    if (isVisible) {
      // Anunciar a lectores de pantalla
      const priority = type === 'error' || type === 'warning' ? 'assertive' : 'polite';
      announceToScreenReader(message, priority);

      // Auto-close después del duration
      if (duration > 0) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, message, type, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] max-w-md w-full mx-4"
          role="alert"
          aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
          aria-atomic="true"
        >
          <div className={`${bgColorMap[type]} rounded-lg shadow-2xl border-2 border-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-200 overflow-hidden`}>
            <div className={`h-1 bg-gradient-to-r ${colorMap[type]}`}></div>
            
            <div className="p-4 flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${colorMap[type]} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 pt-1">
                <p className="text-slate-900">{message}</p>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Cerrar notificación"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook para gestionar toasts fácilmente
 * 
 * @example
 * ```tsx
 * const { showToast, ToastComponent } = useToast();
 * 
 * // Mostrar toast
 * showToast('Operación exitosa', 'success');
 * 
 * // Renderizar en el componente
 * return (
 *   <div>
 *     {ToastComponent}
 *     <button onClick={() => showToast('Hola!', 'info')}>
 *       Mostrar Toast
 *     </button>
 *   </div>
 * );
 * ```
 */
export function useToast() {
  const [toast, setToast] = React.useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const ToastComponent = (
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );

  return { showToast, hideToast, ToastComponent };
}

// Fix: Import React for the hook
import React from 'react';
