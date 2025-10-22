import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

export default function HeroSection() {
  const { isMobile, isTablet } = useResponsive();
  
  const scrollToReservar = () => {
    const element = document.getElementById('reservar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1759683730015-c16a96c65ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBidXMlMjB0cmFuc3BvcnR8ZW58MXx8fHwxNzYxMTAyNDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury Bus Transport"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          <motion.h1
            className="text-white mb-3 sm:mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isMobile ? 'Mis Dos Marías' : 'Mis Dos Marías E.I.R.L.'}
          </motion.h1>
          
          <motion.p
            className="text-yellow-400 mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Transporte de Personal y Turismo{isMobile ? '' : ' de Excelencia'}
          </motion.p>

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg lg:text-xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isMobile 
              ? 'Seguridad, confort y puntualidad garantizados.' 
              : 'Conectamos destinos con seguridad, confort y puntualidad. Su viaje perfecto comienza con nosotros.'}
          </motion.p>

          <motion.button
            onClick={scrollToReservar}
            className="bg-yellow-400 text-slate-900 px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-lg hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2 group text-sm sm:text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Reservar Ahora</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-2 sm:px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { number: '15+', label: isMobile ? 'Años' : 'Años de Experiencia' },
            { number: '50+', label: isMobile ? 'Vehículos' : 'Vehículos en Flota' },
            { number: '10K+', label: isMobile ? 'Clientes' : 'Clientes Satisfechos' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <div className="text-yellow-400 mb-1 sm:mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{stat.number}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
