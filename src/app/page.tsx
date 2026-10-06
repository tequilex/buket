import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactChannels } from '@/components/cta/contact-channels';
import {
  CategoryPicker,
  type CategoryTile,
} from '@/components/home/category-picker';
import { Hero } from '@/components/home/hero';
import { JsonLd } from '@/components/seo/json-ld';
import { FaqList } from '@/components/shared/faq-list';
import { Icon, type IconName } from '@/components/ui/icon';
import { StepsBand } from '@/components/ui/step-card';
import { Ticker } from '@/components/ui/ticker';
import {
  bouquets,
  categories,
  faqs,
  getBouquetBySlug,
  getDisplayName,
  occasions,
  reviews,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildLocalBusinessJsonLd,
} from '@/lib/seo/structured-data';
import { pluralBouquets } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Съедобные букеты с доставкой в Краснодаре и Яблоновском',
  description:
    'Авторские съедобные букеты из фруктов, мяса, рыбы и сладостей. Доставка по Краснодару и Яблоновскому в день заказа. Состав букета согласуется индивидуально.',
  path: '/',
});

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);
const entryPrice = Math.min(...bouquets.map((bouquet) => bouquet.priceFrom));

/** Кадр категории для плитки. Витринная величина, в данных её нет. */
const categoryImages: Record<string, string> = {
  myasnye: '/images/bouquets/9.webp',
  rybnye: '/images/bouquets/11.webp',
  sladkie: '/images/bouquets/3.webp',
  fruktovye: '/images/bouquets/10.webp',
};

const categoryTiles: CategoryTile[] = categories.map((category) => {
  const items = bouquets.filter((bouquet) => bouquet.category === category.slug);

  return {
    slug: category.slug,
    title: category.shortTitle,
    image: categoryImages[category.slug],
    priceFrom: Math.min(...items.map((bouquet) => bouquet.priceFrom)),
    count: items.length,
  };
});

/** Букет пятницы — рыбный состав на компанию, центр стола. */
const highlightBouquet = getBouquetBySlug('pennyy-vecher') ?? bouquets[0];

const ingredients = [
  'Раки',
  'Колбасы',
  'Сушёная рыба',
  'Сыр',
  'Креветки',
  'Мармелад',
  'Зефир',
  'Гранат',
  'Орехи',
  'Шоколад',
  'Цитрусы',
];

const orderSteps = [
  {
    n: '01',
    title: 'Выбрали',
    text: 'Ткните в букет из каталога или опишите словами, что нужно и на какой повод.',
  },
  {
    n: '02',
    title: 'Написали',
    text: 'WhatsApp, max или Avito — как удобнее. Отвечаем за 15 минут в рабочее время.',
  },
  {
    n: '03',
    title: 'Согласовали',
    text: 'Состав, размер, дату, адрес. Скажем прямо, если чего-то нет в наличии.',
  },
  {
    n: '04',
    title: 'Привезли',
    text: 'В день заказа по Краснодару и Яблоновскому, свежим и упакованным.',
  },
];

const advantages: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'fish',
    title: 'Только свежее',
    text: 'Раки, рыба, мясо и фрукты покупаем под конкретный заказ у проверенных поставщиков.',
  },
  {
    icon: 'hand-heart',
    title: 'Ручная работа',
    text: 'Каждый букет собирается руками под ваш повод, бюджет и вкус получателя.',
  },
  {
    icon: 'truck',
    title: 'Доставка в день заказа',
    text: 'Яблоновский, Краснодар и пригороды. Время и интервал согласуем в переписке.',
  },
];

/** Раскладка отзывов строится вокруг одного крупного — им открывается блок. */
const leadReview = reviews[1];
const shortReviews = reviews.filter((review) => review !== leadReview).slice(0, 4);

const cityNames: Record<string, string> = {
  krasnodar: 'Краснодар',
  yablonovskiy: 'Яблоновский',
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="home-business" data={buildLocalBusinessJsonLd()} />
      <JsonLd id="home-faq" data={buildFaqJsonLd(faqs)} />
      <JsonLd
        id="home-featured"
        data={buildItemListJsonLd(featuredBouquets, 'Хиты продаж')}
      />

      <Hero
        priceFrom={entryPrice}
        highlight={{
          href: `/bouquets/${highlightBouquet.slug}`,
          name: getDisplayName(highlightBouquet.name),
          note: highlightBouquet.shortDescription,
          price: highlightBouquet.priceFrom,
          image: highlightBouquet.images[0].src,
        }}
      />

      <div className="mt-5 max-md:mt-3">
        <Ticker items={ingredients} />
      </div>

      <CategoryPicker
        tiles={categoryTiles}
        bouquets={bouquets}
        featured={featuredBouquets}
      />

      {/* ПОД ПОВОД */}
      <section className="flex flex-col gap-7 pt-16 max-md:gap-4 max-md:pt-8">
        <header className="flex items-end justify-between gap-8 px-7 max-md:flex-col max-md:items-start max-md:gap-2 max-md:px-4">
          <h2 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] text-ink max-lg:text-[36px] max-md:text-[26px] max-md:leading-[1.1]">
            Под повод
          </h2>
          <p className="max-w-[40ch] text-right text-[15px] text-mute max-md:text-left max-md:text-[14px]">
            Подборки из разных категорий под конкретный случай
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3.5 px-7 max-md:scroll-row max-md:gap-2 max-md:px-4">
          {occasions.map((occasion) => {
            const count = occasion.relatedBouquetSlugs.length;
            const cover = getBouquetBySlug(occasion.coverSlug);

            return (
              <Link
                key={occasion.slug}
                href={`/occasions/${occasion.slug}`}
                className="flex flex-col gap-4.5 rounded-[32px] bg-card p-2 pb-6 transition-colors duration-150 ease-linear hover:bg-primary-soft max-md:w-65 max-md:flex-none max-md:gap-3 max-md:rounded-lg max-md:p-1.5 max-md:pb-4"
              >
                <div className="relative">
                  {cover ? (
                    <Image
                      src={cover.images[0].src}
                      alt={occasion.title}
                      width={400}
                      height={250}
                      sizes="(max-width: 768px) 260px, 400px"
                      className="aspect-wide w-full rounded-[26px] bg-page object-cover max-md:rounded-md"
                    />
                  ) : null}
                  <span className="absolute top-3 left-3 rounded-full bg-card px-3 py-1.25 text-[13px] font-semibold text-ink">
                    {count} {pluralBouquets(count)}
                  </span>
                </div>
                <div className="flex flex-col gap-2 px-4 max-md:gap-1.5 max-md:px-2.5">
                  <h3 className="font-display text-[20px] leading-[1.15] font-bold text-ink text-balance max-md:text-[15px] max-md:leading-[1.2]">
                    {occasion.title}
                  </h3>
                  <p className="text-[14px] text-mute text-pretty max-md:text-[13px] max-md:leading-[1.45]">
                    {occasion.intro}
                  </p>
                  <span className="mt-1.5 text-[15px] font-semibold text-ink max-md:hidden">
                    Смотреть подборку <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ИСТОРИЯ */}
      <section className="px-3 pt-16 max-md:px-2 max-md:pt-8">
        <div className="grid grid-cols-[1fr_1.15fr] items-center gap-16 overflow-hidden rounded-3xl bg-card px-14 py-16 max-lg:grid-cols-1 max-lg:gap-10 max-md:gap-4.5 max-md:rounded-xl max-md:p-2 max-md:pb-5">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-7.5 -left-7.5 size-50 rounded-full bg-primary max-md:hidden"
            />
            <Image
              src="/images/bouquets/9.webp"
              alt="Сборка букета вручную"
              width={600}
              height={520}
              sizes="(max-width: 768px) 100vw, 500px"
              className="relative h-130 w-full rounded-xl object-cover max-md:h-75 max-md:rounded-[22px]"
            />
            <div className="absolute -right-6 bottom-10 rounded-lg bg-ink px-6 py-5 max-md:right-2.5 max-md:bottom-2.5 max-md:rounded-[16px] max-md:px-3.5 max-md:py-2.5">
              <div className="font-display text-[36px] leading-[1.15] font-bold text-primary max-md:text-[22px] max-md:leading-[1.2]">
                500+
              </div>
              <div className="mt-1 text-[14px] text-mute-on-dark max-md:mt-0 max-md:text-[12px]">
                Букетов собрано с 2019
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5.5 max-md:gap-3.5 max-md:px-2.5">
            <span
              aria-hidden="true"
              className="h-15 font-display text-[120px] leading-[0.6] font-extrabold text-primary max-md:hidden"
            >
              “
            </span>
            <h2 className="font-display text-[38px] leading-[1.1] font-bold tracking-[-0.03em] text-ink text-balance max-lg:text-[32px] max-md:text-[22px] max-md:leading-[1.15]">
              Цветы стоят три дня. Букет съедают в тот же вечер
            </h2>
            <p className="text-[18px] text-ink text-pretty max-md:text-[15px] max-md:text-mute">
              Мы начали собирать гастробукеты в Яблоновском, потому что устали дарить то,
              что через неделю выбрасывают. Оказалось, так думают многие.
            </p>
            <p className="text-mute text-pretty max-md:hidden">
              Каждый букет собирается руками под конкретный заказ. Мы не держим готовые
              букеты на складе — покупаем продукты под вас, поэтому и просим написать
              заранее.
            </p>

            <div className="mt-2 flex flex-col border-t-2 border-ink max-md:mt-0">
              {advantages.map((advantage) => (
                <div
                  key={advantage.title}
                  className="grid grid-cols-[48px_1fr] items-start gap-4 border-b border-[#e3e3df] py-4 max-md:grid-cols-[40px_1fr] max-md:gap-3 max-md:py-3"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-page max-md:size-10">
                    <Icon name={advantage.icon} size={22} className="text-ink" />
                  </span>
                  <div>
                    <div className="text-[17px] font-bold text-ink max-md:text-[16px]">
                      {advantage.title}
                    </div>
                    <div className="text-[14px] text-subtle text-pretty max-md:text-[13px]">
                      {advantage.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ШАГИ */}
      <div id="steps" className="pt-14 max-md:pt-2">
        <StepsBand title="Четыре шага до вручения" steps={orderSteps} />
      </div>

      {/* ОТЗЫВЫ */}
      <section className="flex flex-col gap-7 px-3 pt-18 max-md:gap-3 max-md:px-2 max-md:pt-8">
        <h2 className="px-4 font-display text-[44px] leading-none font-bold tracking-[-0.03em] text-ink max-lg:text-[36px] max-md:px-2 max-md:text-[26px] max-md:leading-[1.1]">
          Что говорят
        </h2>

        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          <figure className="row-span-2 flex flex-col justify-between gap-6 rounded-[32px] bg-primary p-9 max-lg:row-span-1 max-md:gap-4 max-md:rounded-xl max-md:px-5 max-md:py-6">
            <span
              aria-hidden="true"
              className="h-12.5 font-display text-[100px] leading-[0.6] font-extrabold text-ink max-md:h-8 max-md:text-[64px]"
            >
              “
            </span>
            <blockquote className="text-[24px] leading-[1.35] font-semibold tracking-[-0.01em] text-ink text-pretty max-md:text-[18px] max-md:leading-[1.4]">
              {leadReview.text}
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-card font-extrabold text-ink max-md:size-10">
                {leadReview.author.charAt(0)}
              </span>
              <span className="leading-[1.25]">
                <span className="block font-bold text-ink">{leadReview.author}</span>
                <span className="block text-[13px] text-ink">
                  {cityNames[leadReview.location]} · {leadReview.sourceLabel}
                </span>
              </span>
            </figcaption>
          </figure>

          {/* На мобильном короткие отзывы листаются лентой */}
          <div className="contents max-md:flex max-md:scroll-row max-md:gap-2">
            {shortReviews.map((review) => (
              <figure
                key={`${review.author}-${review.sourceLabel}`}
                className="flex flex-col gap-4 rounded-[32px] bg-card p-6 max-md:w-70 max-md:flex-none max-md:gap-3 max-md:rounded-lg max-md:p-4.5"
              >
                <blockquote className="flex-1 text-[15px] leading-[1.55] text-ink text-pretty max-md:text-[14px] max-md:leading-[1.5]">
                  {review.text}
                </blockquote>
                <figcaption className="flex items-center gap-2.5 max-md:gap-2">
                  <span className="flex size-9 items-center justify-center rounded-full bg-page text-[14px] font-bold text-ink max-md:size-8 max-md:text-[13px]">
                    {review.author.charAt(0)}
                  </span>
                  <span className="flex-1 font-semibold text-ink max-md:text-[14px]">
                    {review.author}
                  </span>
                  <span className="rounded-full bg-page px-2.25 py-0.75 text-[12px] text-ink">
                    {review.sourceLabel}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ВОПРОСЫ И ТЁМНЫЙ ПРИЗЫВ */}
      <section
        id="faq"
        className="grid grid-cols-[1.5fr_1fr] gap-3 px-3 pt-16 max-lg:grid-cols-1 max-md:gap-2 max-md:px-2 max-md:pt-6"
      >
        <div className="rounded-2xl bg-card p-9 max-md:rounded-xl max-md:p-5">
          <h2 className="mb-3 font-display text-[30px] leading-none font-bold tracking-[-0.03em] text-ink max-md:mb-1 max-md:text-[22px] max-md:leading-[1.1]">
            Вопросы
          </h2>
          <FaqList items={faqs} />
        </div>

        <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-ink p-9 max-md:gap-4 max-md:rounded-xl max-md:p-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-15 -right-15 size-37.5 rounded-full bg-primary max-md:-top-12.5 max-md:-right-12.5 max-md:size-32.5"
          />
          <h2 className="relative max-w-72.5 font-display text-[30px] leading-[1.1] font-bold tracking-[-0.03em] text-white max-md:max-w-[12ch] max-md:text-[22px] max-md:leading-[1.15]">
            Скажите повод — <span className="text-primary">предложим состав</span>
          </h2>
          <ContactChannels source="home_faq" onDark layout="stack" className="relative" />
        </div>
      </section>
    </>
  );
}
