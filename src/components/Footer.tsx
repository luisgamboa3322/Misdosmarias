import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900">🚌</span>
              </div>
              <span className="text-lg">Mis Dos Marías</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empresa líder en transporte de personal y turismo en Perú, 
              comprometidos con la excelencia y seguridad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Inicio', 'Nosotros', 'Servicios', 'Flota', 'Rutas', 'Contacto'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Transporte de Personal</li>
              <li>Turismo y Excursiones</li>
              <li>Transporte Escolar</li>
              <li>Eventos Especiales</li>
              <li>Rutas Personalizadas</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Av. Principal 123, Miraflores, Lima</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">(01) 234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">info@misdosmarias.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>🇵🇪</span>
              <span>Orgullosamente Peruanos</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-gray-400">
            <p>
              © {currentYear} Mis Dos Marías E.I.R.L. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <button className="hover:text-yellow-400 transition-colors">
                Política de Privacidad
              </button>
              <span>|</span>
              <button className="hover:text-yellow-400 transition-colors">
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
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-4 py-2 rounded-full border border-purple-700/30">
            <span className="text-xs text-purple-300">✨ Potenciado con IA Gemini</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
