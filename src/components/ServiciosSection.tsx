import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Palmtree, School, PartyPopper, Sparkles, Loader2 } from 'lucide-react';

// AI FEATURE 5: Service Description Generator
// Simulates Gemini API call to generate unique, persuasive descriptions for each service
async function generateServiceDescription(serviceName: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  // Mock Gemini API responses - In production, would call actual Gemini API
  const descriptions: Record<string, string> = {
    'Transporte de Personal': 'Soluciones corporativas eficientes para movilizar a su equipo con puntualidad y seguridad garantizadas. Optimice la productividad de su empresa con nuestro servicio premium.',
    'Turismo y Excursiones': 'Descubra destinos increíbles con comodidad y guías expertos. Experiencias memorables diseñadas para explorar lo mejor de cada región con total tranquilidad.',
    'Transporte Escolar': 'Servicio seguro y confiable para el traslado diario de estudiantes. Conductores certificados y unidades equipadas con sistemas de seguridad de última generación.',
    'Eventos Especiales': 'Movilización impecable para bodas, conferencias y celebraciones. Coordinación perfecta que garantiza la llegada puntual de todos sus invitados con elegancia.',
  };
  
  return descriptions[serviceName] || 'Servicio de transporte profesional adaptado a sus necesidades.';
}

export default function ServiciosSection() {
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const services = [
    {
      id: 'personal',
      name: 'Transporte de Personal',
      icon: Briefcase,
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 'turismo',
      name: 'Turismo y Excursiones',
      icon: Palmtree,
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'escolar',
      name: 'Transporte Escolar',
      icon: School,
      color: 'from-green-600 to-emerald-700',
    },
    {
      id: 'eventos',
      name: 'Eventos Especiales',
      icon: PartyPopper,
      color: 'from-purple-600 to-pink-600',
    },
  ];

  useEffect(() => {
    // Load AI-generated descriptions asynchronously
    const loadDescriptions = async () => {
      setLoading(true);
      const newDescriptions: Record<string, string> = {};
      
      // Generate descriptions for all services
      for (const service of services) {
        const description = await generateServiceDescription(service.name);
        newDescriptions[service.id] = description;
      }
      
      setDescriptions(newDescriptions);
      setLoading(false);
    };

    loadDescriptions();
  }, []);

  return (
    <section id="servicios" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h2 className="text-slate-900">Nuestros Servicios</h2>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones de transporte adaptadas a cada necesidad, 
            con tecnología de punta y atención personalizada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              
              <div className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-slate-900 mb-3">{service.name}</h4>
                
                {loading ? (
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generando descripción AI...</span>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {descriptions[service.id]}
                  </p>
                )}
              </div>

              <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
            </motion.div>
          ))}
        </div>

        {/* AI Feature Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700">Descripciones generadas con IA Gemini</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
