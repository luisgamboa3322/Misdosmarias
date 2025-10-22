import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

/**
 * Componente SEO para gestionar meta tags y optimización para motores de búsqueda
 * Implementa Open Graph, Twitter Cards y Structured Data
 */
export default function SEO({
  title = 'Mis Dos Marías E.I.R.L. - Transporte de Personal y Turismo',
  description = 'Empresa líder en transporte de personal y turismo en Perú. Servicios de calidad con seguridad, puntualidad y confort garantizados. Más de 15 años de experiencia.',
  keywords = 'transporte, turismo, peru, transporte de personal, buses, excursiones, viajes, seguridad',
  ogImage = 'https://images.unsplash.com/photo-1759683730015-c16a96c65ae9',
  ogType = 'website',
  canonicalUrl = 'https://misdosmarias.com',
}: SEOProps) {
  useEffect(() => {
    // Actualizar título
    document.title = title;

    // Función helper para actualizar o crear meta tags
    const updateMetaTag = (selector: string, content: string, attribute: string = 'content') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attr, value] = selector.replace(/[\[\]]/g, '').split('=');
        element.setAttribute(attr, value.replace(/['"]/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Meta tags básicos
    updateMetaTag('[name="description"]', description);
    updateMetaTag('[name="keywords"]', keywords);
    
    // Open Graph
    updateMetaTag('[property="og:title"]', title);
    updateMetaTag('[property="og:description"]', description);
    updateMetaTag('[property="og:image"]', ogImage);
    updateMetaTag('[property="og:type"]', ogType);
    updateMetaTag('[property="og:url"]', canonicalUrl);
    updateMetaTag('[property="og:locale"]', 'es_PE');
    
    // Twitter Card
    updateMetaTag('[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('[name="twitter:title"]', title);
    updateMetaTag('[name="twitter:description"]', description);
    updateMetaTag('[name="twitter:image"]', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Structured Data (JSON-LD) para SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Mis Dos Marías E.I.R.L.',
      description: description,
      image: ogImage,
      '@id': canonicalUrl,
      url: canonicalUrl,
      telephone: '+51-999-888-777',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Principal 123',
        addressLocality: 'Miraflores',
        addressRegion: 'Lima',
        postalCode: '15074',
        addressCountry: 'PE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -12.1191,
        longitude: -77.0350,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '250',
      },
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null; // Este componente no renderiza nada visualmente
}
