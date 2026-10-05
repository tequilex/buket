import { generateMetadata as generateBlogMetadata } from '@/app/blog/page';
import { generateMetadata as generateCategoryMetadata } from '@/app/catalog/[category]/page';
import { generateMetadata as generateCatalogMetadata } from '@/app/catalog/page';
import { generateMetadata as generateContactsMetadata } from '@/app/contacts/page';
import { generateMetadata as generateDeliveryMetadata } from '@/app/delivery/page';

test('catalog and support routes return route-specific metadata', async () => {
  const [catalog, category, delivery, contacts, blog] = await Promise.all([
    generateCatalogMetadata(),
    generateCategoryMetadata({ params: Promise.resolve({ category: 'myasnye' }) }),
    generateDeliveryMetadata(),
    generateContactsMetadata(),
    generateBlogMetadata(),
  ]);

  expect(catalog.title).toBe('Каталог съедобных букетов');
  expect(catalog.alternates?.canonical).toBe('http://localhost:3000/catalog/');

  expect(category.title).toBe('Мясные букеты в Краснодаре и Яблоновском');
  expect(category.alternates?.canonical).toBe('http://localhost:3000/catalog/myasnye/');

  expect(delivery.title).toBe('Доставка съедобных букетов');
  expect(delivery.alternates?.canonical).toBe('http://localhost:3000/delivery/');

  expect(contacts.title).toBe('Контакты и заказ съедобных букетов');
  expect(contacts.alternates?.canonical).toBe('http://localhost:3000/contacts/');

  expect(blog.title).toBe('Блог о съедобных букетах');
  expect(blog.alternates?.canonical).toBe('http://localhost:3000/blog/');
});

/**
 * Главная месяцами выходила вообще без canonical: в layout его не было, а
 * собственных метаданных у страницы не существовало.
 */
test('the home page declares its own canonical', async () => {
  const { metadata } = await import('@/app/page');

  expect(metadata.alternates?.canonical).toBe('http://localhost:3000/');
});
