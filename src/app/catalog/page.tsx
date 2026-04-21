import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
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
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]} />

      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <SectionHeading
            eyebrow="Каталог"
            title="Каталог съедобных букетов"
            description="Мясные, рыбные, сладкие и фруктовые букеты собраны в один спокойный каталог, чтобы проще сравнить формат, подачу и бюджет."
          />
          <p className={styles.introText}>
            Начните с категории, если уже понимаете состав, или пролистайте
            популярные позиции ниже, чтобы быстро сориентироваться по формату.
          </p>
        </div>

        <div className={styles.categoryNav}>
          <p className={styles.panelTitle}>Быстрый переход</p>
          <div className={styles.pillLinks}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className={styles.softPillLink}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

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
          eyebrow="Популярное"
          title="Популярные букеты"
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
