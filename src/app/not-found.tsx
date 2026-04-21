import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import styles from '@/app/internal-page.module.scss';

export default function NotFound() {
  return (
    <div className={`page-shell ${styles.page}`}>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: '404' }]} />
      <section className={styles.introPanel}>
        <div className={styles.introCopy}>
          <p className={styles.panelEyebrow}>
            404
          </p>
          <h1 className={styles.categoryTitle}>
            Такой страницы нет
          </h1>
          <p className={styles.panelText}>
            Вернитесь на главную, откройте каталог или проверьте доставку по
            Краснодару и Яблоновскому.
          </p>
        </div>
        <div className={styles.actionRow}>
          <Link
            href="/"
            className={styles.primaryButton}
          >
            На главную
          </Link>
          <Link
            href="/catalog"
            className={styles.secondaryButton}
          >
            Каталог
          </Link>
          <Link
            href="/delivery"
            className={styles.secondaryButton}
          >
            Доставка
          </Link>
        </div>
      </section>
    </div>
  );
}
