import { BouquetCard } from '@/components/catalog/bouquet-card';
import { FaqList } from '@/components/shared/faq-list';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { CtaBand } from '@/components/ui/cta-band';
import { Tag } from '@/components/ui/tag';
import {
  bouquets,
  categories,
  faqs,
  getShortCategoryTitle,
} from '@/lib/content/catalog';
import type { CategorySlug, LocationEntry } from '@/lib/content/schemas';

interface LocationScreenProps {
  location: LocationEntry;
  /** Абзац о том, как здесь устроена доставка. */
  note: string;
  /** Что чаще берут в этой локации. */
  categorySlugs: CategorySlug[];
}

/** Локальная посадочная: графитовая шапка, витрина, вопросы, CTA. */
export function LocationScreen({ location, note, categorySlugs }: LocationScreenProps) {
  const localBouquets = bouquets
    .filter((bouquet) => bouquet.availableLocations.includes(location.slug))
    .slice(0, 4);

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Доставка', href: '/delivery' },
          { label: location.title },
        ]}
        eyebrow="Локация"
        title={location.title}
        lead={location.shortDescription}
      />

      <div className="page-container flex flex-col gap-10 py-22">
        <SectionHeading eyebrow="Как возим" title="Доставка и сроки" lead={note} />

        <div className="flex flex-wrap gap-2">
          {categorySlugs.map((slug) => {
            const category = categories.find((entry) => entry.slug === slug);
            if (!category) return null;

            return (
              <Tag key={slug} href={`/catalog/${slug}`}>
                {getShortCategoryTitle(category.title)}
              </Tag>
            );
          })}
          <Tag href="/catalog">Весь каталог</Tag>
        </div>

        <div className="grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {localBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </div>

      <div className="bg-band py-22">
        <div className="page-container flex flex-col gap-10">
          <SectionHeading eyebrow="Вопросы" title="Коротко о главном" />
          <FaqList items={faqs} />
        </div>
      </div>

      <CtaBand
        tone="dark"
        eyebrow="Готовы собрать"
        title={`Привезём по адресу — ${location.title.replace(/^Съедобные букеты\s+/iu, '')}`}
        text="Напишите в удобный канал. Согласуем состав, дату и интервал доставки."
        cta="Написать"
        ctaSource={`location_${location.slug}`}
      />
    </div>
  );
}
