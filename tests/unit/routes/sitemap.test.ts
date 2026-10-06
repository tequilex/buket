import sitemap from '@/app/sitemap';
import { bouquets, categories, occasions } from '@/lib/content/catalog';

test('sitemap includes the main commercial routes', () => {
  const urls = sitemap().map((item) => item.url);

  expect(urls).toContain('http://localhost:3000/');
  expect(urls).toContain('http://localhost:3000/catalog/');
  expect(urls).toContain('http://localhost:3000/delivery/');
  expect(urls).toContain('http://localhost:3000/locations/krasnodar/');
  expect(urls).toContain('http://localhost:3000/locations/yablonovskiy/');
});

/**
 * Блог — заглушка с текстом «Пока статей нет», то есть ровно та малоценная
 * страница, за которую Яндекс исключает. В карту вернуть, когда появятся статьи.
 */
test('sitemap omits the empty blog stub', () => {
  const urls = sitemap().map((item) => item.url);

  expect(urls).not.toContain('http://localhost:3000/blog/');
});

/**
 * Регрессия. Адреса без слеша отвечали 308, и Яндекс исключал их из индекса
 * со статусом «Редирект» — именно это было видно в Вебмастере по
 * /catalog/rybnye. Каждая ссылка карты обязана быть конечным адресом.
 */
test('every sitemap URL is absolute and ends with a trailing slash', () => {
  for (const { url } of sitemap()) {
    expect(url.startsWith('http://localhost:3000/')).toBe(true);
    expect(url.endsWith('/')).toBe(true);
  }
});

test('sitemap covers every catalog entity and has no duplicates', () => {
  const urls = sitemap().map((item) => item.url);

  expect(new Set(urls).size).toBe(urls.length);

  for (const bouquet of bouquets) {
    expect(urls).toContain(`http://localhost:3000/bouquets/${bouquet.slug}/`);
  }
  for (const category of categories) {
    expect(urls).toContain(`http://localhost:3000/catalog/${category.slug}/`);
  }
  for (const occasion of occasions) {
    expect(urls).toContain(`http://localhost:3000/occasions/${occasion.slug}/`);
  }
});
