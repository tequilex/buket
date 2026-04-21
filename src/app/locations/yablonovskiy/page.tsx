import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
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
    <div className={styles.page}>
      <section className={styles.split}>
        <SectionHeading
          eyebrow="Локация"
          title={location.title}
          description={location.shortDescription}
        />

        <div className={styles.surfacePanel}>
          <p className={styles.panelEyebrow}>
            Как работаем по Яблоновскому
          </p>
          <p className={styles.panelText}>
            {location.deliveryLead} Для Яблоновского важно заранее уточнять
            адрес, ориентир и удобный интервал, чтобы доставка прошла без
            задержек.
          </p>
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

      <section className={styles.bouquetGridStandard}>
        {localBouquets.map((bouquet) => (
          <BouquetCard key={bouquet.slug} bouquet={bouquet} />
        ))}
      </section>
    </div>
  );
}
