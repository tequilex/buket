import { render, screen } from '@testing-library/react';
import CatalogPage from '@/app/catalog/page';
import BouquetPage from '@/app/bouquets/[slug]/page';
import { generateStaticParams as generateCategoryParams } from '@/app/catalog/[category]/page';
import { generateStaticParams as generateBouquetParams } from '@/app/bouquets/[slug]/page';
import { generateStaticParams as generateOccasionParams } from '@/app/occasions/[slug]/page';
import { bouquets } from '@/lib/content/catalog';
import { occasions } from '@/lib/content/catalog';

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

test('occasion route generates one param per occasion page', async () => {
  await expect(generateOccasionParams()).resolves.toEqual(
    occasions.map((item) => ({ slug: item.slug })),
  );
});

test('catalog page renders a storefront heading and popular bouquet shelf', () => {
  render(CatalogPage());

  expect(
    screen.getByRole('heading', { name: /каталог съедобных букетов/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /популярные букеты/i }),
  ).toBeInTheDocument();
});

test('bouquet page renders primary product data above the fold', async () => {
  const targetBouquet = bouquets.find((item) => item.slug === 'muzhskoy-hit')!;

  render(
    await BouquetPage({ params: Promise.resolve({ slug: 'muzhskoy-hit' }) }),
  );

  expect(
    screen.getByRole('heading', { level: 1, name: /мужской хит/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(new RegExp(String(targetBouquet.priceFrom)))).toBeInTheDocument();
  expect(screen.getByText(/что внутри/i)).toBeInTheDocument();
});
