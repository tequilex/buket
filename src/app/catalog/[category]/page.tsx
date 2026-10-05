import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { PageHeader } from '@/components/shared/page-header';
import { CtaBand } from '@/components/ui/cta-band';
import { FilterChip } from '@/components/ui/filter-chip';
import { Tag } from '@/components/ui/tag';
import {
  categories,
  getBouquetsByCategory,
  getShortCategoryTitle,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const contextualOccasionLinks = [
  { href: '/occasions/muzhskie', label: 'мужские букеты' },
  { href: '/occasions/23-fevralya', label: 'на 23 февраля' },
  { href: '/occasions/den-rozhdeniya', label: 'на день рождения' },
  { href: '/occasions/podarok-kollege', label: 'подарок коллеге' },
];

const contextualLocationLinks = [
  { href: '/locations/krasnodar', label: 'Краснодар' },
  { href: '/locations/yablonovskiy', label: 'Яблоновский' },
];

function plural(count: number) {
  if (count === 1) return 'букет';
  return count < 5 ? 'букета' : 'букетов';
}

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

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: getShortCategoryTitle(categoryEntry.title) },
        ]}
        eyebrow={`Состав ${String(index + 1).padStart(2, '0')}`}
        title={categoryEntry.title}
        lead={categoryEntry.heroDescription}
      />

      <div className="page-container flex flex-col gap-6.5 pt-10 pb-22">
        <div className="flex flex-wrap items-center justify-between gap-4.5">
          <div className="flex flex-wrap gap-2">
            <FilterChip href="/catalog">Все</FilterChip>
            {categories.map((entry) => (
              <FilterChip
                key={entry.slug}
                href={`/catalog/${entry.slug}`}
                active={entry.slug === categoryEntry.slug}
              >
                {getShortCategoryTitle(entry.title)}
              </FilterChip>
            ))}
          </div>
          <span className="type-label text-mute">
            {categoryBouquets.length} {plural(categoryBouquets.length)}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {categoryBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>

        <div className="flex flex-col gap-4.5 bg-band p-5">
          <div className="flex flex-col gap-3">
            <p className="type-label text-mute">Поводы</p>
            <div className="flex flex-wrap gap-2">
              {contextualOccasionLinks.map((item) => (
                <Tag key={item.href} href={item.href}>
                  {item.label}
                </Tag>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="type-label text-mute">Где доставляем</p>
            <div className="flex flex-wrap gap-2">
              {contextualLocationLinks.map((item) => (
                <Tag key={item.href} href={item.href}>
                  {item.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CtaBand
        eyebrow="Не выбрали"
        title="Опишите повод — соберём под него"
        text="Скажите, кому и на когда. Предложим состав в пределах бюджета."
        cta="Написать"
        ctaSource={`catalog_${categoryEntry.slug}`}
      />
    </div>
  );
}
