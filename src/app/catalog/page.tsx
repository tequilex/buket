import type { Metadata } from 'next';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { PageHeader } from '@/components/shared/page-header';
import { CtaBand } from '@/components/ui/cta-band';
import { FilterChip } from '@/components/ui/filter-chip';
import { JsonLd } from '@/components/seo/json-ld';
import { bouquets, categories, getShortCategoryTitle } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildItemListJsonLd } from '@/lib/seo/structured-data';

function plural(count: number) {
  if (count === 1) return 'букет';
  return count < 5 ? 'букета' : 'букетов';
}

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Каталог съедобных букетов',
    description:
      'Каталог мясных, рыбных, сладких и фруктовых съедобных букетов с доставкой по Краснодару и Яблоновскому.',
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
                {getShortCategoryTitle(category.title)}
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
