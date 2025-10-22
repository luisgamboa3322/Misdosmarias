import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Luggage, Sparkles, Car, Bus, ChevronRight } from 'lucide-react';

// AI FEATURE 2: Fleet Advisor
// Recommends the most suitable vehicle based on passengers and luggage
function getFleetRecommendation(passengers: number, luggage: string): {
  vehicle: string;
  reason: string;
  icon: any;
} {
  // Simulate AI analysis
  if (passengers <= 4 && luggage === 'ligero') {
    return {
      vehicle: 'Sedán Ejecutivo',
      reason: 'Ideal para grupos pequeños con equipaje ligero. Viaje elegante y eficiente.',
      icon: Car,
    };
  } else if (passengers <= 4 && luggage !== 'ligero') {
    return {
      vehicle: 'Minivan Premium',
      reason: 'Perfecto para grupos pequeños con equipaje considerable. Mayor capacidad de carga.',
      icon: Bus,
    };
  } else if (passengers <= 15) {
    return {
      vehicle: 'Minivan Premium',
      reason: 'Óptimo para grupos medianos. Combina comodidad con espacio suficiente.',
      icon: Bus,
    };
  } else {
    return {
      vehicle: 'Bus Turístico',
      reason: 'La mejor opción para grupos grandes. Máximo confort en viajes largos.',
      icon: Bus,
    };
  }
}

export default function FlotaSection() {
  const [passengerCount, setPassengerCount] = useState(4);
  const [luggageType, setLuggageType] = useState('ligero');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof getFleetRecommendation> | null>(null);

  const vehicles = [
    {
      name: 'Sedán Ejecutivo',
      capacity: '1-4 pasajeros',
      features: ['Aire acondicionado', 'Asientos de cuero', 'Wifi', 'USB'],
      image: 'https://images.unsplash.com/photo-1712728699256-2504d1d71ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcml2ZXJ8ZW58MXx8fHwxNzYxMDE4NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-blue-600 to-blue-700',
    },
    {
      name: 'Minivan Premium',
      capacity: '5-15 pasajeros',
      features: ['Amplio espacio', 'Climatizador', 'TV/DVD', 'Portaequipajes'],
      image: 'https://images.unsplash.com/photo-1571518992799-b44151a45261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pdmFuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTAyNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      name: 'Bus Turístico',
      capacity: '16-50 pasajeros',
      features: ['Asientos reclinables', 'Baño', 'Pantallas', 'Aire acondicionado'],
      image: 'https://images.unsplash.com/photo-1759683730015-c16a96c65ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBidXMlMjB0cmFuc3BvcnR8ZW58MXx8fHwxNzYxMTAyNDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-green-600 to-emerald-700',
    },
  ];

  const handleGetRecommendation = () => {
    const rec = getFleetRecommendation(passengerCount, luggageType);
    setRecommendation(rec);
    setShowRecommendation(true);
  };

  return (
    <section id="flota" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 mb-4">Nuestra Flota</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vehículos modernos y bien mantenidos para garantizar su comodidad y seguridad
          </p>
        </motion.div>

        {/* AI Fleet Advisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12 border-2 border-purple-200"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h3 className="text-slate-900">Asesor de Flota IA</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Número de Pasajeros
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <Luggage className="inline w-4 h-4 mr-1" />
                Tipo de Equipaje
              </label>
              <select
                value={luggageType}
                onChange={(e) => setLuggageType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="ligero">Ligero (bolsos pequeños)</option>
                <option value="medio">Medio (maletas)</option>
                <option value="pesado">Pesado (equipaje grande)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGetRecommendation}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Obtener Recomendación</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showRecommendation && recommendation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-lg p-6 border-2 border-purple-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-lg">
                    <recommendation.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-900 mb-2">Recomendación: {recommendation.vehicle}</h4>
                    <p className="text-gray-600 text-sm">{recommendation.reason}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${vehicle.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              </div>

              <div className="p-6">
                <h4 className="text-slate-900 mb-2">{vehicle.name}</h4>
                <p className="text-yellow-600 mb-4">{vehicle.capacity}</p>
                
                <div className="space-y-2">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-blue-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
