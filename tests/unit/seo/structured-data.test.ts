import { buildBouquetProductJsonLd } from '@/lib/seo/structured-data';
import { bouquets } from '@/lib/content/catalog';

test('buildBouquetProductJsonLd returns Product schema with Offer data', () => {
  const jsonLd = buildBouquetProductJsonLd(bouquets[0]);

  expect(jsonLd['@type']).toBe('Product');
  expect(jsonLd.name).toBe(bouquets[0].name);
  expect(jsonLd.offers.price).toBe(String(bouquets[0].priceFrom));
  expect(jsonLd.offers.priceCurrency).toBe('RUB');
});
