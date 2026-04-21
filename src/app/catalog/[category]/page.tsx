import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { categories, getBouquetsByCategory } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

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
    <div className={`page-shell ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: categoryEntry.title },
        ]}
      />

      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <SectionHeading
            eyebrow="Категория"
            title={categoryEntry.title}
            description={categoryEntry.heroDescription}
          />
          <p className={styles.introText}>
            В этой подборке собраны букеты с похожим настроением и составом,
            чтобы выбрать подходящий вариант было проще.
          </p>
        </div>

        <div className={styles.categoryNav}>
          <p className={styles.panelTitle}>Другие разделы</p>
          <div className={styles.pillLinks}>
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/catalog/${item.slug}`}
                className={styles.softPillLink}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className={`${styles.surfacePanel} ${styles.infoGrid}`}>
        <div>
          <p className={styles.panelEyebrow}>Подходит для</p>
          <p className={styles.panelTitle}>Поводы и сценарии</p>
          <div className={styles.pillLinks}>
            {contextualOccasionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.pillLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.panelEyebrow}>Доставка</p>
          <p className={styles.panelTitle}>Где доставляем</p>
          <div className={styles.pillLinks}>
            {contextualLocationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.pillLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.bouquetGridDense}>
        {categoryBouquets.map((bouquet) => (
          <BouquetCard key={bouquet.slug} bouquet={bouquet} />
        ))}
      </section>
    </div>
  );
}
