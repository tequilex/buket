import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, getLocationBySlug } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

const location = getLocationBySlug('yablonovskiy');

export const metadata: Metadata = location
  ? buildMetadata({
      title: location.seoTitle,
      description: location.seoDescription,
      path: '/locations/yablonovskiy',
    })
  : {};

const localBouquets = bouquets
  .filter((bouquet) => bouquet.availableLocations.includes('yablonovskiy'))
  .slice(0, 4);

export default function YablonovskiyLocationPage() {
  if (!location) {
    return null;
  }

  return (
    <div className={`page-shell ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Локации', href: '/delivery' },
          { label: location.title },
        ]}
      />

      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <SectionHeading
            eyebrow="Локация"
            title={location.title}
            description={location.shortDescription}
          />
          <p className={styles.introText}>
            {location.deliveryLead} Для Яблоновского важно заранее уточнять
            адрес, ориентир и удобный интервал, чтобы доставка прошла без
            задержек.
          </p>
        </div>

        <div className={styles.categoryNav}>
          <p className={styles.panelTitle}>Быстрый заказ</p>
          <div className={styles.actionRow}>
            <ContactButtons source="location_yablonovskiy" />
          </div>
        </div>
      </section>

      <section className={styles.cardPanel}>
        <p className={styles.panelEyebrow}>
          Что удобно выбрать
        </p>
        <p className={styles.panelText}>
          Для Яблоновского особенно удобно выбирать универсальные подарочные
          варианты, которые легко согласовать по составу и времени доставки.
        </p>
        <div className={styles.pillLinks}>
          <Link
            href="/catalog/myasnye"
            className={styles.softPillLink}
          >
            Мясные
          </Link>
          <Link
            href="/catalog/fruktovye"
            className={styles.softPillLink}
          >
            Фруктовые
          </Link>
          <Link
            href="/catalog/sladkie"
            className={styles.softPillLink}
          >
            Сладкие
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Подборка"
          title="Популярные букеты для Яблоновского"
          description="Подборка вариантов, которые удобно согласовать по времени и составу для этой локации."
        />
        <div className={styles.bouquetGridStandard}>
        {localBouquets.map((bouquet) => (
          <BouquetCard key={bouquet.slug} bouquet={bouquet} />
        ))}
        </div>
      </section>
    </div>
  );
}
