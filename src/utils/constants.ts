/**
 * Constantes centralizadas para mejor mantenibilidad
 */

export const COMPANY_INFO = {
  name: 'Mis Dos Marías E.I.R.L.',
  slogan: 'Tu viaje, nuestra pasión',
  description: 'Empresa líder en transporte de personal y turismo en Perú',
  address: {
    street: 'Av. Principal 123',
    district: 'Miraflores',
    city: 'Lima',
    country: 'Perú',
    postalCode: '15074',
  },
  contact: {
    phone: '(01) 234-5678',
    whatsapp: '+51 999 888 777',
    email: 'info@misdosmarias.com',
    reservations: 'reservas@misdosmarias.com',
  },
  social: {
    facebook: 'https://facebook.com/misdosmarias',
    instagram: 'https://instagram.com/misdosmarias',
    twitter: 'https://twitter.com/misdosmarias',
  },
  stats: {
    yearsOfExperience: 15,
    fleetSize: 50,
    satisfiedClients: 10000,
  },
} as const;

export const NAVIGATION_SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'flota', label: 'Flota' },
  { id: 'rutas', label: 'Rutas' },
  { id: 'reservar', label: 'Reservar' },
  { id: 'contacto', label: 'Contacto' },
] as const;

export const SERVICES = [
  {
    id: 'personal',
    name: 'Transporte de Personal',
    category: 'Corporativo',
  },
  {
    id: 'turismo',
    name: 'Turismo y Excursiones',
    category: 'Turístico',
  },
  {
    id: 'escolar',
    name: 'Transporte Escolar',
    category: 'Educativo',
  },
  {
    id: 'eventos',
    name: 'Eventos Especiales',
    category: 'Eventos',
  },
] as const;

export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  phoneStrict: /^\+?51\s?9\d{8}$/,
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
} as const;

export const STORAGE_KEYS = {
  reservations: 'reservations',
  adminToken: 'admin_token',
  userPreferences: 'user_preferences',
} as const;

export const API_CONFIG = {
  geminiModel: 'gemini-2.0-flash-preview-09-2025',
  requestTimeout: 30000,
  maxRetries: 3,
} as const;

export const ACCESSIBILITY = {
  skipLinkId: 'main-content',
  ariaLabels: {
    navigation: 'Navegación principal',
    mobileMenu: 'Menú móvil',
    closeButton: 'Cerrar',
    submitForm: 'Enviar formulario',
  },
} as const;

export const PERFORMANCE = {
  scrollDebounce: 50,
  imageLoadingDelay: 100,
  animationDuration: 300,
} as const;
