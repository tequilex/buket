'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getDisplayName } from '@/lib/content/catalog';
import type { BouquetEntry, CategorySlug } from '@/lib/content/schemas';

export interface CategoryTile {
  slug: CategorySlug;
  title: string;
  image: string;
  priceFrom: number;
  count: number;
}

interface CategoryPickerProps {
  tiles: CategoryTile[];
  /** Все букеты — из них собирается выдача под выбранную плитку. */
  bouquets: BouquetEntry[];
  /** Хиты, которые видны без фильтра. */
  featured: BouquetEntry[];
}

/** Цвет плитки закреплён за категорией — он же повторяется в шапке раздела. */
const tileSkins: Record<CategorySlug, { surface: string; mark: string }> = {
  myasnye: { surface: 'bg-card text-ink', mark: 'bg-primary' },
  rybnye: { surface: 'bg-ink text-white', mark: 'bg-card' },
  sladkie: { surface: 'bg-primary text-ink', mark: 'bg-card' },
  fruktovye: { surface: 'bg-band text-ink', mark: 'bg-card' },
};

function composition(bouquet: BouquetEntry) {
  return `${bouquet.shortDescription.replace(/\.$/u, '')} · ${bouquet.weightOrSize}`;
}

/**
 * Плитки категорий и блок хитов под ними. Единственное клиентское состояние
 * главной: клик по плитке фильтрует выдачу, повторный клик снимает фильтр.
 *
 * Ссылки на категории остаются в шапке каталога — здесь фильтр нужен, чтобы
 * посмотреть составы не уходя с главной.
 */
export function CategoryPicker({ tiles, bouquets, featured }: CategoryPickerProps) {
  const [active, setActive] = useState<CategorySlug | null>(null);

  const activeTile = tiles.find((tile) => tile.slug === active);
  const hits = active
    ? bouquets.filter((bouquet) => bouquet.category === active)
    : featured;

  return (
    <>
      <section className="flex flex-col gap-7 px-7 pt-16 max-md:gap-4 max-md:px-4 max-md:pt-8">
        <header className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-2">
          <h2 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] text-ink max-lg:text-[36px] max-md:text-[26px] max-md:leading-[1.1]">
            Выберите основу
          </h2>
          <p className="text-[15px] text-mute max-md:text-[14px]">
            Нажмите на плитку — каталог ниже отфильтруется
          </p>
        </header>

        <div className="grid grid-cols-4 gap-3.5 max-lg:grid-cols-2 max-md:gap-2">
          {tiles.map((tile) => {
            const skin = tileSkins[tile.slug];
            const on = active === tile.slug;

            return (
              <button
                key={tile.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(on ? null : tile.slug)}
                className={[
                  'relative flex h-65 cursor-pointer flex-col items-start gap-1 overflow-hidden rounded-[32px] border-[3px] p-6 text-left',
                  'max-md:h-37.5 max-md:gap-0.5 max-md:rounded-lg max-md:p-3.5',
                  skin.surface,
                  on ? 'border-ink' : 'border-transparent',
                ].join(' ')}
              >
                <span className="font-display text-[22px] font-bold max-md:text-[15px]">
                  {tile.title}
                </span>
                <span className="text-[14px] font-semibold whitespace-nowrap max-md:text-[13px]">
                  от {tile.priceFrom.toLocaleString('ru-RU')} ₽ · {tile.count} шт.
                </span>
                <Image
                  src={tile.image}
                  alt=""
                  width={190}
                  height={190}
                  sizes="190px"
                  className="pointer-events-none absolute -right-7.5 -bottom-10 size-47.5 rounded-full border-[6px] border-white object-cover max-md:-right-5 max-md:-bottom-6 max-md:size-25 max-md:border-4"
                />
                <span
                  aria-hidden="true"
                  className={[
                    'absolute bottom-5 left-5 flex size-11 items-center justify-center rounded-full text-[18px] font-bold text-ink max-md:hidden',
                    skin.mark,
                  ].join(' ')}
                >
                  {on ? '✓' : '↗'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-7 px-7 pt-14 max-md:gap-4 max-md:px-4 max-md:pt-7">
        <header className="flex items-center justify-between gap-6">
          <h2 className="font-display text-[40px] leading-none font-bold tracking-[-0.03em] text-ink max-lg:text-[32px] max-md:text-[24px] max-md:leading-[1.1]">
            {activeTile ? `${activeTile.title} букеты` : 'Чаще всего берут'}
          </h2>
          {activeTile ? (
            <button
              type="button"
              onClick={() => setActive(null)}
              className="cursor-pointer rounded-full border-2 border-ink px-4.5 py-2.25 font-semibold whitespace-nowrap text-ink transition-colors duration-150 ease-linear hover:bg-ink hover:text-white max-md:h-9 max-md:px-3 max-md:py-0 max-md:text-[13px]"
            >
              <span className="max-md:hidden">Показать все ✕</span>
              <span className="hidden max-md:inline">Все ✕</span>
            </button>
          ) : null}
        </header>

        <div className="grid grid-cols-4 gap-x-4 gap-y-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-5">
          {hits.map((bouquet, index) => (
            <Link
              key={bouquet.slug}
              href={`/bouquets/${bouquet.slug}`}
              className="flex flex-col gap-3 max-md:gap-2"
            >
              <div className="relative">
                <Image
                  src={bouquet.images[0].src}
                  alt={bouquet.images[0].alt}
                  width={300}
                  height={400}
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 300px"
                  className="aspect-panel w-full rounded-lg bg-page object-cover max-md:rounded-md"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 left-3.5 font-display text-[56px] leading-none font-extrabold text-transparent [-webkit-text-stroke:2px_#fff] max-md:top-1.5 max-md:left-2.5 max-md:text-[32px] max-md:[-webkit-text-stroke:1.5px_#fff]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="absolute right-3 bottom-3 rounded-full bg-primary px-3.5 py-2 text-[16px] leading-none font-bold whitespace-nowrap text-ink max-md:right-auto max-md:bottom-2 max-md:left-2 max-md:px-2.5 max-md:py-1 max-md:text-[13px]">
                  от {bouquet.priceFrom.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="flex flex-col gap-0.5 px-1.5">
                <h3 className="text-[17px] font-bold text-ink max-md:text-[15px] max-md:leading-tight">
                  {getDisplayName(bouquet.name)}
                </h3>
                <span className="text-[14px] text-subtle max-md:hidden">
                  {composition(bouquet)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
