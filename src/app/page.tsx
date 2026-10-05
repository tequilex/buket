import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { JsonLd } from '@/components/seo/json-ld';
import { OrderButton } from '@/components/order/order-button';
import { FaqList } from '@/components/shared/faq-list';
import { ReviewList } from '@/components/shared/review-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { CategoryPanel } from '@/components/ui/category-panel';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon, type IconName } from '@/components/ui/icon';
import { Photo } from '@/components/ui/photo';
import { PriceStamp } from '@/components/ui/price-stamp';
import { StatBlock } from '@/components/ui/stat-block';
import { StepCard } from '@/components/ui/step-card';
import { Ticker } from '@/components/ui/ticker';
import {
  bouquets,
  categories,
  faqs,
  getShortCategoryTitle,
  reviews,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildLocalBusinessJsonLd,
} from '@/lib/seo/structured-data';

export const metadata: Metadata = buildMetadata({
  title: 'Съедобные букеты с доставкой в Краснодаре и Яблоновском',
  description:
    'Авторские съедобные букеты из фруктов, мяса, рыбы и сладостей. Доставка по Краснодару и Яблоновскому в день заказа. Состав букета согласуется индивидуально.',
  path: '/',
});

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);
const entryPrice = Math.min(...bouquets.map((bouquet) => bouquet.priceFrom));
/** Кадр категории. Витринная величина, в данных её нет. */
const categoryImages: Record<string, string> = {
  myasnye: '/images/bouquets/9.webp',
  rybnye: '/images/bouquets/11.webp',
  sladkie: '/images/bouquets/3.webp',
  fruktovye: '/images/bouquets/10.webp',
};

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
    icon: 'palette',
    title: 'Ручная работа',
    text: 'Каждый букет собирается руками под ваш повод, бюджет и вкус получателя.',
  },
  {
    icon: 'truck',
    title: 'Доставка в день заказа',
    text: 'Яблоновский, Краснодар и пригороды. Время и интервал согласуем в переписке.',
  },
];

function Section({
  children,
  id,
  band = false,
}: {
  children: ReactNode;
  id?: string;
  band?: boolean;
}) {
  return (
    <section id={id} className={band ? 'bg-band py-22' : 'py-22'}>
      <div className="page-container flex flex-col gap-10">{children}</div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <JsonLd id="home-business" data={buildLocalBusinessJsonLd()} />
      <JsonLd id="home-faq" data={buildFaqJsonLd(faqs)} />
      <JsonLd
        id="home-featured"
        data={buildItemListJsonLd(featuredBouquets, 'Хиты продаж')}
      />

      {/* ГЕРОЙ */}
      <div className="bg-dark py-22 text-on-dark">
        <div className="page-container grid grid-cols-[1.05fr_0.95fr] items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6.5">
          <div className="flex flex-col items-start justify-center">
            <span className="type-eyebrow text-primary">
              Съедобные букеты ручной сборки
            </span>
            <h1 className="mt-4.5 type-display-xl text-on-dark">
              Букеты,
              <br />
              которые <span className="text-primary">съедают</span>
            </h1>
            <p className="my-6.5 max-w-[44ch] text-mute-on-dark text-pretty">
              Раки, колбасы, сушёная рыба, сыр, мармелад. Собираем вручную в Яблоновском
              и привозим по Краснодару в день заказа.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/catalog">Смотреть каталог</Button>
              <OrderButton variant="outline-dark" source="hero">
                Собрать под повод
              </OrderButton>
            </div>
            <div className="mt-10 flex w-full gap-10 border-t border-dark-line pt-6.5">
              <StatBlock tone="dark" value="500+" label="Заказов" />
              <StatBlock tone="dark" value="4" label="Состава" />
              <StatBlock tone="dark" value="3–5к" label="Рублей" />
            </div>
          </div>

          <div className="relative grid grid-cols-[1.32fr_1fr] gap-2 self-start">
            <PriceStamp
              value={`${entryPrice} ₽`}
              size="lg"
              className="absolute top-0 right-0"
            />
            <Photo
              src="/images/bouquets/hero.webp"
              alt="Букет из раков с лимоном"
              ratio="auto"
              priority
              sizes="(max-width: 900px) 60vw, 30vw"
              className="row-span-2"
            />
            <Photo
              src="/images/bouquets/5.webp"
              alt="Мясной букет с колбасами"
              ratio="square"
              sizes="(max-width: 900px) 40vw, 20vw"
            />
            <Photo
              src="/images/bouquets/6.webp"
              alt="Рыбный букет из сушёной рыбы"
              ratio="square"
              sizes="(max-width: 900px) 40vw, 20vw"
            />
          </div>
        </div>
      </div>

      <Ticker items={ingredients} />

      {/* КАТАЛОГ */}
      <Section id="catalog">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <SectionHeading
            eyebrow="Четыре состава"
            title={
              <>
                Выбирайте по вкусу
                <br />
                получателя
              </>
            }
          />
          <p className="max-w-[46ch] text-mute text-pretty">
            Состав любого букета меняем: убираем лишнее, добавляем любимое, подгоняем под
            бюджет.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {categories.map((category, index) => {
            const categoryBouquets = bouquets.filter(
              (bouquet) => bouquet.category === category.slug,
            );

            return (
              <CategoryPanel
                key={category.slug}
                number={String(index + 1).padStart(2, '0')}
                title={getShortCategoryTitle(category.title)}
                composition={category.shortDescription}
                price={Math.min(...categoryBouquets.map((bouquet) => bouquet.priceFrom))}
                href={`/catalog/${category.slug}`}
                src={categoryImages[category.slug]}
                alt={`${category.title} в Краснодаре`}
              />
            );
          })}
        </div>
      </Section>

      {/* ХИТЫ */}
      <Section band>
        <div className="flex flex-wrap items-end justify-between gap-6.5">
          <SectionHeading eyebrow="Хиты" title="Чаще всего берут" />
          <Button variant="outline" href="/catalog">
            Все {bouquets.length} букетов
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {featuredBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </Section>

      {/* ИСТОРИЯ */}
      <Section>
        <div className="grid grid-cols-2 items-center gap-10 max-[900px]:grid-cols-1">
          <Photo
            src="/images/bouquets/9.webp"
            alt="Сборка букета вручную"
            ratio="card"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="flex flex-col gap-6.5">
            <SectionHeading
              eyebrow="Наша история"
              title={
                <>
                  Цветы стоят три дня.
                  <br />
                  Букет съедают
                  <br />в тот же вечер
                </>
              }
              lead="Мы начали собирать гастробукеты в Яблоновском, потому что устали дарить то, что через неделю выбрасывают. Оказалось, так думают многие."
            />
            <p className="max-w-[52ch] text-mute text-pretty">
              Каждый букет собирается руками под конкретный заказ. Мы не держим готовые
              букеты на складе — покупаем продукты под вас, поэтому и просим написать
              заранее.
            </p>
            <div className="flex flex-wrap gap-10 border-t border-cream pt-4.5">
              <StatBlock value="500+" label="Букетов собрано" />
              <StatBlock value="2019" label="С этого года" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 max-[900px]:grid-cols-1">
          {advantages.map((advantage) => (
            <div key={advantage.title} className="flex flex-col gap-3 bg-card p-4.5">
              <Icon name={advantage.icon} size={26} className="text-primary" />
              <h3 className="type-heading-md text-ink">{advantage.title}</h3>
              <p className="text-sm text-mute text-pretty">{advantage.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ШАГИ */}
      <div id="steps" className="bg-primary py-22">
        <div className="page-container">
          <SectionHeading
            tone="green"
            eyebrow="Просто и быстро"
            title={
              <>
                Четыре шага
                <br />
                до вручения
              </>
            }
          />
          <div className="mt-10 grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {orderSteps.map((step) => (
              <StepCard key={step.n} n={step.n} title={step.title} text={step.text} />
            ))}
          </div>
        </div>
      </div>

      {/* ОТЗЫВЫ */}
      <div className="bg-dark py-22">
        <div className="page-container">
          <SectionHeading tone="dark" eyebrow="Отзывы" title="Что говорят" />
          <div className="mt-10">
            <ReviewList items={reviews.slice(0, 6)} />
          </div>
        </div>
      </div>

      {/* ВОПРОСЫ */}
      <Section id="faq">
        <SectionHeading eyebrow="Вопросы" title="Коротко о главном" />
        <FaqList items={faqs} />
      </Section>

      <CtaBand
        eyebrow="Готовы собрать"
        title="Скажите повод — предложим состав"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource="home"
      />
    </div>
  );
}
