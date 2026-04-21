import type { Metadata } from 'next';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '@/app/internal-page.module.scss';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Контакты и заказ съедобных букетов',
    description:
      'Контакты для заказа съедобных букетов в Краснодаре и Яблоновском: WhatsApp, Telegram, Avito и быстрый ответ по доставке.',
    path: '/contacts',
  });
}

export default function ContactsPage() {
  return (
    <div className={`page-shell ${styles.page}`}>
      <SectionHeading
        eyebrow="Контакты"
        title="Как быстро связаться и оформить заказ"
        description="Работаем через WhatsApp, Telegram и Avito, чтобы быстро согласовать состав, бюджет, дату и адрес доставки."
      />

      <section className={styles.split}>
        <div className={styles.cardPanel}>
          <p className={styles.panelText}>
            Лучше всего писать сразу в WhatsApp, Telegram или Avito: так можно
            быстро согласовать состав, бюджет, дату и адрес доставки.
          </p>
          <div className={styles.actionRow}>
            <ContactButtons source="contacts_page" />
          </div>
        </div>

        <div className={styles.surfacePanel}>
          <p className={styles.panelEyebrow}>
            География
          </p>
          <p className={styles.panelText}>
            Работаем по Краснодару и Яблоновскому. Сайт построен как удобная
            витрина и быстрый канал для заказа с доставкой, поэтому связаться
            проще всего напрямую в мессенджере.
          </p>
        </div>
      </section>
    </div>
  );
}
