import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Users, Calendar, MapPin, Trash2, Eye } from 'lucide-react';

interface Reservation {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number;
  comentarios: string;
}

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadReservations();
      
      // Simulate real-time updates (in production would use Firestore onSnapshot)
      const interval = setInterval(loadReservations, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadReservations = () => {
    const data = JSON.parse(localStorage.getItem('reservations') || '[]');
    setReservations(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta reserva?')) {
      const updated = reservations.filter(r => r.id !== id);
      localStorage.setItem('reservations', JSON.stringify(updated));
      setReservations(updated);
      setSelectedReservation(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-slate-900">Panel de Administración</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Contraseña de Acceso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese contraseña"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Iniciar Sesión
            </button>
            <p className="text-xs text-gray-500 text-center">
              Demo: use password "admin123"
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-50 overflow-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2>Panel de Administración</h2>
              <p className="text-blue-100 text-sm mt-1">Gestión de Reservas en Tiempo Real</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Reservas</p>
                  <p className="text-2xl mt-1">{reservations.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Pasajeros Totales</p>
                  <p className="text-2xl mt-1">
                    {reservations.reduce((sum, r) => sum + r.pasajeros, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Actualizaciones</p>
                  <p className="text-sm mt-1">En tiempo real</p>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay reservas registradas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reservations List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {reservations.map((reservation) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer ${
                      selectedReservation?.id === reservation.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                    onClick={() => setSelectedReservation(reservation)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-slate-900">{reservation.nombre}</h4>
                        <p className="text-sm text-gray-500">{reservation.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReservation(reservation);
                          }}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(reservation.id);
                          }}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-3 h-3 mr-1 text-blue-600" />
                        {reservation.origen}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-3 h-3 mr-1 text-green-600" />
                        {reservation.destino}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3 h-3 mr-1 text-purple-600" />
                        {new Date(reservation.fecha).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-3 h-3 mr-1 text-yellow-600" />
                        {reservation.pasajeros} pasajeros
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Reservation Details */}
              <div className="bg-slate-50 rounded-lg p-6 sticky top-4">
                {selectedReservation ? (
                  <div>
                    <h3 className="text-slate-900 mb-6">Detalles de la Reserva</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-500 uppercase">Cliente</label>
                        <p className="text-slate-900 mt-1">{selectedReservation.nombre}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Email</label>
                          <p className="text-slate-900 mt-1 text-sm">{selectedReservation.email}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Teléfono</label>
                          <p className="text-slate-900 mt-1 text-sm">{selectedReservation.telefono}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Origen</label>
                          <p className="text-slate-900 mt-1">{selectedReservation.origen}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Destino</label>
                          <p className="text-slate-900 mt-1">{selectedReservation.destino}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Fecha de Viaje</label>
                          <p className="text-slate-900 mt-1">
                            {new Date(selectedReservation.fecha).toLocaleDateString('es-PE', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Pasajeros</label>
                          <p className="text-slate-900 mt-1">{selectedReservation.pasajeros}</p>
                        </div>
                      </div>

                      {selectedReservation.comentarios && (
                        <div>
                          <label className="text-xs text-gray-500 uppercase">Comentarios</label>
                          <p className="text-slate-900 mt-1 text-sm bg-white p-3 rounded-lg border border-gray-200">
                            {selectedReservation.comentarios}
                          </p>
                        </div>
                      )}

                      <div className="pt-4 border-t space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Confirmar Reserva
                        </button>
                        <button
                          onClick={() => handleDelete(selectedReservation.id)}
                          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Eliminar Reserva
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Seleccione una reserva para ver los detalles</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
