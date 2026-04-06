import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FaqList } from '@/components/shared/faq-list';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  getBouquetBySlug,
  getOccasionBySlug,
  occasions,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

interface OccasionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return occasions.map((occasion) => ({ slug: occasion.slug }));
}

export async function generateMetadata({
  params,
}: OccasionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    return buildMetadata({
      title: 'Страница не найдена',
      description: 'Запрошенная подборка не найдена.',
      path: `/occasions/${slug}`,
    });
  }

  return buildMetadata({
    title: occasion.seoTitle,
    description: occasion.seoDescription,
    path: `/occasions/${occasion.slug}`,
  });
}

export default async function OccasionPage({ params }: OccasionPageProps) {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    notFound();
  }

  const relatedBouquets = occasion.relatedBouquetSlugs
    .map((bouquetSlug) => getBouquetBySlug(bouquetSlug))
    .filter((item) => Boolean(item));

  return (
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Поводы', href: '/catalog' },
          { label: occasion.title },
        ]}
      />

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading
          eyebrow="Повод"
          title={occasion.title}
          description={occasion.intro}
        />

        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Полезные переходы
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)]"
            >
              Весь каталог
            </Link>
            <Link
              href="/locations/krasnodar"
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)]"
            >
              Краснодар
            </Link>
            <Link
              href="/locations/yablonovskiy"
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)]"
            >
              Яблоновский
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {relatedBouquets.map((bouquet) =>
          bouquet ? <BouquetCard key={bouquet.slug} bouquet={bouquet} /> : null,
        )}
      </section>

      {occasion.faqItems ? (
        <section className="space-y-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Что часто уточняют перед заказом"
            description="Небольшой FAQ для конкретного повода, чтобы снимать типовые вопросы без лишней переписки."
          />
          <FaqList items={occasion.faqItems} />
        </section>
      ) : null}
    </div>
  );
}
