import { bouquets, categories, locations, occasions, siteConfig } from '@/lib/content/catalog';

test('launch content covers the required catalog surface', () => {
  expect(siteConfig.siteName).toBe('Gastro Buket');
  expect(categories.map((item) => item.slug)).toEqual([
    'myasnye',
    'rybnye',
    'sladkie',
    'fruktovye',
  ]);
  expect(bouquets.length).toBeGreaterThanOrEqual(10);
  expect(occasions.length).toBeGreaterThanOrEqual(3);
  expect(new Set(bouquets.map((item) => item.category))).toEqual(
    new Set(['myasnye', 'rybnye', 'sladkie', 'fruktovye']),
  );
});

/**
 * Регрессия. Страницы локаций однажды удалили как дубли главной — ошибочно:
 * по GSC /locations/krasnodar/ собирала 740 показов за три месяца против 319
 * у самой главной. Вывод строился на Вордстате по Яндексу и не подтвердился.
 */
test('locations stay both as data for areaServed and as pages', () => {
  expect(locations.map((item) => item.city)).toEqual(['Краснодар', 'Яблоновский']);
  for (const location of locations) {
    expect(location.about.length).toBeGreaterThanOrEqual(3);
  }
});
