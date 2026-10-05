import { buildMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, assetUrl } from '@/lib/utils';

test('buildMetadata returns canonical URL for route path', () => {
  const metadata = buildMetadata({
    title: 'Каталог',
    description: 'Каталог съедобных букетов',
    path: '/catalog',
  });

  expect(metadata.alternates?.canonical).toBe('http://localhost:3000/catalog/');
});

test('buildMetadata strips the site name suffix before applying the layout template', () => {
  const metadata = buildMetadata({
    title: 'Съедобные букеты в Краснодаре | Gastro Buket',
    description: 'Локальная выдача для Краснодара',
    path: '/locations/krasnodar',
  });

  expect(metadata.title).toBe('Съедобные букеты в Краснодаре');
});

test('buildMetadata falls back to the default social card', () => {
  const metadata = buildMetadata({
    title: 'Доставка',
    description: 'Как возим',
    path: '/delivery',
  });

  expect(metadata.openGraph?.url).toBe('http://localhost:3000/delivery/');
  expect(metadata.openGraph?.images).toEqual([
    {
      url: 'http://localhost:3000/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Съедобные букеты Gastro Buket',
    },
  ]);
});

test('buildMetadata promotes a product photo to an absolute social card', () => {
  const metadata = buildMetadata({
    title: 'Мужской хит',
    description: 'Мясной букет',
    path: '/bouquets/muzhskoy-hit',
    imageUrl: '/images/bouquets/5.webp',
  });

  expect(metadata.openGraph?.images).toEqual([
    {
      url: 'http://localhost:3000/images/bouquets/5.webp',
      alt: 'Мужской хит',
    },
  ]);
});

/** Маршрут — со слешем, файл — без. Их легко перепутать в одном хелпере. */
test('absoluteUrl adds a trailing slash, assetUrl never does', () => {
  expect(absoluteUrl('/')).toBe('http://localhost:3000/');
  expect(absoluteUrl('/catalog')).toBe('http://localhost:3000/catalog/');
  expect(absoluteUrl('/catalog/')).toBe('http://localhost:3000/catalog/');
  expect(assetUrl('/og-default.jpg')).toBe('http://localhost:3000/og-default.jpg');
});
