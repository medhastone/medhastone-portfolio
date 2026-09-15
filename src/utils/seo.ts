/**
 * SEO & Canonical Management Utility for Single Page Application
 * Updates document.title, canonical link, meta description, and OpenGraph tags in real-time
 */

export interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  keywords?: string;
}

export function updatePageSeo(config: SeoConfig): void {
  try {
    // 1. Update Title
    document.title = config.title;

    // 2. Update or create Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', config.canonicalUrl);

    // 3. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', config.description);

    // 4. Update Meta Keywords if provided
    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', config.keywords);
    }

    // 5. Open Graph Meta Tags
    const ogTags: Record<string, string> = {
      'og:title': config.title,
      'og:description': config.description,
      'og:url': config.canonicalUrl,
      'og:image': config.ogImage || 'https://zentova.in/medi.jpg',
      'twitter:title': config.title,
      'twitter:description': config.description,
      'twitter:image': config.ogImage || 'https://zentova.in/medi.jpg'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      const isTwitter = property.startsWith('twitter:');
      const selector = isTwitter ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (isTwitter) {
          metaTag.setAttribute('name', property);
        } else {
          metaTag.setAttribute('property', property);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
  } catch (err) {
    console.warn('SEO meta update error:', err);
  }
}
