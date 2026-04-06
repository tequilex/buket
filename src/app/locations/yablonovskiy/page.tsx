import type { Metadata } from 'next';
import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, getLocationBySlug } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

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
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading
          eyebrow="Локация"
          title={location.title}
          description={location.shortDescription}
        />

        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Как работаем по Яблоновскому
          </p>
          <p className="mt-4 text-base leading-7 text-[var(--text)]">
            {location.deliveryLead} Для Яблоновского важно заранее уточнять
            адрес, ориентир и удобный интервал, чтобы доставка прошла без
            задержек.
          </p>
          <div className="mt-5">
            <ContactButtons source="location_yablonovskiy" />
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          Для локального SEO
        </p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--text)]">
          Здесь делаем отдельный акцент на Яблоновский как самостоятельную зону
          доставки, а не просто приписку к Краснодару. Это помогает не терять
          локальную релевантность в поиске и делает страницу полезной для
          жителей поселка.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/catalog/myasnye"
            className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
          >
            Мясные
          </Link>
          <Link
            href="/catalog/fruktovye"
            className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
          >
            Фруктовые
          </Link>
          <Link
            href="/catalog/sladkie"
            className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
          >
            Сладкие
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {localBouquets.map((bouquet) => (
          <BouquetCard key={bouquet.slug} bouquet={bouquet} />
        ))}
      </section>
    </div>
  );
}
