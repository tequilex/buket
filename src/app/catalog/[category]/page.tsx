import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { categories, getBouquetsByCategory } from '@/lib/content/catalog';
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

  return (
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <SectionHeading
        eyebrow="Категория"
        title={categoryEntry.title}
        description={categoryEntry.heroDescription}
      />

      <div className="grid gap-4 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">Поводы</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {contextualOccasionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">Где доставляем</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {contextualLocationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        {categoryBouquets.map((bouquet) => (
          <BouquetCard key={bouquet.slug} bouquet={bouquet} />
        ))}
      </section>
    </div>
  );
}
