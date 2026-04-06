import { generateStaticParams as generateCategoryParams } from '@/app/catalog/[category]/page';
import { generateStaticParams as generateBouquetParams } from '@/app/bouquets/[slug]/page';
import { bouquets } from '@/lib/content/catalog';

test('category route generates all category params', async () => {
  await expect(generateCategoryParams()).resolves.toEqual([
    { category: 'myasnye' },
    { category: 'rybnye' },
    { category: 'sladkie' },
    { category: 'fruktovye' },
  ]);
});

test('bouquet route generates one param per bouquet', async () => {
  await expect(generateBouquetParams()).resolves.toEqual(
    bouquets.map((item) => ({ slug: item.slug })),
  );
});
