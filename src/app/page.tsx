import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { FaqList } from '@/components/shared/faq-list';
import { ReviewList } from '@/components/shared/review-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, categories, faqs, reviews } from '@/lib/content/catalog';

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);

const orderSteps = [
  'Выберите букет по составу или поводу.',
  'Напишите в WhatsApp, Telegram или Avito.',
  'Согласуйте состав, дату и адрес доставки.',
];

export default function HomePage() {
  return (
    <div className="page-shell space-y-20 py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            Краснодар • Яблоновский
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
              Съедобные букеты с доставкой без лишних шагов
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              Мясные, рыбные, сладкие и фруктовые букеты с аккуратной
              подарочной подачей. Быстрый заказ через WhatsApp, Telegram или
              Avito.
            </p>
          </div>
          <ContactButtons source="hero" />
        </div>

        <div className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,#556b4f_0%,#b59a66_100%)] p-6 text-white shadow-[var(--shadow-soft)]">
          <div className="space-y-5">
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.24em]">
              Доставка сегодня
            </p>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.24em] text-white/80">
                Gastro Buket
              </p>
              <p className="text-2xl font-semibold leading-tight sm:text-3xl">
                Современный локальный бренд подарков со вкусом
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white/12 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                  От
                </p>
                <p className="mt-2 text-2xl font-semibold">2400 ₽</p>
              </div>
              <div className="rounded-[24px] bg-white/12 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                  Категории
                </p>
                <p className="mt-2 text-2xl font-semibold">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Каталог"
          title="Подберите букет по составу"
          description="Основной каталог строим по составу, чтобы пользователю было проще быстро выбрать подходящий вариант."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog/${category.slug}`}
              className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Категория
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">
                {category.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {category.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Популярное"
          title="Хиты первой выдачи"
          description="Подборка букетов, которые хорошо работают как первый выбор на мобильном."
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {featuredBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Как заказать"
            title="Простой сценарий без корзины"
            description="Сайт не заставляет проходить checkout: ты сразу пишешь в удобный канал и уточняешь детали заказа."
          />
        </div>
        <div className="grid gap-4">
          {orderSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-[24px] border border-[var(--line)] bg-[var(--card)] p-5"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Шаг {index + 1}
              </p>
              <p className="mt-2 text-base leading-7 text-[var(--text)]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          description="Блок для быстрых ответов по доставке, составу и заказу через мессенджеры."
        />
        <FaqList items={faqs} />
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Отзывы добавим без выдумки"
          description="На запуске здесь останутся только реальные отзывы клиентов, без искусственных заготовок."
        />
        <ReviewList items={reviews} />
      </section>
    </div>
  );
}
