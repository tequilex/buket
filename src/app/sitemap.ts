import type { MetadataRoute } from 'next';
import {
  bouquets,
  categories,
  occasions,
} from '@/lib/content/catalog';
import { absoluteUrl } from '@/lib/utils';

export const dynamic = 'force-static';

/**
 * Карта сайта. Адреса строятся через absoluteUrl: без слеша на конце каждый
 * из них отвечает 308, и Яндекс выбрасывает такие ссылки как редиректы.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/catalog',
    '/delivery',
    '/contacts',
    '/blog',
    '/locations/krasnodar',
    '/locations/yablonovskiy',
    ...categories.map((category) => `/catalog/${category.slug}`),
    ...bouquets.map((bouquet) => `/bouquets/${bouquet.slug}`),
    ...occasions.map((occasion) => `/occasions/${occasion.slug}`),
  ];

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
