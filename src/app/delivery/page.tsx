import type { Metadata } from 'next';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { FaqList } from '@/components/shared/faq-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { faqs, locations } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Доставка съедобных букетов',
    description:
      'Условия доставки съедобных букетов по Краснодару и Яблоновскому: как оформить заказ и согласовать удобное время вручения.',
    path: '/delivery',
  });
}

export default function DeliveryPage() {
  return (
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <SectionHeading
        eyebrow="Доставка"
        title="Как устроена доставка и заказ"
        description="Коротко рассказываем, как оформить заказ, согласовать состав и выбрать удобное время доставки."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        {locations.map((location) => (
          <article
            key={location.slug}
            className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6"
          >
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              {location.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              {location.deliveryLead}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          Как проходит заказ
        </p>
        <ol className="mt-4 grid gap-4 text-base leading-7 text-[var(--text)] lg:grid-cols-3">
          <li className="rounded-[24px] bg-white p-5">1. Выбираете букет на сайте или присылаете пример того, что нравится.</li>
          <li className="rounded-[24px] bg-white p-5">2. Пишете в WhatsApp, Telegram или Avito и уточняете детали заказа.</li>
          <li className="rounded-[24px] bg-white p-5">3. Согласуем состав, стоимость, время и адрес доставки.</li>
        </ol>
        <div className="mt-6">
          <ContactButtons source="delivery_page" />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Что чаще всего спрашивают перед доставкой"
        />
        <FaqList items={faqs} />
      </section>
    </div>
  );
}
