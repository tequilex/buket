import { generateStaticParams as generateCategoryParams } from '@/app/catalog/[category]/page';

test('category route generates all category params', async () => {
  await expect(generateCategoryParams()).resolves.toEqual([
    { category: 'myasnye' },
    { category: 'rybnye' },
    { category: 'sladkie' },
    { category: 'fruktovye' },
  ]);
});
