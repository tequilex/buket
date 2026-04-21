import Link from 'next/link';
import styles from '@/app/internal-page.module.scss';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.cardPanel}>
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
      </div>
    </div>
  );
}
