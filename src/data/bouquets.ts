import { bouquetSchema, type BouquetEntry } from '@/lib/content/schemas';

const rawBouquets: BouquetEntry[] = [
  {
    slug: 'muzhskoy-hit',
    name: 'Букет "Мужской хит"',
    shortDescription: 'Колбасы, сыр и орехи в плотной подарочной упаковке.',
    fullDescription:
      'Эффектный мясной букет для дня рождения, 23 февраля и подарка мужчине.',
    category: 'myasnye',
    tags: ['мужской', 'с орехами', 'на 23 февраля'],
    priceFrom: 3800,
    images: [
      {
        src: '/images/bouquets/5.webp',
        alt: 'Мясной съедобный букет Мужской хит',
      },
    ],
    composition: ['колбасы', 'сыр', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote:
      'Доставка по Краснодару и Яблоновскому в день заказа по согласованию.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: true,
    seoTitle: 'Мясной съедобный букет в Краснодаре | Мужской хит',
    seoDescription:
      'Мясной букет с доставкой по Краснодару и Яблоновскому. Подходит на день рождения и 23 февраля.',
  },
  {
    slug: 'kolbasnyy-premium',
    name: 'Букет "Колбасный премиум"',
    shortDescription: 'Колбасы, сыры и плотная упаковка в подарочном стиле.',
    fullDescription:
      'Сбалансированный мясной букет для поздравления, корпоратива и мужского подарка.',
    category: 'myasnye',
    tags: ['мужской', 'подарочный', 'коллеге'],
    priceFrom: 4000,
    images: [
      {
        src: '/images/bouquets/8.webp',
        alt: 'Подарочный мясной букет Колбасный премиум',
      },
    ],
    composition: ['колбасы', 'сыр', 'снеки', 'зелень', 'овощи', 'орехи'],
    weightOrSize: 'Большой размер',
    deliveryNote: 'Удобен для доставки в офис или домой по Краснодару и Яблоновскому.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: false,
    seoTitle: 'Подарочный мясной букет с доставкой | Колбасный премиум',
    seoDescription:
      'Мясной букет в подарочном оформлении с доставкой по Краснодару и Яблоновскому.',
  },
  {
    slug: 'sytnyy-podarok',
    name: 'Букет "Сытный подарок"',
    shortDescription: 'Колбасные снеки, сырные акценты и насыщенный вкус.',
    fullDescription:
      'Практичный мясной букет для тех, кто любит сытные подарки без лишней мишуры.',
    category: 'myasnye',
    tags: ['мясной', 'на день рождения'],
    priceFrom: 3600,
    images: [
      {
        src: '/images/bouquets/9.webp',
        alt: 'Сытный мясной букет с сыром и снеками',
      },
    ],
    composition: ['колбасы', 'сыр','хлеб','овощи', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote: 'Можно быстро согласовать состав и удобное время доставки.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: false,
    seoTitle: 'Сытный мясной букет в Краснодаре | Сытный подарок',
    seoDescription:
      'Сытный мясной букет с доставкой по Краснодару и Яблоновскому для подарка мужчине.',
  },
  {
    slug: 'rybnyy-ulov',
    name: 'Букет "Рыбный улов"',
    shortDescription: 'Сушеная рыба, снеки и мужская подача с характером.',
    fullDescription:
      'Рыбный букет для тех, кто любит нестандартные подарки и насыщенные вкусы.',
    category: 'rybnye',
    tags: ['рыбный', 'мужской', 'снеки'],
    priceFrom: 3600,
    images: [
      {
        src: '/images/bouquets/6.webp',
        alt: 'Рыбный букет Рыбный улов',
      },
    ],
    composition: ['сушеная рыба', 'снеки', 'орехи', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote: 'Доставка по Краснодару и Яблоновскому после согласования наличия рыбы.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: true,
    seoTitle: 'Рыбный букет с доставкой в Краснодаре | Рыбный улов',
    seoDescription:
      'Рыбный съедобный букет с доставкой по Краснодару и Яблоновскому. Яркий вариант мужского подарка.',
  },
  {
    slug: 'morskoy-vkus',
    name: 'Букет "Морской вкус"',
    shortDescription: 'Рыбный набор и выразительная упаковка для подарка.',
    fullDescription:
      'Насыщенный рыбный букет для дня рождения, встречи друзей и небанального поздравления.',
    category: 'rybnye',
    tags: ['рыбный', 'на день рождения', 'подарочный'],
    priceFrom: 3700,
    images: [
      {
        src: '/images/bouquets/11.webp',
        alt: 'Подарочный рыбный букет Морской вкус',
      },
    ],
    composition: ['сушеная рыба', 'копченая рыба', 'декор'],
    weightOrSize: 'Большой размер',
    deliveryNote: 'Подходит для доставки домой и как сюрприз с вручением.',
    availableLocations: ['krasnodar'],
    featured: false,
    seoTitle: 'Подарочный рыбный букет в Краснодаре | Морской вкус',
    seoDescription:
      'Рыбный букет с доставкой по Краснодару. Подходит на день рождения и мужские праздники.',
  },
  {
    slug: 'pennyy-vecher',
    name: 'Букет "Пенный вечер"',
    shortDescription: 'Рыба / креветки / раки.',
    fullDescription:
      'Солёный съедобный букет для тех, кто любит рыбные закуски и выразительную подачу.',
    category: 'rybnye',
    tags: ['рыбный', 'мужской'],
    priceFrom: 4000,
    images: [
      {
        src: '/images/bouquets/1.webp',
        alt: 'Рыбный букет с орехами Пенный вечер',
      },
    ],
    composition: ['рыба/креветки/раки', 'зелень', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote: 'Можно адаптировать состав под бюджет и любимые снеки.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: false,
    seoTitle: 'Рыбный букет с орехами | Пенный вечер',
    seoDescription:
      'Рыбный букет с орехами и солеными снеками с доставкой по Краснодару и Яблоновскому.',
  },
  {
    slug: 'sladkiy-kompliment',
    name: 'Букет "Сладкий комплимент"',
    shortDescription: 'Мармелад и зефир в аккуратной подарочной упаковке.',
    fullDescription:
      'Сладкий букет для поздравления, подарка коллеге и небольшого праздника.',
    category: 'sladkie',
    tags: ['сладкий', 'коллеге', 'на день рождения'],
    priceFrom: 3000,
    images: [
      {
        src: '/images/bouquets/4.webp',
        alt: 'Сладкий букет Сладкий комплимент',
      },
    ],
    composition: ['мармелад', 'зефир', 'мандарины', 'декор'],
    weightOrSize: 'Компактный размер',
    deliveryNote: 'Удобен для быстрого поздравления и доставки в течение дня.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: true,
    seoTitle: 'Сладкий букет с доставкой в Краснодаре | Сладкий комплимент',
    seoDescription:
      'Сладкий букет из мармелада и зефира с доставкой по Краснодару и Яблоновскому.',
  },
  {
    slug: 'shokoladnyy-miks',
    name: 'Букет "Шоколадный микс"',
    shortDescription: 'Шоколад, конфеты и яркая подача для праздничного подарка.',
    fullDescription:
      'Сладкий букет с более насыщенным наполнением для дня рождения и теплых поздравлений.',
    category: 'sladkie',
    tags: ['сладкий', 'праздничный', 'день рождения'],
    priceFrom: 3100,
    images: [
      {
        src: '/images/bouquets/3.webp',
        alt: 'Праздничный сладкий букет Шоколадный микс',
      },
    ],
    composition: ['шоколад', 'конфеты', 'зефир', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote: 'Лучше заказывать заранее в теплую погоду для аккуратной доставки.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: false,
    seoTitle: 'Праздничный сладкий букет | Шоколадный микс',
    seoDescription:
      'Сладкий букет с шоколадом и конфетами для поздравления с доставкой по Краснодару и Яблоновскому.',
  },
  {
    slug: 'fruktovaya-svezhest',
    name: 'Букет "Фруктовая свежесть"',
    shortDescription: 'Фрукты и сезонные акценты в легкой подарочной подаче.',
    fullDescription:
      'Свежий фруктовый букет для тех, кто любит легкие подарки и натуральные вкусы.',
    category: 'fruktovye',
    tags: ['фруктовый', 'легкий подарок', 'женский'],
    priceFrom: 3800,
    images: [
      {
        src: '/images/bouquets/10.webp',
        alt: 'Фруктовый букет Фруктовая свежесть',
      },
    ],
    composition: ['яблоки', 'цитрусы', 'груши', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote: 'Фруктовые букеты лучше доставлять в ближайшие окна после сборки.',
    availableLocations: ['krasnodar'],
    featured: true,
    seoTitle: 'Фруктовый букет в Краснодаре | Фруктовая свежесть',
    seoDescription:
      'Фруктовый букет с доставкой по Краснодару. Свежая сезонная подача для подарка и поздравления.',
  },
  {
    slug: 'yagodnyy-akcent',
    name: 'Букет "Ягодный акцент"',
    shortDescription: 'Фрукты и ягоды с аккуратной сезонной композицией.',
    fullDescription:
      'Легкий фруктовый букет для приятного подарка, сюрприза и праздничного настроения.',
    category: 'fruktovye',
    tags: ['фруктовый', 'ягоды', 'праздничный'],
    priceFrom: 3600,
    images: [
      {
        src: '/images/bouquets/2.webp',
        alt: 'Фруктовый букет с ягодами Ягодный акцент',
      },
    ],
    composition: ['ягоды', 'цитрусы', 'гранат', 'декор'],
    weightOrSize: 'Средний размер',
    deliveryNote:
      'Для Яблоновского и Краснодара лучше согласовать удобный интервал доставки заранее.',
    availableLocations: ['krasnodar', 'yablonovskiy'],
    featured: false,
    seoTitle: 'Фруктово-ягодный букет с доставкой | Ягодный акцент',
    seoDescription:
      'Фруктово-ягодный букет с доставкой по Краснодару и Яблоновскому.',
  },
];

export const bouquets = rawBouquets.map((entry) => bouquetSchema.parse(entry));
