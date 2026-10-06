import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { OrderPromptCard } from '@/components/catalog/order-prompt-card';
import { JsonLd } from '@/components/seo/json-ld';
import { PageHeader } from '@/components/shared/page-header';
import { CtaBand } from '@/components/ui/cta-band';
import { FilterChip } from '@/components/ui/filter-chip';
import { Icon, type IconName } from '@/components/ui/icon';
import { Tag } from '@/components/ui/tag';
import { categories, getBouquetsByCategory, occasions } from '@/lib/content/catalog';
import { categoryImages, categoryTone } from '@/lib/content/category-theme';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildItemListJsonLd } from '@/lib/seo/structured-data';
import { pluralBouquets } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/** Абзацы `about` идут в одном порядке: состав — кому — что учесть. */
const aboutIcons: IconName[] = ['package', 'gift', 'triangle-alert'];

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryEntry = categories.find((entry) => entry.slug === category);

  if (!categoryEntry) {
    return buildMetadata({
      title: 'Категория не найдена',
      description: 'Запрошенная категория съедобных букетов не найдена.',
      path: `/catalog/${category}`,
    });
  }

  return buildMetadata({
    title: `${categoryEntry.title} в Краснодаре и Яблоновском`,
    description: `${categoryEntry.heroDescription} Доставка по Краснодару и Яблоновскому.`,
    path: `/catalog/${categoryEntry.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryEntry = categories.find((entry) => entry.slug === category);

  if (!categoryEntry) {
    notFound();
  }

  const categoryBouquets = getBouquetsByCategory(categoryEntry.slug);
  const index = categories.findIndex((entry) => entry.slug === categoryEntry.slug);
  const tone = categoryTone[categoryEntry.slug];
  const fillerSpan = Math.max(0, 4 - categoryBouquets.length);

  return (
    <>
      <JsonLd
        id={`category-items-${categoryEntry.slug}`}
        data={buildItemListJsonLd(categoryBouquets, categoryEntry.title)}
      />

      <PageHeader
        tone={tone}
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: categoryEntry.shortTitle },
        ]}
        eyebrow={`Состав ${String(index + 1).padStart(2, '0')}`}
        title={categoryEntry.title}
        lead={categoryEntry.heroDescription}
        photos={[
          {
            src: (categoryBouquets[1] ?? categoryBouquets[0]).images[0].src,
            alt: '',
          },
          { src: categoryBouquets[0].images[0].src, alt: '' },
          { src: categoryImages[categoryEntry.slug], alt: '' },
        ]}
      />

      {/* ВЫДАЧА КАТЕГОРИИ */}
      <section className="mx-3 mt-7 flex flex-col gap-7 rounded-3xl bg-card p-8 max-md:mx-2 max-md:mt-4 max-md:gap-3.5 max-md:rounded-xl max-md:p-3">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5 max-md:scroll-row max-md:gap-1.5">
            <Link
              href="/catalog"
              className="flex-none py-2.25 pr-3.5 pl-1 text-[15px] font-semibold text-mute hover:text-ink max-md:hidden"
            >
              ← Весь каталог
            </Link>
            {categories.map((entry) => (
              <FilterChip
                key={entry.slug}
                href={`/catalog/${entry.slug}`}
                active={entry.slug === categoryEntry.slug}
              >
                {entry.shortTitle}
              </FilterChip>
            ))}
          </div>
          <span className="text-[15px] font-semibold whitespace-nowrap text-subtle max-md:hidden">
            {categoryBouquets.length} {pluralBouquets(categoryBouquets.length)}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-5">
          {categoryBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
          {fillerSpan > 0 ? (
            <OrderPromptCard
              span={fillerSpan}
              source={`category_${categoryEntry.slug}_filler`}
              title="Опишите повод — соберём под него"
              text="Скажите, кому и на когда. Предложим состав в пределах бюджета."
              className="max-lg:col-span-full"
            />
          ) : null}
        </div>
      </section>

      {/* О КАТЕГОРИИ */}
      <section className="mx-3 mt-16 grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:mx-2 max-md:mt-8 max-md:gap-2">
        {categoryEntry.about.map((paragraph, position) => {
          const caution = position === 2;

          return (
            <div
              key={paragraph.slice(0, 24)}
              className={[
                'flex flex-col gap-4 rounded-2xl p-8 max-md:gap-3 max-md:rounded-lg max-md:p-5',
                caution ? 'bg-primary-soft' : 'bg-card',
              ].join(' ')}
            >
              <span
                className={[
                  'flex size-12 items-center justify-center rounded-full',
                  caution ? 'bg-card' : 'bg-primary',
                ].join(' ')}
              >
                <Icon name={aboutIcons[position] ?? 'package'} size={22} className="text-ink" />
              </span>
              <p className="text-[15px] leading-[1.6] text-body text-pretty max-md:text-[14px]">
                {paragraph}
              </p>
            </div>
          );
        })}
      </section>

      {/* ПОВОДЫ И ДОСТАВКА */}
      <section className="mx-3 grid grid-cols-[1fr_auto] items-center gap-8 rounded-2xl bg-card px-8 py-7 max-lg:grid-cols-1 max-lg:gap-4 max-md:mx-2 max-md:rounded-lg max-md:p-5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[14px] font-bold text-subtle">Поводы</span>
          {occasions.map((occasion) => (
            <Tag key={occasion.slug} href={`/occasions/${occasion.slug}`} arrow={false}>
              {occasion.shortTitle.toLowerCase()}
            </Tag>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-subtle">Доставка</span>
          <Link
            href="/delivery"
            className="rounded-full bg-primary px-4.5 py-2.5 text-[14px] font-semibold text-ink hover:bg-primary-pressed"
          >
            Краснодар и Яблоновский <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="Не выбрали"
        title="Опишите повод — соберём под него"
        text="Скажите, кому и на когда. Предложим состав в пределах бюджета."
        cta="Написать"
        ctaSource={`catalog_${categoryEntry.slug}`}
      />
    </>
  );
}
