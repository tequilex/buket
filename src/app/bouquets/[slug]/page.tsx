import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  bouquets,
  categories,
  getBouquetBySlug,
  getBouquetsByCategory,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildBouquetProductJsonLd } from '@/lib/seo/structured-data';
import styles from '@/app/bouquet-page.module.scss';

interface BouquetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bouquets.map((bouquet) => ({ slug: bouquet.slug }));
}

export async function generateMetadata({
  params,
}: BouquetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) {
    return buildMetadata({
      title: 'Букет не найден',
      description: 'Запрошенный букет не найден.',
      path: `/bouquets/${slug}`,
    });
  }

  return buildMetadata({
    title: bouquet.seoTitle,
    description: bouquet.seoDescription,
    path: `/bouquets/${bouquet.slug}`,
  });
}

export default async function BouquetPage({ params }: BouquetPageProps) {
  const { slug } = await params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) {
    notFound();
  }

  const category = categories.find((entry) => entry.slug === bouquet.category);
  const relatedBouquets = getBouquetsByCategory(bouquet.category)
    .filter((entry) => entry.slug !== bouquet.slug)
    .slice(0, 2);

  return (
    <div className={styles.page}>
      <JsonLd
        id={`bouquet-product-${bouquet.slug}`}
        data={buildBouquetProductJsonLd(bouquet)}
      />

      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          category ? { label: category.title, href: `/catalog/${category.slug}` } : undefined,
          { label: bouquet.name },
        ].filter((item): item is { label: string; href?: string } => Boolean(item))}
      />

      <section className={styles.hero}>
        <div className={styles.mediaColumn}>
          <div className={styles.imageWrap}>
            <Image
              src={bouquet.images[0].src}
              alt={bouquet.images[0].alt}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>
          <div className={styles.tagGrid}>
            {bouquet.tags.map((tag) => (
              <div
                key={tag}
                className={styles.tagCard}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <SectionHeading
            eyebrow="Карточка букета"
            title={bouquet.name}
            description={bouquet.fullDescription}
          />

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>
                Цена
              </p>
              <p className={styles.priceValue}>
                от {bouquet.priceFrom} ₽
              </p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>
                Размер
              </p>
              <p className={styles.sizeValue}>
                {bouquet.weightOrSize}
              </p>
            </div>
          </div>

          <div className={styles.compositionPanel}>
            <div>
              <h2 className={styles.compositionTitle}>Что внутри</h2>
              <ul className={styles.compositionList}>
                {bouquet.composition.map((item) => (
                  <li key={item} className={styles.compositionItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.deliveryNote}>
              {bouquet.deliveryNote}
            </div>
            <ContactButtons
              source={`bouquet_${bouquet.slug}_primary`}
              className={styles.actions}
            />
          </div>
        </div>
      </section>

      <section className={styles.deliveryPanel}>
        <p className={styles.statLabel}>
          Доставка
        </p>
        <p className={styles.deliveryText}>
          Работаем по Краснодару и Яблоновскому. Для уточнения времени,
          адреса и возможной замены ингредиентов лучше сразу написать в удобный
          канал связи.
        </p>
        <div className={styles.locationLinks}>
          <Link
            href="/locations/krasnodar"
            className={styles.locationLink}
          >
            Краснодар
          </Link>
          <Link
            href="/locations/yablonovskiy"
            className={styles.locationLink}
          >
            Яблоновский
          </Link>
        </div>
        <div className={styles.secondaryActions}>
          <ContactButtons source={`bouquet_${bouquet.slug}_secondary`} />
        </div>
      </section>

      {relatedBouquets.length > 0 ? (
        <section className={styles.relatedSection}>
          <SectionHeading
            eyebrow="Похожие букеты"
            title="Еще в этой категории"
            description="Похожие позиции внутри той же категории, чтобы пользователь мог быстро сравнить варианты."
          />
          <div className={styles.relatedGrid}>
            {relatedBouquets.map((item) => (
              <BouquetCard key={item.slug} bouquet={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
