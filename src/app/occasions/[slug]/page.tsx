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
import styles from '@/app/internal-page.module.scss';

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
    <div className={`page-shell ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Поводы', href: '/catalog' },
          { label: occasion.title },
        ]}
      />

      <section className={styles.split}>
        <SectionHeading
          eyebrow="Повод"
          title={occasion.title}
          description={occasion.intro}
        />

        <div className={styles.surfacePanel}>
          <p className={styles.panelEyebrow}>
            Полезные переходы
          </p>
          <div className={styles.pillLinks}>
            <Link
              href="/catalog"
              className={styles.pillLink}
            >
              Весь каталог
            </Link>
            <Link
              href="/locations/krasnodar"
              className={styles.pillLink}
            >
              Краснодар
            </Link>
            <Link
              href="/locations/yablonovskiy"
              className={styles.pillLink}
            >
              Яблоновский
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.bouquetGridStandard}>
        {relatedBouquets.map((bouquet) =>
          bouquet ? <BouquetCard key={bouquet.slug} bouquet={bouquet} /> : null,
        )}
      </section>

      {occasion.faqItems ? (
        <section className={styles.section}>
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
