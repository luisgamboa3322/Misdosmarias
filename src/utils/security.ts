/**
 * Utilidades de seguridad para sanitización y validación
 */

/**
 * Sanitiza HTML para prevenir XSS
 */
export function sanitizeHTML(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Sanitiza input de usuario eliminando caracteres peligrosos
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Valida email con regex robusto
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Valida teléfono peruano
 */
export function isValidPeruvianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return /^(\+?51)?9\d{8}$/.test(cleanPhone);
}

/**
 * Rate limiting simple para prevenir spam
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number = 5, timeWindowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  check(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Filtrar requests dentro de la ventana de tiempo
    const validRequests = userRequests.filter(time => now - time < this.timeWindow);
    
    if (validRequests.length >= this.maxRequests) {
      return false; // Rate limit excedido
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

export const formRateLimiter = new RateLimiter(3, 60000); // 3 requests por minuto

/**
 * Valida longitud de string
 */
export function isValidLength(str: string, min: number = 1, max: number = 1000): boolean {
  return str.length >= min && str.length <= max;
}

/**
 * Escapa caracteres especiales para prevenir inyección SQL
 * (aunque no usamos SQL directamente, es una buena práctica)
 */
export function escapeSQL(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/\0/g, '\\0');
}

/**
 * Valida formato de fecha
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date > new Date();
}

/**
 * Genera hash simple para verificación de integridad
 */
export async function simpleHash(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
