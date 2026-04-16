import { buildMetadata } from '@/lib/seo/metadata';

test('buildMetadata returns canonical URL for route path', () => {
  const metadata = buildMetadata({
    title: 'Каталог',
    description: 'Каталог съедобных букетов',
    path: '/catalog',
  });

  expect(metadata.alternates?.canonical).toBe('http://localhost:3000/catalog');
});

test('buildMetadata strips the site name suffix before applying the layout template', () => {
  const metadata = buildMetadata({
    title: 'Съедобные букеты в Краснодаре | Gastro Buket',
    description: 'Локальная выдача для Краснодара',
    path: '/locations/krasnodar',
  });

  expect(metadata.title).toBe('Съедобные букеты в Краснодаре');
});
