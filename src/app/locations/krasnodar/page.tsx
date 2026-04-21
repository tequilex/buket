import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, getLocationBySlug } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

const location = getLocationBySlug('krasnodar');

export const metadata: Metadata = location
  ? buildMetadata({
      title: location.seoTitle,
      description: location.seoDescription,
      path: '/locations/krasnodar',
    })
  : {};

const localBouquets = bouquets
  .filter((bouquet) => bouquet.availableLocations.includes('krasnodar'))
  .slice(0, 4);

export default function KrasnodarLocationPage() {
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
            Как работаем по Краснодару
          </p>
          <p className={styles.panelText}>
            {location.deliveryLead} По Краснодару чаще всего доступны удобные
            интервалы для доставки и быстрый заказ в течение дня.
          </p>
          <div className={styles.actionRow}>
            <ContactButtons source="location_krasnodar" />
          </div>
        </div>
      </section>

      <section className={styles.cardPanel}>
        <p className={styles.panelEyebrow}>
          Что удобно выбрать
        </p>
        <p className={styles.panelText}>
          По Краснодару чаще выбирают мясные, рыбные и сладкие букеты. Ниже
          можно быстро перейти в подходящую категорию и посмотреть варианты с
          доставкой по городу.
        </p>
        <div className={styles.pillLinks}>
          <Link
            href="/catalog/myasnye"
            className={styles.softPillLink}
          >
            Мясные
          </Link>
          <Link
            href="/catalog/rybnye"
            className={styles.softPillLink}
          >
            Рыбные
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
