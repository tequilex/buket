import Link from 'next/link';
import styles from './breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className={styles.item}>
            {index > 0 ? <span>/</span> : null}
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
