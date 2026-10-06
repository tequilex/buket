import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { CtaBand } from '@/components/ui/cta-band';
import { FilterChip } from '@/components/ui/filter-chip';
import { JsonLd } from '@/components/seo/json-ld';
import { bouquets, categories } from '@/lib/content/catalog';
import {
  categoryGuide,
  categoryImages,
  categoryTone,
  toneSkins,
} from '@/lib/content/category-theme';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildItemListJsonLd } from '@/lib/seo/structured-data';
import { pluralBouquets } from '@/lib/utils';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Каталог съедобных букетов',
    description:
      'Каталог съедобных букетов: мужские из колбасы и сыра, солёные из рыбы, сладкие из конфет и фруктовые. Цены от 3000 ₽, доставка по Краснодару и Яблоновскому.',
    path: '/catalog',
  });
}

export default function CatalogPage() {
  return (
    <>
      <JsonLd
        id="catalog-items"
        data={buildItemListJsonLd(bouquets, 'Каталог съедобных букетов')}
      />

      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]}
        eyebrow="Весь каталог"
        title="Все съедобные букеты"
        lead="Десять готовых букетов. Состав любого согласуем до сборки — можно вычеркнуть строку или собрать под бюджет."
        photos={[
          { src: '/images/bouquets/5.webp', alt: '' },
          { src: '/images/bouquets/hero.webp', alt: '' },
          { src: '/images/bouquets/4.webp', alt: '' },
        ]}
      />

      {/* ВЫДАЧА */}
      <section className="mt-7 flex flex-col gap-7 rounded-3xl bg-card p-8 mx-3 max-md:mx-2 max-md:mt-4 max-md:gap-3.5 max-md:rounded-xl max-md:p-3">
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-1.5 max-md:scroll-row max-md:gap-1.5">
            <FilterChip active href="/catalog" count={bouquets.length}>
              Все
            </FilterChip>
            {categories.map((category) => (
              <FilterChip
                key={category.slug}
                href={`/catalog/${category.slug}`}
                count={
                  bouquets.filter((bouquet) => bouquet.category === category.slug).length
                }
              >
                {category.shortTitle}
              </FilterChip>
            ))}
          </div>
          <span className="text-[15px] font-semibold whitespace-nowrap text-subtle max-md:hidden">
            {bouquets.length} {pluralBouquets(bouquets.length)}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-5">
          {bouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </section>

      {/* ЧЕТЫРЕ СОСТАВА */}
      <section className="flex flex-col gap-7 px-3 pt-19 max-md:gap-3 max-md:px-2 max-md:pt-8">
        <SectionHeading
          className="px-4 max-md:px-2"
          eyebrow="Как выбрать"
          title="Четыре состава"
          note="Разница между составами — во вкусе получателя, а не в цене: диапазоны почти одинаковые. Если сомневаетесь, отталкивайтесь от того, что человек точно ест."
        />

        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-2">
          {categories.map((category) => {
            const items = bouquets.filter(
              (bouquet) => bouquet.category === category.slug,
            );
            const prices = items.map((bouquet) => bouquet.priceFrom);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            const skin = toneSkins[categoryTone[category.slug]];
            const guide = categoryGuide[category.slug];

            const rows = [
              {
                label: 'Что внутри',
                value: [...new Set(items.flatMap((bouquet) => bouquet.composition))]
                  .filter((part) => part !== 'декор')
                  .slice(0, 4)
                  .join(', '),
              },
              {
                label: 'Цена',
                value:
                  min === max
                    ? `${min.toLocaleString('ru-RU')} ₽`
                    : `${min.toLocaleString('ru-RU')}–${max.toLocaleString('ru-RU')} ₽`,
              },
              { label: 'Кому', value: guide.fits },
              { label: 'Не стоит', value: guide.avoid },
            ];

            return (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className={[
                  'relative flex flex-col gap-4.5 overflow-hidden rounded-2xl px-6 pt-7 pb-6',
                  'transition-transform duration-150 ease-linear hover:-translate-y-1',
                  'max-md:gap-2.5 max-md:rounded-lg max-md:px-4.5 max-md:pt-4.5 max-md:pb-4',
                  skin.surface,
                ].join(' ')}
              >
                <Image
                  src={categoryImages[category.slug]}
                  alt=""
                  width={130}
                  height={130}
                  sizes="130px"
                  className={`pointer-events-none absolute -top-7.5 -right-7.5 size-32.5 rounded-full border-[6px] object-cover max-md:-top-4 max-md:-right-4 max-md:size-21 max-md:border-4 ${skin.ring}`}
                />
                <h3 className="pt-13 font-display text-[22px] font-bold max-md:pt-0 max-md:text-[18px]">
                  {category.shortTitle}
                </h3>
                <div className={`flex flex-col border-t-2 ${skin.rule} max-md:border-t-0`}>
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className={`flex flex-col gap-0.5 border-b py-2.75 max-md:flex-row max-md:gap-3.5 max-md:border-b-0 max-md:py-0.75 max-md:pr-14 ${skin.line}`}
                    >
                      <span className={`text-[12px] font-semibold ${skin.mute} max-md:text-[13px] max-md:w-20 max-md:flex-none max-md:font-normal`}>
                        {row.label}
                      </span>
                      <span className="text-[14px] font-semibold text-pretty max-md:text-[13px]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <span
                  className={`mt-auto self-start rounded-full px-4 py-2.25 text-[14px] font-semibold ${skin.pill} max-md:hidden`}
                >
                  {items.length} {pluralBouquets(items.length)}{' '}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <CtaBand
        eyebrow="Не выбрали"
        title="Опишите повод — соберём под него"
        text="Скажите, кому и на когда. Предложим состав в пределах бюджета."
        cta="Написать"
        ctaSource="catalog"
      />
    </>
  );
}
