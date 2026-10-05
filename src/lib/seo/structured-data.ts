import siteConfig from '@/data/site-config';
import { bouquets } from '@/data/bouquets';
import { locations } from '@/data/locations';
import type { BouquetEntry, FaqItem } from '@/lib/content/schemas';
import { absoluteUrl, assetUrl, getBaseUrl } from '@/lib/utils';

/**
 * Профили, на которые организация реально ссылается.
 *
 * Отключённые каналы сюда не попадают: у max в конфиге стоит адрес самой
 * площадки, а не нашей страницы, и выдавать его за свой профиль нельзя.
 * Параметры запроса срезаются — в кнопках это текст сообщения и utm-метки,
 * а sameAs должен указывать на саму страницу профиля.
 */
function getProfileUrls() {
  return siteConfig.channels
    .filter((channel) => !channel.disabled)
    .map((channel) => channel.href.split('?')[0]);
}

function getPriceRange() {
  const prices = bouquets.map((bouquet) => bouquet.priceFrom);

  return `${Math.min(...prices)}–${Math.max(...prices)} RUB`;
}

/**
 * Карточка организации. Адрес, координаты и часы работы подставляются только
 * если заполнены в site-config — выдумывать их нельзя, а неверный адрес в
 * разметке хуже отсутствующего.
 */
export function buildLocalBusinessJsonLd() {
  const { address, geo, openingHours } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${getBaseUrl()}/#business`,
    name: siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: absoluteUrl('/'),
    image: assetUrl('/og-default.jpg'),
    telephone: siteConfig.phone,
    priceRange: getPriceRange(),
    currenciesAccepted: 'RUB',
    areaServed: locations.map((location) => ({
      '@type': 'City',
      name: location.city,
    })),
    sameAs: getProfileUrls(),
    ...(address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: address.street,
            addressLocality: address.locality,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: 'RU',
          },
        }
      : {}),
    ...(geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
    ...(openingHours ? { openingHours } : {}),
  };
}

/**
 * Хлебные крошки. У последнего элемента адреса нет — это текущая страница,
 * и schema.org допускает ListItem без `item`.
 */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function buildBouquetProductJsonLd(bouquet: BouquetEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bouquet.name,
    description: bouquet.fullDescription,
    image: bouquet.images.map((image) => assetUrl(image.src)),
    category: bouquet.category,
    sku: bouquet.slug,
    brand: {
      '@type': 'Brand',
      name: siteConfig.siteName,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: String(bouquet.priceFrom),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: absoluteUrl(`/bouquets/${bouquet.slug}`),
      seller: { '@id': `${getBaseUrl()}/#business` },
    },
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** Витрина: список товаров на каталоге, категории, поводе или локации. */
export function buildItemListJsonLd(items: BouquetEntry[], name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((bouquet, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/bouquets/${bouquet.slug}`),
      name: bouquet.name,
    })),
  };
}
