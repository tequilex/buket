import type { Metadata } from 'next';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { FaqList } from '@/components/shared/faq-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { faqs, locations } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

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
    <div className={`page-shell ${styles.page}`}>
      <SectionHeading
        eyebrow="Доставка"
        title="Как устроена доставка и заказ"
        description="Коротко рассказываем, как оформить заказ, согласовать состав и выбрать удобное время доставки."
      />

      <section className={styles.infoGrid}>
        {locations.map((location) => (
          <article
            key={location.slug}
            className={styles.cardPanel}
          >
            <h2 className={styles.panelTitle}>{location.title}</h2>
            <p className={styles.mutedText}>
              {location.deliveryLead}
            </p>
          </article>
        ))}
      </section>

      <section className={styles.surfacePanel}>
        <p className={styles.panelEyebrow}>
          Как проходит заказ
        </p>
        <ol className={styles.stepsGrid}>
          <li className={styles.stepCard}>1. Выбираете букет на сайте или присылаете пример того, что нравится.</li>
          <li className={styles.stepCard}>2. Пишете в WhatsApp, Telegram или Avito и уточняете детали заказа.</li>
          <li className={styles.stepCard}>3. Согласуем состав, стоимость, время и адрес доставки.</li>
        </ol>
        <div className={styles.actionRow}>
          <ContactButtons source="delivery_page" />
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="FAQ"
          title="Что чаще всего спрашивают перед доставкой"
        />
        <FaqList items={faqs} />
      </section>
    </div>
  );
}
