import type { CategorySlug } from '@/lib/content/schemas';

export type CategoryTone = 'light' | 'dark' | 'yellow' | 'gray';

/**
 * Цвет закреплён за категорией и повторяется везде: плитка на главной,
 * шапка раздела, карточка в сравнении составов.
 */
export const categoryTone: Record<CategorySlug, CategoryTone> = {
  myasnye: 'light',
  rybnye: 'dark',
  sladkie: 'yellow',
  fruktovye: 'gray',
};

/** Кадр категории. Витринная величина, в данных её нет. */
export const categoryImages: Record<CategorySlug, string> = {
  myasnye: '/images/bouquets/9.webp',
  rybnye: '/images/bouquets/11.webp',
  sladkie: '/images/bouquets/3.webp',
  fruktovye: '/images/bouquets/10.webp',
};

interface ToneSkin {
  /** Поверхность карточки и цвет текста на ней. */
  surface: string;
  /** Подписи в строках таблицы. */
  mute: string;
  /** Жирная черта над таблицей. */
  rule: string;
  /** Волосяные разделители строк. */
  line: string;
  /** Рамка круглого фото — она же цвет фона карточки. */
  ring: string;
  /** Пилюля-счётчик внизу. */
  pill: string;
}

export const toneSkins: Record<CategoryTone, ToneSkin> = {
  light: {
    surface: 'bg-card text-ink',
    mute: 'text-subtle',
    rule: 'border-ink',
    line: 'border-line',
    ring: 'border-page',
    pill: 'bg-primary text-ink',
  },
  dark: {
    surface: 'bg-ink text-white',
    mute: 'text-[#9a9ca3]',
    rule: 'border-primary',
    line: 'border-[#2e2f35]',
    ring: 'border-dark-raised',
    pill: 'bg-primary text-ink',
  },
  yellow: {
    surface: 'bg-primary text-ink',
    mute: 'text-[#5c4a00]',
    rule: 'border-ink',
    line: 'border-[rgb(23_24_28/0.15)]',
    ring: 'border-white',
    pill: 'bg-ink text-white',
  },
  gray: {
    surface: 'bg-band text-ink',
    mute: 'text-mute',
    rule: 'border-ink',
    line: 'border-[rgb(23_24_28/0.12)]',
    ring: 'border-white',
    pill: 'bg-ink text-white',
  },
};

/** Сводка по категории для таблицы сравнения. Цены считаются из данных. */
export const categoryGuide: Record<CategorySlug, { fits: string; avoid: string }> = {
  myasnye: {
    fits: 'Мужчине, коллеге, на 23 февраля. Когда цветы дарить неуместно',
    avoid: 'Вегетарианцу, ребёнку',
  },
  rybnye: {
    fits: 'Под пиво, компании, любителям солёного',
    avoid: 'В офис и туда, где важен нейтральный запах',
  },
  sladkie: {
    fits: 'Женщине, учителю, ребёнку, на день рождения',
    avoid: 'Тем, кто не ест сладкое',
  },
  fruktovye: {
    fits: 'Когда не знаешь вкусов. Самый безопасный вариант',
    avoid: 'Если нужен весомый подарок — он лёгкий',
  },
};
