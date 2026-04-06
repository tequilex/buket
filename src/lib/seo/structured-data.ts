import siteConfig from '@/data/site-config';
import type { BouquetEntry } from '@/lib/content/schemas';

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: getBaseUrl(),
    sameAs: siteConfig.channels.map((channel) => channel.href),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${getBaseUrl()}${item.path}`,
    })),
  };
}

export function buildBouquetProductJsonLd(bouquet: BouquetEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bouquet.name,
    description: bouquet.fullDescription,
    image: bouquet.images.map((image) => `${getBaseUrl()}${image.src}`),
    category: bouquet.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: String(bouquet.priceFrom),
      availability: 'https://schema.org/InStock',
      url: `${getBaseUrl()}/bouquets/${bouquet.slug}`,
    },
  };
}
