import { occasionSchema, type OccasionEntry } from '@/lib/content/schemas';

const rawOccasions: OccasionEntry[] = [
  {
    slug: 'muzhskie',
    title: 'Мужские съедобные букеты',
    intro:
      'Подборка мясных и рыбных букетов для мужчин, которым нужен выразительный и небанальный подарок.',
    seoTitle: 'Мужские съедобные букеты в Краснодаре | Gastro Buket',
    seoDescription:
      'Мужские съедобные букеты с доставкой по Краснодару и Яблоновскому: мясные, рыбные и подарочные варианты.',
    relatedBouquetSlugs: [
      'muzhskoy-hit',
      'kolbasnyy-premium',
      'rybnyy-ulov',
      'pennyy-vecher',
    ],
  },
  {
    slug: '23-fevralya',
    title: 'Съедобные букеты на 23 февраля',
    intro:
      'Букеты с плотным составом и мужской подачей для поздравления на 23 февраля дома, в офисе или на выезде.',
    seoTitle: 'Съедобные букеты на 23 февраля в Краснодаре',
    seoDescription:
      'Закажите съедобный букет на 23 февраля в Краснодаре и Яблоновском с удобной доставкой.',
    relatedBouquetSlugs: [
      'muzhskoy-hit',
      'kolbasnyy-premium',
      'rybnyy-ulov',
      'morskoy-vkus',
    ],
    faqItems: [
      {
        question: 'Можно ли собрать букет в корпоративных цветах?',
        answer:
          'Да, оформление можно обсудить заранее в мессенджере, если заказ делается не в последний момент.',
      },
    ],
  },
  {
    slug: 'den-rozhdeniya',
    title: 'Съедобные букеты на день рождения',
    intro:
      'Подборка мясных, сладких и фруктовых букетов, которые удобно дарить на день рождения взрослым и коллегам.',
    seoTitle: 'Съедобные букеты на день рождения в Краснодаре',
    seoDescription:
      'Съедобные букеты на день рождения с доставкой по Краснодару и Яблоновскому.',
    relatedBouquetSlugs: [
      'sytnyy-podarok',
      'morskoy-vkus',
      'shokoladnyy-miks',
      'fruktovaya-svezhest',
    ],
  },
  {
    slug: 'podarok-kollege',
    title: 'Съедобный букет в подарок коллеге',
    intro:
      'Лаконичные сладкие и мясные варианты, которые выглядят аккуратно и подходят для офисного поздравления.',
    seoTitle: 'Съедобный букет в подарок коллеге | Gastro Buket',
    seoDescription:
      'Идеи съедобных букетов в подарок коллеге с доставкой по Краснодару и Яблоновскому.',
    relatedBouquetSlugs: [
      'kolbasnyy-premium',
      'sladkiy-kompliment',
      'shokoladnyy-miks',
      'yagodnyy-akcent',
    ],
  },
];

export const occasions = rawOccasions.map((entry) => occasionSchema.parse(entry));
