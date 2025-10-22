import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactoSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      details: ['Av. Principal 123, Miraflores', 'Lima, Perú'],
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: Phone,
      title: 'Teléfonos',
      details: ['(01) 234-5678', 'WhatsApp: +51 999 888 777'],
      color: 'from-green-600 to-emerald-700',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@misdosmarias.com', 'reservas@misdosmarias.com'],
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Clock,
      title: 'Horario',
      details: ['Lun - Vie: 8:00 AM - 6:00 PM', 'Sáb: 9:00 AM - 2:00 PM'],
      color: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 mb-4">Contáctanos</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contacta con nosotros por cualquier medio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-slate-900 mb-2">{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl overflow-hidden">
              {/* Map Placeholder */}
              <div className="w-full h-full flex items-center justify-center text-white p-8">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="mb-2">Encuéntranos</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Av. Principal 123, Miraflores<br />
                    Lima, Perú
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-400 text-slate-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              {/* Decorative Grid */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <a
            href="tel:+51999888777"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5" />
            <span>Llamar Ahora</span>
          </a>

          <a
            href="https://wa.me/51999888777"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          <a
            href="mailto:info@misdosmarias.com"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5" />
            <span>Enviar Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
