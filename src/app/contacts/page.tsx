import type { Metadata } from 'next';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Контакты и заказ съедобных букетов',
    description:
      'Контакты для заказа съедобных букетов в Краснодаре и Яблоновском: WhatsApp, Telegram и Avito.',
    path: '/contacts',
  });
}

export default function ContactsPage() {
  return (
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <SectionHeading
        eyebrow="Контакты"
        title="Связь без публичного адреса"
        description="На первом этапе работаем как доставка + мессенджеры. Удобный канал связи важнее длинной формы и фиктивного офлайн-адреса."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
          <p className="text-base leading-7 text-[var(--muted)]">
            Лучше всего писать сразу в WhatsApp, Telegram или Avito: так можно
            быстро согласовать состав, бюджет, дату и адрес доставки.
          </p>
          <div className="mt-6">
            <ContactButtons source="contacts_page" />
          </div>
        </div>

        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            География
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--text)]">
            Работаем по Краснодару и Яблоновскому. Домашний адрес на сайте не
            публикуем: формат сайта строится вокруг доставки и связи в
            мессенджерах.
          </p>
        </div>
      </section>
    </div>
  );
}
