import type { Metadata } from 'next';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
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
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]} />

      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <SectionHeading
            eyebrow="Контакты"
            title="Как быстро связаться и оформить заказ"
            description="Работаем через WhatsApp, Telegram и Avito, чтобы быстро согласовать состав, бюджет, дату и адрес доставки."
          />
          <p className={styles.introText}>
            Если уже выбрали букет, просто напишите в удобный канал. Если
            сомневаетесь, можно прислать повод, бюджет или пример, и дальше
            спокойно подобрать подходящий вариант.
          </p>
        </div>

        <div className={styles.categoryNav}>
          <p className={styles.panelTitle}>Быстрый контакт</p>
          <div className={styles.actionRow}>
            <ContactButtons source="contacts_page_intro" />
          </div>
        </div>
      </section>

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
