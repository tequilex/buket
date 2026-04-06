import { categorySchema, type CategoryEntry } from '@/lib/content/schemas';

const rawCategories: CategoryEntry[] = [
  {
    slug: 'myasnye',
    title: 'Мясные букеты',
    shortDescription: 'Колбасы, сыр, орехи и плотная подарочная подача.',
    heroDescription:
      'Мясные съедобные букеты для мужчин, праздников и подарков с характером.',
  },
  {
    slug: 'rybnye',
    title: 'Рыбные букеты',
    shortDescription: 'Сушеная рыба, снеки и соленые акценты.',
    heroDescription:
      'Рыбные букеты с насыщенным вкусом для ценителей небанальных подарков.',
  },
  {
    slug: 'sladkie',
    title: 'Сладкие букеты',
    shortDescription: 'Конфеты, шоколад и яркая подарочная упаковка.',
    heroDescription:
      'Сладкие съедобные букеты на день рождения, поздравление и приятный сюрприз.',
  },
  {
    slug: 'fruktovye',
    title: 'Фруктовые букеты',
    shortDescription: 'Фрукты, ягоды и свежая сезонная подача.',
    heroDescription:
      'Фруктовые букеты для легкого и эффектного подарка с доставкой по городу.',
  },
];

export const categories = rawCategories.map((entry) => categorySchema.parse(entry));
