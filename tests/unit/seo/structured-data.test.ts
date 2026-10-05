import {
  buildBouquetProductJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildLocalBusinessJsonLd,
} from '@/lib/seo/structured-data';
import { bouquets, faqs, siteConfig } from '@/lib/content/catalog';

test('buildBouquetProductJsonLd returns Product schema with Offer data', () => {
  const jsonLd = buildBouquetProductJsonLd(bouquets[0]);

  expect(jsonLd['@type']).toBe('Product');
  expect(jsonLd.name).toBe(bouquets[0].name);
  expect(jsonLd.offers.price).toBe(String(bouquets[0].priceFrom));
  expect(jsonLd.offers.priceCurrency).toBe('RUB');
  expect(jsonLd.offers.url).toBe(
    `http://localhost:3000/bouquets/${bouquets[0].slug}/`,
  );
  expect(jsonLd.image[0]).toBe(`http://localhost:3000${bouquets[0].images[0].src}`);
});

test('buildLocalBusinessJsonLd lists every served city', () => {
  const jsonLd = buildLocalBusinessJsonLd();

  expect(jsonLd['@type']).toBe('LocalBusiness');
  expect(jsonLd.telephone).toBe(siteConfig.phone);
  expect(jsonLd.areaServed.map((area) => area.name)).toEqual([
    'Краснодар',
    'Яблоновский',
  ]);
});

/**
 * У отключённого канала в конфиге стоит адрес самой площадки, а не нашего
 * профиля. Выдавать его за свой в sameAs нельзя.
 */
test('buildLocalBusinessJsonLd omits disabled channels from sameAs', () => {
  const jsonLd = buildLocalBusinessJsonLd();
  const disabled = siteConfig.channels.filter((channel) => channel.disabled);

  expect(disabled.length).toBeGreaterThan(0);
  for (const channel of disabled) {
    expect(jsonLd.sameAs).not.toContain(channel.href);
  }
});

/** В кнопках к ссылкам прицеплены текст сообщения и utm — в профиль они не идут. */
test('buildLocalBusinessJsonLd strips query strings from sameAs', () => {
  const jsonLd = buildLocalBusinessJsonLd();

  expect(jsonLd.sameAs).toContain('https://wa.me/79182705854');
  for (const url of jsonLd.sameAs) {
    expect(url).not.toContain('?');
  }
});

/**
 * Адрес и часы работы заполняются вручную реальными данными. Пока их нет,
 * разметка обязана выходить без этих полей, а не с пустыми заглушками.
 */
test('buildLocalBusinessJsonLd omits address and hours until they are filled in', () => {
  const jsonLd = buildLocalBusinessJsonLd();

  expect('address' in jsonLd).toBe(Boolean(siteConfig.address));
  expect('openingHours' in jsonLd).toBe(Boolean(siteConfig.openingHours));
});

test('buildBreadcrumbJsonLd numbers items and leaves the current page without a URL', () => {
  const jsonLd = buildBreadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/catalog' },
    { name: 'Мясные' },
  ]);

  expect(jsonLd.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
  expect(jsonLd.itemListElement[1].item).toBe('http://localhost:3000/catalog/');
  expect(jsonLd.itemListElement[2]).not.toHaveProperty('item');
});

test('buildFaqJsonLd mirrors the questions rendered on the page', () => {
  const jsonLd = buildFaqJsonLd(faqs);

  expect(jsonLd['@type']).toBe('FAQPage');
  expect(jsonLd.mainEntity).toHaveLength(faqs.length);
  expect(jsonLd.mainEntity[0].name).toBe(faqs[0].question);
  expect(jsonLd.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].answer);
});

test('buildItemListJsonLd links every product with a trailing slash', () => {
  const jsonLd = buildItemListJsonLd(bouquets, 'Каталог');

  expect(jsonLd.numberOfItems).toBe(bouquets.length);
  for (const item of jsonLd.itemListElement) {
    expect(item.url.endsWith('/')).toBe(true);
  }
});
