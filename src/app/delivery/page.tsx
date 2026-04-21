import type { Metadata } from 'next';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
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
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Доставка' }]} />

      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <SectionHeading
            eyebrow="Доставка"
            title="Как устроена доставка и заказ"
            description="Коротко рассказываем, как оформить заказ, согласовать состав и выбрать удобное время доставки."
          />
          <p className={styles.introText}>
            Основной сценарий простой: вы выбираете букет на сайте, а детали
            состава, времени и адреса доставки быстро согласовываются в
            мессенджере.
          </p>
        </div>

        <div className={styles.categoryNav}>
          <p className={styles.panelTitle}>Где доставляем</p>
          <div className={styles.pillLinks}>
            {locations.map((location) => (
              <span key={location.slug} className={styles.softPillLink}>
                {location.title}
              </span>
            ))}
          </div>
        </div>
      </section>

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
