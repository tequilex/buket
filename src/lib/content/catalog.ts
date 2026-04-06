import siteConfig from '@/data/site-config';
import { bouquets } from '@/data/bouquets';
import { categories } from '@/data/categories';
import { faqs } from '@/data/faqs';
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
  reviews,
};

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
