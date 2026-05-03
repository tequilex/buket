'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import styles from './mobile-menu.module.scss';

const navItems = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/locations/krasnodar', label: 'Краснодар' },
  { href: '/locations/yablonovskiy', label: 'Яблоновский' },
  { href: '/contacts', label: 'Контакты' },
];

const noop = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(noop, () => true, () => false);

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState('');
  const pathname = usePathname();
  const isClient = useIsClient();

  // Закрываем меню при смене маршрута (render-time update, без эффекта)
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    if (lastPathname !== '') setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const burger = (
    <button
      className={styles.burger}
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={open}
    >
      <span className={`${styles.line} ${open ? styles.lineTop : ''}`} />
      <span className={`${styles.line} ${open ? styles.lineMid : ''}`} />
      <span className={`${styles.line} ${open ? styles.lineBot : ''}`} />
    </button>
  );

  if (!isClient) return burger;

  return (
    <>
      {burger}
      {createPortal(
        <>
          {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
          <nav
            className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
            aria-hidden={!open}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${pathname === item.href ? styles.linkActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/catalog" className={styles.cta}>
              Заказать букет
            </Link>
          </nav>
        </>,
        document.body,
      )}
    </>
  );
}
