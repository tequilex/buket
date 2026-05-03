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
    imageUrl: bouquet.images[0]?.src,
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
        {/* Левая колонка — фото */}
        <div className={styles.mediaColumn}>
          <div className={styles.imageWrap}>
            <Image
              src={bouquet.images[0].src}
              alt={bouquet.images[0].alt}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
          </div>
          {bouquet.tags.length > 0 && (
            <div className={styles.tags}>
              {bouquet.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Правая колонка — детали */}
        <div className={styles.details}>
          <div>
            <SectionHeading
              eyebrow="Карточка букета"
              title={bouquet.name}
              description={bouquet.fullDescription}
            />
          </div>

          {/* Цена и размер */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Цена</span>
              <span className={styles.priceValue}>от {bouquet.priceFrom} ₽</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statLabel}>Размер / вес</span>
              <span className={styles.sizeValue}>{bouquet.weightOrSize}</span>
            </div>
          </div>

          {/* Состав */}
          <div className={styles.compositionPanel}>
            <h2 className={styles.compositionTitle}>Что внутри</h2>
            <ul className={styles.compositionList}>
              {bouquet.composition.map((item) => (
                <li key={item} className={styles.compositionItem}>
                  <span className={styles.compositionDot} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Заметка о доставке */}
          <p className={styles.deliveryNote}>{bouquet.deliveryNote}</p>

          {/* Заметка об approximateness */}
          <p className={styles.approxNote}>
            Фото и состав букета являются примерными. Окончательный вариант согласовывается при оформлении заказа.
          </p>

          {/* Кнопки */}
          <ContactButtons source={`bouquet_${bouquet.slug}`} />
        </div>
      </section>

      {/* Доставка */}
      <section className={styles.deliveryPanel}>
        <div className={styles.deliveryMeta}>
          <div>
            <p className={styles.deliveryTitle}>Доставка по Краснодару и Яблоновскому</p>
            <p className={styles.deliveryText}>
              Уточним время, адрес и возможную замену ингредиентов в мессенджере.
            </p>
          </div>
          <div className={styles.locationLinks}>
            <Link href="/locations/krasnodar" className={styles.locationLink}>Краснодар</Link>
            <Link href="/locations/yablonovskiy" className={styles.locationLink}>Яблоновский</Link>
          </div>
        </div>
      </section>

      {relatedBouquets.length > 0 && (
        <section className={styles.relatedSection}>
          <SectionHeading
            eyebrow="Похожие букеты"
            title="Ещё в этой категории"
          />
          <div className={styles.relatedGrid}>
            {relatedBouquets.map((item) => (
              <BouquetCard key={item.slug} bouquet={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
