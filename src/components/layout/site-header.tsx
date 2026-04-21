import Link from 'next/link';
import styles from './site-header.module.scss';

const navItems = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/locations/krasnodar', label: 'Краснодар' },
  { href: '/locations/yablonovskiy', label: 'Яблоновский' },
  { href: '/contacts', label: 'Контакты' },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.eyebrow}>
            Gastro Buket
          </span>
          <span className={styles.title}>
            Съедобные букеты
          </span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
