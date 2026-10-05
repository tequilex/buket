import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { FilterChip } from '@/components/ui/filter-chip';
import { JsonLd } from '@/components/seo/json-ld';
import { bouquets, categories } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildItemListJsonLd } from '@/lib/seo/structured-data';

function plural(count: number) {
  if (count === 1) return 'букет';
  return count < 5 ? 'букета' : 'букетов';
}

/** Сводка по категории для таблицы сравнения. Цены считаются из данных. */
const categoryGuide: Record<string, { fits: string; avoid: string }> = {
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
    <div>
      <JsonLd
        id="catalog-items"
        data={buildItemListJsonLd(bouquets, 'Каталог съедобных букетов')}
      />

      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]}
        eyebrow="Весь каталог"
        title="Все съедобные букеты"
        lead="Десять готовых букетов. Состав любого согласуем до сборки — можно вычеркнуть строку или собрать под бюджет."
      />

      <div className="page-container flex flex-col gap-6.5 pt-10 pb-22">
        <div className="flex flex-wrap items-center justify-between gap-4.5">
          <div className="flex flex-wrap gap-2">
            <FilterChip active href="/catalog">
              Все
            </FilterChip>
            {categories.map((category) => (
              <FilterChip key={category.slug} href={`/catalog/${category.slug}`}>
                {category.shortTitle}
              </FilterChip>
            ))}
          </div>
          <span className="type-label text-mute">
            {bouquets.length} {plural(bouquets.length)}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {bouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </div>

      {/* СРАВНЕНИЕ СОСТАВОВ */}
      <div className="bg-band py-22">
        <div className="page-container">
          <div className="flex flex-wrap items-end justify-between gap-6.5">
            <SectionHeading eyebrow="Как выбрать" title="Четыре состава" />
            <p className="max-w-[46ch] text-sm text-mute text-pretty">
              Разница между составами — во вкусе получателя, а не в цене: диапазоны
              почти одинаковые. Если сомневаетесь, отталкивайтесь от того, что человек
              точно ест.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
            {categories.map((category) => {
              const items = bouquets.filter((b) => b.category === category.slug);
              const prices = items.map((b) => b.priceFrom);
              const guide = categoryGuide[category.slug];

              return (
                <Link
                  key={category.slug}
                  href={`/catalog/${category.slug}`}
                  className="group flex flex-col gap-3 bg-card p-4.5"
                >
                  <h3 className="type-heading-md text-ink">{category.shortTitle}</h3>
                  <div>
                    <Spec
                      label="Что внутри"
                      value={[...new Set(items.flatMap((b) => b.composition))]
                        .filter((c) => c !== 'декор')
                        .slice(0, 4)
                        .join(', ')}
                    />
                    <Spec
                      label="Цена"
                      value={
                        Math.min(...prices) === Math.max(...prices)
                          ? `${Math.min(...prices)} ₽`
                          : `${Math.min(...prices)}–${Math.max(...prices)} ₽`
                      }
                    />
                    <Spec label="Кому" value={guide.fits} />
                    <Spec label="Не стоит" value={guide.avoid} />
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 pt-1 type-button text-primary transition-[gap] duration-140 ease-linear group-hover:gap-3.25">
                    {items.length} {plural(items.length)} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <CtaBand
        eyebrow="Не выбрали"
        title="Опишите повод — соберём под него"
        text="Скажите, кому и на когда. Предложим состав в пределах бюджета."
        cta="Написать"
        ctaSource="catalog"
      />
    </div>
  );
}
