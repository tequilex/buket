import { bouquets, categories, locations, occasions } from '@/lib/content/catalog';

test('launch content covers the required catalog surface', () => {
  expect(categories.map((item) => item.slug)).toEqual([
    'myasnye',
    'rybnye',
    'sladkie',
    'fruktovye',
  ]);
  expect(locations.map((item) => item.slug)).toEqual([
    'krasnodar',
    'yablonovskiy',
  ]);
  expect(bouquets.length).toBeGreaterThanOrEqual(10);
  expect(occasions.length).toBeGreaterThanOrEqual(4);
  expect(new Set(bouquets.map((item) => item.category))).toEqual(
    new Set(['myasnye', 'rybnye', 'sladkie', 'fruktovye']),
  );
});
