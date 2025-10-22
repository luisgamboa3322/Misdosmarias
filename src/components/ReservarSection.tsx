import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Loader2, MapPin, Clock, DollarSign, Calendar, Users, MessageSquare } from 'lucide-react';

// AI FEATURE 1: Requirements Generator
async function generateRequirements(origen: string, destino: string, pasajeros: number): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `Solicito cotización para servicio de transporte desde ${origen} hacia ${destino} para ${pasajeros} pasajero(s). Requiero un servicio profesional que garantice puntualidad, comodidad y seguridad durante todo el trayecto. Agradeceré incluir en la cotización los detalles del vehículo asignado, horarios disponibles y condiciones del servicio. Quedo atento a su respuesta. Saludos cordiales.`;
}

// AI FEATURE 3: Tourist Planner
async function generateTouristRecommendations(destino: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const recommendations: Record<string, string> = {
    'Cusco': '🏛️ Plaza de Armas: Centro histórico con arquitectura colonial. 🏔️ Machu Picchu: Ciudadela inca imperdible (tour de día completo). 🍴 Mercado San Pedro: Experiencia gastronómica local auténtica.',
    'Arequipa': '⛪ Monasterio de Santa Catalina: Ciudadela religiosa colonial. 🏔️ Cañón del Colca: Observación de cóndores andinos. 🍽️ Picanterías tradicionales: Prueba el rocoto relleno.',
    'Lima': '🏛️ Centro Histórico: Plaza Mayor y Catedral. 🌊 Miraflores: Malecón con vista al Pacífico. 🍴 Circuito gastronómico: Restaurantes de cocina peruana.',
  };
  
  return recommendations[destino] || `📍 Puntos de interés locales en ${destino}. 🎯 Actividades culturales y turísticas. 🍴 Gastronomía regional típica.`;
}

// AI FEATURE 4: Route Estimator (JSON Schema)
interface RouteEstimate {
  distanciaKm: number;
  tiempoEstimadoHrs: number;
  tarifaBase: number;
}

async function estimateRoute(origen: string, destino: string): Promise<RouteEstimate> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock route calculations - In production would use actual Gemini API with grounding
  const routes: Record<string, RouteEstimate> = {
    'Lima-Cusco': { distanciaKm: 1100, tiempoEstimadoHrs: 20, tarifaBase: 450 },
    'Lima-Arequipa': { distanciaKm: 1010, tiempoEstimadoHrs: 16, tarifaBase: 420 },
    'Cusco-Arequipa': { distanciaKm: 520, tiempoEstimadoHrs: 10, tarifaBase: 280 },
    'Lima-Trujillo': { distanciaKm: 560, tiempoEstimadoHrs: 9, tarifaBase: 300 },
  };
  
  const key = `${origen}-${destino}`;
  return routes[key] || { distanciaKm: 300, tiempoEstimadoHrs: 6, tarifaBase: 200 };
}

export default function ReservarSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: 1,
    comentarios: '',
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [routeEstimate, setRouteEstimate] = useState<RouteEstimate | null>(null);
  const [touristRecommendations, setTouristRecommendations] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleGenerateRequirements = async () => {
    if (!formData.origen || !formData.destino) {
      alert('Por favor ingrese origen y destino primero');
      return;
    }
    
    setAiLoading('requirements');
    const requirements = await generateRequirements(
      formData.origen,
      formData.destino,
      formData.pasajeros
    );
    setFormData({ ...formData, comentarios: requirements });
    setAiLoading(null);
  };

  const handleEstimateRoute = async () => {
    if (!formData.origen || !formData.destino) {
      alert('Por favor ingrese origen y destino primero');
      return;
    }
    
    setAiLoading('route');
    const estimate = await estimateRoute(formData.origen, formData.destino);
    setRouteEstimate(estimate);
    setAiLoading(null);
  };

  const handleGetTouristInfo = async () => {
    if (!formData.destino) {
      alert('Por favor ingrese un destino primero');
      return;
    }
    
    setAiLoading('tourist');
    const recommendations = await generateTouristRecommendations(formData.destino);
    setTouristRecommendations(recommendations);
    setAiLoading(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate saving to database
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage (simulating Firestore)
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const newReservation = {
      id: Date.now().toString(),
      ...formData,
      fecha: new Date().toISOString(),
    };
    reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    setLoading(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        origen: '',
        destino: '',
        fecha: '',
        pasajeros: 1,
        comentarios: '',
      });
      setRouteEstimate(null);
      setTouristRecommendations('');
    }, 3000);
  };

  return (
    <section id="reservar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 mb-4">Reservar Servicio</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete el formulario y reciba una cotización personalizada con asistencia de IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="juan@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+51 999 999 999"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Número de Pasajeros *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.pasajeros}
                    onChange={(e) => setFormData({ ...formData, pasajeros: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Origen *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.origen}
                    onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Lima"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Destino *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destino}
                    onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cusco"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Fecha del Viaje *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* AI Feature 1: Requirements Generator */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-gray-700">
                    <MessageSquare className="inline w-4 h-4 mr-1" />
                    Comentarios Adicionales
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRequirements}
                    disabled={aiLoading === 'requirements'}
                    className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-1 disabled:opacity-50"
                  >
                    {aiLoading === 'requirements' ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Generando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>Generar con IA</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={formData.comentarios}
                  onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detalles adicionales sobre su viaje..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : submitted ? (
                  <>
                    <span>✓ Reserva Recibida!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Solicitud</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* AI Assistants Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* AI Feature 4: Route Estimator */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h4 className="text-slate-900 text-sm">Estimador de Ruta IA</h4>
              </div>
              <button
                onClick={handleEstimateRoute}
                disabled={aiLoading === 'route'}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all text-sm flex items-center justify-center space-x-2 disabled:opacity-50 mb-4"
              >
                {aiLoading === 'route' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calculando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calcular Ruta</span>
                  </>
                )}
              </button>

              {routeEstimate && (
                <div className="space-y-3 bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Distancia:</span>
                    <span className="text-slate-900">{routeEstimate.distanciaKm} km</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      <Clock className="inline w-3 h-3 mr-1" />
                      Tiempo:
                    </span>
                    <span className="text-slate-900">{routeEstimate.tiempoEstimadoHrs} hrs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <span className="text-gray-600">
                      <DollarSign className="inline w-3 h-3 mr-1" />
                      Tarifa Base:
                    </span>
                    <span className="text-blue-600">S/ {routeEstimate.tarifaBase}</span>
                  </div>
                </div>
              )}
            </div>

            {/* AI Feature 3: Tourist Planner */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border-2 border-yellow-200">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <h4 className="text-slate-900 text-sm">Planificador Turístico IA</h4>
              </div>
              <button
                onClick={handleGetTouristInfo}
                disabled={aiLoading === 'tourist'}
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-all text-sm flex items-center justify-center space-x-2 disabled:opacity-50 mb-4"
              >
                {aiLoading === 'tourist' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>Ver Destinos</span>
                  </>
                )}
              </button>

              {touristRecommendations && (
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                  {touristRecommendations}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
