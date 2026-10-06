import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { JsonLd } from '@/components/seo/json-ld';
import { FaqList } from '@/components/shared/faq-list';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { CtaBand } from '@/components/ui/cta-band';
import { bouquets, categories, faqs, reviews } from '@/lib/content/catalog';
import { buildFaqJsonLd, buildItemListJsonLd } from '@/lib/seo/structured-data';
import type { LocationEntry } from '@/lib/content/schemas';
import { pluralBouquets } from '@/lib/utils';

interface LocationScreenProps {
  location: LocationEntry;
}

/**
 * Локальная посадочная. Отличается от главной и от доставки тем, что
 * привязана к городу: ассортимент, отзывы здешних заказчиков и условия
 * именно для этого адреса. Механика доставки целиком живёт на /delivery/
 * и сюда не переносится, иначе страница станет дублем.
 */
export function LocationScreen({ location }: LocationScreenProps) {
  const localBouquets = bouquets.filter((bouquet) =>
    bouquet.availableLocations.includes(location.slug),
  );
  const localReviews = reviews.filter((review) => review.location === location.slug);

  return (
    <>
      <JsonLd
        id={`location-items-${location.slug}`}
        data={buildItemListJsonLd(localBouquets, location.title)}
      />
      <JsonLd id={`location-faq-${location.slug}`} data={buildFaqJsonLd(faqs)} />

      <PageHeader
        tone="gray"
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Доставка', href: '/delivery' },
          { label: location.city },
        ]}
        eyebrow={location.city}
        title={location.title}
        lead={location.deliveryLead}
        photos={[
          { src: '/images/bouquets/5.webp', alt: '' },
          { src: '/images/bouquets/3.webp', alt: '' },
          { src: '/images/bouquets/10.webp', alt: '' },
        ]}
      />

      {/* КАК ВОЗИМ СЮДА */}
      <section className="flex flex-col gap-7 px-3 pt-19 max-md:gap-3 max-md:px-2 max-md:pt-8">
        <SectionHeading
          className="px-4 max-md:px-2"
          eyebrow="Как возим"
          title={`Доставка в ${location.city === 'Краснодар' ? 'Краснодар' : 'Яблоновский'}`}
          note={
            <>
              Полные условия, стоимость и сроки —{' '}
              <Link
                href="/delivery"
                className="font-semibold text-ink underline decoration-primary decoration-[3px] underline-offset-4"
              >
                на странице доставки
              </Link>
              .
            </>
          }
        />

        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:gap-2">
          {location.about.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="rounded-2xl bg-card p-7 text-[15px] text-mute text-pretty max-md:rounded-lg max-md:p-4.5 max-md:text-[14px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* АССОРТИМЕНТ */}
      <section className="mt-16 flex flex-col gap-7 rounded-3xl bg-card p-8 mx-3 max-md:mx-2 max-md:mt-8 max-md:gap-3.5 max-md:rounded-xl max-md:p-3">
        <SectionHeading
          size="md"
          eyebrow="Что можно заказать"
          title={`${localBouquets.length} ${pluralBouquets(localBouquets.length)} с доставкой`}
          note={`Состав любого согласуем до сборки. ${categories.map((c) => c.shortTitle).join(', ')} — четыре направления.`}
        />

        <div className="grid grid-cols-4 gap-x-4 gap-y-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-5">
          {localBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </section>

      {/* ОТЗЫВЫ ИЗ ЭТОГО ГОРОДА */}
      {localReviews.length > 0 ? (
        <section className="flex flex-col gap-7 px-3 pt-16 max-md:gap-3 max-md:px-2 max-md:pt-8">
          <SectionHeading
            className="px-4 max-md:px-2"
            eyebrow="Отзывы"
            title={`Что пишут из ${location.city === 'Краснодар' ? 'Краснодара' : 'Яблоновского'}`}
          />

          <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:gap-2">
            {localReviews.slice(0, 3).map((review) => (
              <figure
                key={review.author}
                className="flex flex-col gap-4 rounded-2xl bg-card p-7 max-md:rounded-lg max-md:p-4.5"
              >
                <blockquote className="text-[15px] text-mute text-pretty max-md:text-[14px]">
                  {review.text}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="flex size-10 flex-none items-center justify-center rounded-full bg-primary font-display font-bold text-ink">
                    {review.author.charAt(0)}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[15px] font-bold text-ink">{review.author}</span>
                    <span className="text-[13px] text-subtle">{review.sourceLabel}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ВОПРОСЫ */}
      <section className="flex flex-col gap-7 px-3 pt-16 max-md:gap-3 max-md:px-2 max-md:pt-8">
        <SectionHeading
          className="px-4 max-md:px-2"
          eyebrow="Вопросы"
          title="Коротко о главном"
        />
        <div className="rounded-3xl bg-card p-8 max-md:rounded-xl max-md:p-4">
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        eyebrow="Готовы собрать"
        title={`Привезём по адресу в ${location.city === 'Краснодар' ? 'Краснодаре' : 'Яблоновском'}`}
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource={`location_${location.slug}`}
      />
    </>
  );
}
