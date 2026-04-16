import { locationSchema, type LocationEntry } from '@/lib/content/schemas';

const rawLocations: LocationEntry[] = [
  {
    slug: 'krasnodar',
    title: 'Съедобные букеты в Краснодаре',
    shortDescription:
      'Доставка по Краснодару с быстрым заказом через WhatsApp, Telegram и Avito.',
    deliveryLead:
      'По Краснодару можно согласовать доставку день в день или ближайшее удобное окно.',
    seoTitle: 'Съедобные букеты в Краснодаре с доставкой | Gastro Buket',
    seoDescription:
      'Закажите съедобные букеты в Краснодаре: мясные, рыбные, сладкие и фруктовые. Быстрый заказ через мессенджеры.',
  },
  {
    slug: 'yablonovskiy',
    title: 'Съедобные букеты в Яблоновском',
    shortDescription:
      'Доставка по Яблоновскому и соседним районам с заказом без корзины.',
    deliveryLead:
      'По Яблоновскому доставку лучше согласовывать заранее, но оперативные заказы тоже возможны.',
    seoTitle: 'Съедобные букеты в Яблоновском с доставкой | Gastro Buket',
    seoDescription:
      'Съедобные букеты в Яблоновском: мясные, рыбные, сладкие и фруктовые с доставкой и быстрым заказом через мессенджеры.',
  },
];

export const locations = rawLocations.map((entry) => locationSchema.parse(entry));
