import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FaqList } from '@/components/shared/faq-list';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icon';
import { Tag } from '@/components/ui/tag';
import {
  categories,
  getBouquetBySlug,
  getOccasionBySlug,
  occasions,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildFaqJsonLd, buildItemListJsonLd } from '@/lib/seo/structured-data';
import { pluralBouquets } from '@/lib/utils';

interface OccasionPageProps {
  params: Promise<{ slug: string }>;
}

/** Метка категории заменяет «Хит» на карточках подборки. */
const categoryBadges: Record<string, string> = {
  myasnye: 'Мясной',
  rybnye: 'Рыбный',
  sladkie: 'Сладкий',
  fruktovye: 'Фруктовый',
};

export async function generateStaticParams() {
  return occasions.map((occasion) => ({ slug: occasion.slug }));
}

export async function generateMetadata({
  params,
}: OccasionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    return buildMetadata({
      title: 'Страница не найдена',
      description: 'Запрошенная подборка не найдена.',
      path: `/occasions/${slug}`,
    });
  }

  return buildMetadata({
    title: occasion.seoTitle,
    description: occasion.seoDescription,
    path: `/occasions/${occasion.slug}`,
  });
}

export default async function OccasionPage({ params }: OccasionPageProps) {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    notFound();
  }

  const relatedBouquets = occasion.relatedBouquetSlugs
    .map((bouquetSlug) => getBouquetBySlug(bouquetSlug))
    .filter((item) => item !== undefined);

  const minPrice = Math.min(...relatedBouquets.map((item) => item.priceFrom));
  const usedCategories = [...new Set(relatedBouquets.map((item) => item.category))]
    .map((entry) => categories.find((item) => item.slug === entry)?.shortTitle)
    .filter(Boolean)
    .join(', ')
    .toLowerCase();

  return (
    <>
      <JsonLd
        id={`occasion-items-${occasion.slug}`}
        data={buildItemListJsonLd(relatedBouquets, occasion.title)}
      />
      {occasion.faqItems ? (
        <JsonLd
          id={`occasion-faq-${occasion.slug}`}
          data={buildFaqJsonLd(occasion.faqItems)}
        />
      ) : null}

      {/* БЕНТО: повод, соседние подборки, сводка */}
      <div className="grid grid-cols-[2fr_1fr] gap-3 px-3 max-lg:grid-cols-1 max-md:gap-2 max-md:px-2">
        <div className="relative row-span-2 flex min-h-120 flex-col justify-between gap-4 overflow-hidden rounded-3xl bg-primary bg-dots px-12 py-11 max-md:min-h-0 max-md:rounded-xl max-md:p-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-27.5 -right-20 size-100 rounded-full bg-white opacity-50 max-md:-top-15 max-md:-right-15 max-md:size-55"
          />
          <div aria-hidden="true" className="max-lg:hidden">
            <Image
              src={relatedBouquets[0].images[0].src}
              alt=""
              width={200}
              height={330}
              sizes="200px"
              className="absolute top-11 right-14 h-82.5 w-50 rounded-lg border-[6px] border-white object-cover shadow-photo"
            />
            <Image
              src={relatedBouquets[2]?.images[0].src ?? relatedBouquets[0].images[0].src}
              alt=""
              width={130}
              height={130}
              sizes="130px"
              className="absolute right-6 bottom-7 size-32.5 rounded-full border-[6px] border-white object-cover"
            />
          </div>

          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Каталог', href: '/catalog' },
              { label: occasion.title },
            ]}
          />

          <div className="relative mt-10 flex max-w-117.5 flex-col items-start gap-4.5 max-md:mt-0 max-md:gap-3.5">
            <span className="rounded-full bg-ink px-3.5 py-1.75 text-[13px] font-bold text-primary">
              Повод
            </span>
            <h1 className="font-display text-[46px] leading-[1.06] font-bold tracking-[-0.03em] text-ink text-balance max-lg:text-[38px] max-md:text-[28px] max-md:leading-[1.1]">
              {occasion.title}
            </h1>
            <p className="max-w-[40ch] text-[17px] text-ink text-pretty max-md:text-[14px]">
              {occasion.intro}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 rounded-2xl bg-card p-6.5 max-md:gap-2.5 max-md:rounded-xl max-md:p-4">
          <span className="text-[13px] font-bold text-subtle">Другие поводы</span>
          <div className="flex flex-col gap-1.5">
            {occasions.map((entry) => {
              const current = entry.slug === occasion.slug;
              const thumb = getBouquetBySlug(entry.relatedBouquetSlugs[0]);

              return (
                <Link
                  key={entry.slug}
                  href={`/occasions/${entry.slug}`}
                  aria-current={current ? 'page' : undefined}
                  className={[
                    'flex items-center gap-3 rounded-md p-2 text-ink',
                    current ? 'bg-primary-soft' : 'bg-page hover:bg-band',
                  ].join(' ')}
                >
                  {thumb ? (
                    <Image
                      src={thumb.images[0].src}
                      alt=""
                      width={48}
                      height={48}
                      sizes="48px"
                      className="size-12 flex-none rounded-sm object-cover"
                    />
                  ) : null}
                  <span className="flex-1 text-[15px] leading-[1.25] font-semibold">
                    {entry.shortTitle}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      'flex size-8 flex-none items-center justify-center rounded-full text-[14px] font-bold text-ink',
                      current ? 'bg-primary' : 'bg-card',
                    ].join(' ')}
                  >
                    {current ? '✓' : '→'}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl bg-ink p-6.5 text-white max-md:rounded-xl max-md:p-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-10 size-35 rounded-full bg-primary"
          />
          <span className="relative text-[13px] font-bold text-primary">В подборке</span>
          <div className="relative">
            <div className="font-display text-[30px] leading-[1.05] font-bold text-white max-md:text-[24px]">
              {relatedBouquets.length} {pluralBouquets(relatedBouquets.length)}
            </div>
            <div className="mt-1.5 text-[14px] text-mute-on-dark">
              от {minPrice.toLocaleString('ru-RU')} ₽ · {usedCategories}
            </div>
          </div>
        </div>
      </div>

      {/* БУКЕТЫ ПОДБОРКИ */}
      <section className="mx-3 mt-7 rounded-3xl bg-card p-8 max-md:mx-2 max-md:mt-4 max-md:rounded-xl max-md:p-3">
        <div className="grid grid-cols-4 gap-x-4 gap-y-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-5">
          {relatedBouquets.map((bouquet) => (
            <BouquetCard
              key={bouquet.slug}
              bouquet={bouquet}
              badge={categoryBadges[bouquet.category]}
              badgeTone="light"
            />
          ))}
        </div>
      </section>

      {/* О ПОВОДЕ */}
      <section className="mx-3 mt-16 grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:mx-2 max-md:mt-8 max-md:gap-2">
        {occasion.about.map((paragraph, position) => (
          <div
            key={paragraph.slice(0, 24)}
            className="flex flex-col gap-4 rounded-2xl bg-card p-8 max-md:gap-2.5 max-md:rounded-lg max-md:p-5"
          >
            <span
              aria-hidden="true"
              className="font-display text-[40px] leading-none font-extrabold text-transparent [-webkit-text-stroke:2px_#17181c] max-md:text-[28px]"
            >
              {String(position + 1).padStart(2, '0')}
            </span>
            <p className="text-[15px] leading-[1.6] text-body text-pretty max-md:text-[14px]">
              {paragraph}
            </p>
          </div>
        ))}
      </section>

      {/* СРОКИ */}
      <section className="relative mx-3 grid grid-cols-[0.8fr_1fr] items-center gap-12 overflow-hidden rounded-2xl bg-ink px-12 py-10 text-white max-lg:grid-cols-1 max-lg:gap-6 max-md:mx-2 max-md:rounded-xl max-md:p-5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-15 size-50 rounded-full border-2 border-[#2e2f35] max-md:hidden"
        />
        <div className="relative flex items-center gap-5">
          <span className="flex size-16 flex-none items-center justify-center rounded-full bg-primary max-md:size-12">
            <Icon name="calendar-clock" size={28} className="text-ink" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-semibold text-primary">Сроки</span>
            <h2 className="font-display text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-white max-md:text-[22px]">
              Когда заказывать
            </h2>
          </div>
        </div>
        <p className="relative text-[16px] text-[#d4d5da] text-pretty max-md:text-[14px]">
          {occasion.timing}
        </p>
      </section>

      <div className="flex flex-wrap gap-2 px-7 pt-2 max-md:px-4">
        <Tag href="/catalog">Весь каталог</Tag>
        <Tag href="/delivery">Доставка по Краснодару</Tag>
      </div>

      {occasion.faqItems ? (
        <section className="mx-3 mt-13 grid grid-cols-[0.8fr_1.4fr] gap-12 rounded-2xl bg-card p-10 max-lg:grid-cols-1 max-lg:gap-6 max-md:mx-2 max-md:mt-6 max-md:rounded-xl max-md:p-5">
          <div className="flex flex-col gap-2.5">
            <span className="text-[14px] font-semibold text-subtle">Вопросы</span>
            <h2 className="font-display text-[30px] leading-[1.1] font-bold tracking-[-0.03em] text-ink max-md:text-[22px]">
              Что уточняют перед заказом
            </h2>
          </div>
          <FaqList items={occasion.faqItems} />
        </section>
      ) : null}

      <CtaBand
        tone="yellow"
        eyebrow="Готовы собрать"
        title="Скажите повод — предложим состав"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource={`occasion_${occasion.slug}`}
      />
    </>
  );
}
