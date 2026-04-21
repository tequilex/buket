import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, categories } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);

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
    <div className={`page-shell ${styles.page}`}>
      <SectionHeading
        eyebrow="Каталог"
        title="Съедобные букеты по составу"
        description="Основной каталог по составу: мясные, рыбные, сладкие и фруктовые букеты для разных поводов и настроения подарка."
      />

      <section className={styles.categoryGrid}>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className={styles.categoryCard}
          >
            <p className={styles.panelEyebrow}>
              Категория
            </p>
            <h2 className={styles.categoryTitle}>
              {category.title}
            </h2>
            <p className={styles.categoryDescription}>
              {category.heroDescription}
            </p>
          </Link>
        ))}
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Хиты"
          title="С чего начать выбор"
          description="Несколько букетов, которые помогают быстро понять формат, подачу и примерный бюджет."
        />
        <div className={styles.bouquetGridDense}>
          {featuredBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </section>
    </div>
  );
}
