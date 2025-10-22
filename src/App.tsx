import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import HeroSection from './components/HeroSection';
import NosotrosSection from './components/NosotrosSection';
import ServiciosSection from './components/ServiciosSection';
import FlotaSection from './components/FlotaSection';
import RutasSection from './components/RutasSection';
import ReservarSection from './components/ReservarSection';
import ContactoSection from './components/ContactoSection';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import SEO from './components/SEO';
import SkipToContent from './components/SkipToContent';
import ErrorBoundary from './components/ErrorBoundary';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useResponsive } from './hooks/useResponsive';
import { NAVIGATION_SECTIONS, ACCESSIBILITY } from './utils/constants';
import { toggleBodyScroll, prefersReducedMotion } from './utils/accessibility';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Detectar tipo de dispositivo
  const { isMobile, isTablet, deviceType, breakpoint } = useResponsive();
  
  // Usar custom hook optimizado para scroll spy
  const sectionIds = NAVIGATION_SECTIONS.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds);

  // Controlar scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    toggleBodyScroll(mobileMenuOpen);
    return () => toggleBodyScroll(false);
  }, [mobileMenuOpen]);
  
  // Cerrar menú móvil automáticamente en tablets y desktop
  useEffect(() => {
    if (!isMobile && !isTablet && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, isTablet, mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Respetar preferencias de movimiento reducido
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
      element.scrollIntoView({ behavior });
      setMobileMenuOpen(false);
    }
  };

  if (showAdmin) {
    return (
      <ErrorBoundary>
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SEO />
      <SkipToContent />
      <div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav 
          className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 shadow-lg"
          role="navigation"
          aria-label={ACCESSIBILITY.ariaLabels.navigation}
        >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-16 lg:h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl lg:text-2xl">🚌</span>
              </div>
              <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none">
                {isMobile && breakpoint === 'xs' ? 'MDM E.I.R.L.' : 'Mis Dos Marías E.I.R.L.'}
              </span>
            </motion.div>

            {/* Desktop/Tablet Menu */}
            <div className="hidden lg:flex space-x-4 xl:space-x-6 2xl:space-x-8">
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-xs xl:text-sm 2xl:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${
                    activeSection === section.id
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={() => setShowAdmin(true)}
                className="text-xs xl:text-sm 2xl:text-base text-gray-400 hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1"
                aria-label="Acceder al panel de administración"
              >
                Admin
              </button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-1.5 sm:p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              aria-label={ACCESSIBILITY.ariaLabels.mobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-slate-800 border-t border-slate-700"
              role="menu"
            >
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {NAVIGATION_SECTIONS.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      activeSection === section.id
                        ? 'bg-yellow-400 text-slate-900 shadow-lg'
                        : 'text-gray-300 hover:bg-slate-700 active:bg-slate-600'
                    }`}
                    role="menuitem"
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    {section.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAVIGATION_SECTIONS.length * 0.05 }}
                  onClick={() => {
                    setShowAdmin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-gray-400 hover:bg-slate-700 active:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-t border-slate-700 mt-2 pt-4"
                  role="menuitem"
                  aria-label="Acceder al panel de administración"
                >
                  Panel Admin
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

        {/* Main Content */}
        <main id={ACCESSIBILITY.skipLinkId} className="pt-14 sm:pt-16 lg:pt-20">
          <HeroSection />
          <NosotrosSection />
          <ServiciosSection />
          <FlotaSection />
          <RutasSection />
          <ReservarSection />
          <ContactoSection />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
