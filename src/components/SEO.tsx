import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
}

const SEO: React.FC<SEOProps> = ({
  title = 'Ember & Bloom — Specialty Coffee',
  description = 'Discover our curated selection of specialty coffees sourced from the world\'s finest growing regions.',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  price,
  currency = 'USD',
  availability = 'in stock'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', 'specialty coffee, single origin, coffee beans, arabica, espresso, pour over');
    updateMeta('author', 'Ember & Bloom');

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', url, true);
    updateMeta('og:type', type, true);
    updateMeta('og:site_name', 'Ember & Bloom', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Structured Data (JSON-LD)
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': type === 'product' ? 'Product' : 'WebSite',
      name: 'Ember & Bloom',
      description,
      url,
      image,
    };

    if (type === 'product' && price) {
      structuredData.offers = {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: `https://schema.org/${availability === 'in stock' ? 'InStock' : 'OutOfStock'}`,
      };
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) script.remove();
    };
  }, [title, description, image, url, type, price, currency, availability]);

  return null;
};

export default SEO;
