import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-lg">🚌</span>
              </div>
              <span className="text-base sm:text-lg md:text-xl">Mis Dos Marías</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Empresa líder en transporte de personal y turismo en Perú, 
              comprometidos con la excelencia y seguridad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Enlaces Rápidos</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {['Inicio', 'Nosotros', 'Servicios', 'Flota', 'Rutas', 'Contacto'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-xs sm:text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Servicios</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <li>Transporte de Personal</li>
              <li>Turismo y Excursiones</li>
              <li>Transporte Escolar</li>
              <li>Eventos Especiales</li>
              <li>Rutas Personalizadas</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Contacto</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Av. Principal 123, Miraflores, Lima</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">(01) 234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">info@misdosmarias.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
              <span>🇵🇪</span>
              <span>Orgullosamente Peruanos</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-xs sm:text-sm text-gray-400">
            <p className="text-center sm:text-left">
              © {currentYear} Mis Dos Marías E.I.R.L. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
              <button className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                Política de Privacidad
              </button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                Términos y Condiciones
              </button>
            </div>
          </div>
        </div>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 sm:mt-6 text-center safe-bottom"
        >
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-700/30">
            <span className="text-xs sm:text-sm text-purple-300">✨ Potenciado con IA Gemini</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
