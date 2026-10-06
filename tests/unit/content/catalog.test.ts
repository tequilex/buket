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
 * Страниц локаций больше нет: /locations/krasnodar/ дублировала главную и была
 * исключена Яндексом как малоценная, а по Яблоновскому спроса нет (28 запросов
 * по всей России). Сами данные остались — из них строится areaServed в разметке
 * организации.
 */
test('locations survive as data for areaServed, not as pages', () => {
  expect(locations.map((item) => item.city)).toEqual(['Краснодар', 'Яблоновский']);
});
