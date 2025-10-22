import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook para detectar la sección activa durante el scroll
 * Implementa debounce para mejor performance
 */
export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset;
    
    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    // Debounced scroll handler para mejor performance
    let timeoutId: NodeJS.Timeout;
    
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    handleScroll(); // Llamada inicial
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return activeSection;
}
