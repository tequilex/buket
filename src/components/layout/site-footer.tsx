import Link from 'next/link';
import styles from './site-footer.module.scss';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.eyebrow}>
            Gastro Buket
          </p>
          <p className={styles.description}>
            Съедобные букеты с доставкой по Краснодару и Яблоновскому. Быстрый
            заказ через WhatsApp, Telegram и Avito.
          </p>
        </div>

        <div>
          <p className={styles.title}>Разделы</p>
          <ul className={styles.list}>
            <li>
              <Link href="/catalog" className={styles.link}>
                Каталог
              </Link>
            </li>
            <li>
              <Link href="/delivery" className={styles.link}>
                Доставка
              </Link>
            </li>
            <li>
              <Link href="/contacts" className={styles.link}>
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.title}>География</p>
          <ul className={styles.list}>
            <li>
              <Link href="/locations/krasnodar" className={styles.link}>
                Краснодар
              </Link>
            </li>
            <li>
              <Link
                href="/locations/yablonovskiy"
                className={styles.link}
              >
                Яблоновский
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
