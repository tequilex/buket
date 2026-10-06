import siteConfig from '@/data/site-config';
import { bouquets } from '@/data/bouquets';
import { categories } from '@/data/categories';
import { categoryFaqs, faqs } from '@/data/faqs';
import { locations } from '@/data/locations';
import { occasions } from '@/data/occasions';
import { reviews } from '@/data/reviews';
import type {
  BouquetEntry,
  CategorySlug,
  LocationSlug,
} from '@/lib/content/schemas';

export {
  siteConfig,
  categories,
  locations,
  bouquets,
  occasions,
  faqs,
  categoryFaqs,
  reviews,
};

/** tel: для того же номера, что показан в разметке. */
export const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/gu, '')}`;

/**
 * Имя для дисплейного яруса: «Букет "Мужской хит"» → «Мужской хит».
 * В данных и в разметке `name` и `seoTitle` остаются полными.
 */
export function getDisplayName(name: string): string {
  return name.replace(/^Букет\s+[«"“](.+)[»"”]$/u, '$1');
}

export function getBouquetBySlug(slug: string): BouquetEntry | undefined {
  return bouquets.find((bouquet) => bouquet.slug === slug);
}

export function getBouquetsByCategory(category: CategorySlug): BouquetEntry[] {
  return bouquets.filter((bouquet) => bouquet.category === category);
}

export function getOccasionBySlug(slug: string) {
  return occasions.find((occasion) => occasion.slug === slug);
}

export function getLocationBySlug(slug: LocationSlug) {
  return locations.find((location) => location.slug === slug);
}
