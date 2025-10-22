import { motion } from 'motion/react';
import { MapPin, Navigation, Route } from 'lucide-react';

export default function RutasSection() {
  const destinations = [
    { name: 'Lima', region: 'Costa', routes: 15 },
    { name: 'Cusco', region: 'Sierra', routes: 12 },
    { name: 'Arequipa', region: 'Sierra', routes: 10 },
    { name: 'Trujillo', region: 'Costa', routes: 8 },
    { name: 'Chiclayo', region: 'Costa', routes: 7 },
    { name: 'Iquitos', region: 'Selva', routes: 5 },
  ];

  return (
    <section id="rutas" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 mb-4">Rutas y Cobertura</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conectamos los principales destinos del Perú con servicios regulares y personalizados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Simulation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-8 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
              {/* Decorative Map Background */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <path
                    d="M 50 200 Q 150 100 250 200 T 450 200"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 200 50 Q 200 150 300 250 T 200 450"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <circle cx="100" cy="150" r="30" fill="white" opacity="0.3" />
                  <circle cx="250" cy="200" r="40" fill="white" opacity="0.3" />
                  <circle cx="300" cy="100" r="25" fill="white" opacity="0.3" />
                </svg>
              </div>

              <div className="text-center z-10">
                <Navigation className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-white mb-4">Cobertura Nacional</h3>
                <p className="text-gray-300 mb-6">
                  Operamos en más de 20 ciudades principales del Perú
                </p>
                <div className="flex items-center justify-center space-x-8">
                  <div>
                    <div className="text-yellow-400">50+</div>
                    <div className="text-gray-400 text-sm">Rutas Activas</div>
                  </div>
                  <div>
                    <div className="text-yellow-400">3</div>
                    <div className="text-gray-400 text-sm">Regiones</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Destinations List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {destinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-slate-900">{dest.name}</h4>
                        <p className="text-gray-500 text-sm">{dest.region}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Route className="w-5 h-5 text-yellow-600" />
                      <span className="text-gray-600">{dest.routes} rutas</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border-2 border-yellow-200"
            >
              <h4 className="text-slate-900 mb-2">¿No encuentra su destino?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Ofrecemos rutas personalizadas para cualquier destino en Perú. 
                Contáctenos para una cotización especial.
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('contacto');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Solicitar Ruta Personalizada
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
