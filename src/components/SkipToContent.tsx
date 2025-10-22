/**
 * Componente de accesibilidad para permitir a usuarios de teclado
 * saltar directamente al contenido principal
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-yellow-400 focus:text-slate-900 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
    >
      Saltar al contenido principal
    </a>
  );
}
