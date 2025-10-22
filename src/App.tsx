import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
import { NAVIGATION_SECTIONS, ACCESSIBILITY } from './utils/constants';
import { toggleBodyScroll, prefersReducedMotion } from './utils/accessibility';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Usar custom hook optimizado para scroll spy
  const sectionIds = NAVIGATION_SECTIONS.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds);

  // Controlar scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    toggleBodyScroll(mobileMenuOpen);
    return () => toggleBodyScroll(false);
  }, [mobileMenuOpen]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900">🚌</span>
              </div>
              <span className="text-white">Mis Dos Marías E.I.R.L.</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${
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
                className="text-sm text-gray-400 hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1"
                aria-label="Acceder al panel de administración"
              >
                Admin
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              aria-label={ACCESSIBILITY.ariaLabels.mobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800"
            role="menu"
          >
            <div className="px-4 py-4 space-y-3">
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-slate-900'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setShowAdmin(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded text-gray-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                role="menuitem"
                aria-label="Acceder al panel de administración"
              >
                Admin
              </button>
            </div>
          </motion.div>
        )}
      </nav>

        {/* Main Content */}
        <main id={ACCESSIBILITY.skipLinkId} className="pt-16">
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
