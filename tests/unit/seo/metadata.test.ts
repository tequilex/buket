import { buildMetadata } from '@/lib/seo/metadata';

test('buildMetadata returns canonical URL for route path', () => {
  const metadata = buildMetadata({
    title: 'Каталог',
    description: 'Каталог съедобных букетов',
    path: '/catalog',
  });

  expect(metadata.alternates?.canonical).toBe('http://localhost:3000/catalog');
});
