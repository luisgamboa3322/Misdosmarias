import { motion } from 'motion/react';
import { Shield, Clock, Heart, Award } from 'lucide-react';

export default function NosotrosSection() {
  const values = [
    {
      icon: Shield,
      title: 'Seguridad',
      description: 'Vehículos certificados y conductores profesionales capacitados para garantizar su bienestar.',
    },
    {
      icon: Clock,
      title: 'Puntualidad',
      description: 'Cumplimos con los horarios establecidos para que llegue siempre a tiempo a su destino.',
    },
    {
      icon: Heart,
      title: 'Confort',
      description: 'Unidades modernas y cómodas equipadas con las mejores comodidades para su viaje.',
    },
    {
      icon: Award,
      title: 'Excelencia',
      description: 'Servicio de calidad respaldado por años de experiencia y clientes satisfechos.',
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 mb-4">Sobre Nosotros</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            En <strong>Mis Dos Marías E.I.R.L.</strong>, somos una empresa familiar con más de 15 años 
            de experiencia en el transporte de personal y turismo. Nos enorgullece conectar personas 
            con sus destinos, ofreciendo servicios confiables y de calidad superior.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 md:p-12 mb-16 text-white"
        >
          <h3 className="text-yellow-400 mb-4">Nuestra Historia</h3>
          <p className="text-gray-200 leading-relaxed">
            Fundada con la visión de transformar el transporte en Perú, Mis Dos Marías nació del sueño 
            de dos hermanas emprendedoras que buscaban ofrecer un servicio diferente: seguro, puntual y centrado 
            en las necesidades del cliente. Hoy, somos líderes en transporte de personal y turismo, 
            sirviendo a empresas, familias y viajeros de todo el país.
          </p>
          <div className="mt-6 inline-block bg-yellow-400 text-slate-900 px-6 py-2 rounded-lg">
            "Tu viaje, nuestra pasión"
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-slate-900 mb-3">{value.title}</h4>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
