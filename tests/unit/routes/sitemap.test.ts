import sitemap from '@/app/sitemap';

test('sitemap includes the main commercial routes', async () => {
  const entries = await sitemap();
  const urls = entries.map((item) => item.url);

  expect(urls).toContain('http://localhost:3000/');
  expect(urls).toContain('http://localhost:3000/catalog');
  expect(urls).toContain('http://localhost:3000/locations/krasnodar');
});
