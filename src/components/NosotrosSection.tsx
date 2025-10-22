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
    <section id="nosotros" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-slate-900 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Sobre Nosotros</h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400 mx-auto mb-4 sm:mb-5 md:mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-4">
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
          className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-white"
        >
          <h3 className="text-yellow-400 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl">Nuestra Historia</h3>
          <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg">
            Fundada con la visión de transformar el transporte en Perú, Mis Dos Marías nació del sueño 
            de dos hermanas emprendedoras que buscaban ofrecer un servicio diferente: seguro, puntual y centrado 
            en las necesidades del cliente. Hoy, somos líderes en transporte de personal y turismo, 
            sirviendo a empresas, familias y viajeros de todo el país.
          </p>
          <div className="mt-4 sm:mt-5 md:mt-6 inline-block bg-yellow-400 text-slate-900 px-4 sm:px-5 md:px-6 py-2 rounded-lg text-sm sm:text-base">
            "Tu viaje, nuestra pasión"
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-4 sm:p-5 md:p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <value.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-slate-900 mb-2 sm:mb-3 text-base sm:text-lg">{value.title}</h4>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
