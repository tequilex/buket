'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './nav-items';

interface HeaderNavProps {
  items: NavItem[];
}

/**
 * Навигация шапки. Активный раздел подсвечивается серой пилюлей, поэтому
 * компонент клиентский: кроме `pathname` ему ничего не нужно.
 */
export function HeaderNav({ items }: HeaderNavProps) {
  // Вне роутера (в тестах) маршрута нет — просто не подсвечиваем ничего.
  const pathname = usePathname() ?? '';

  return (
    <nav className="flex flex-1 gap-1 whitespace-nowrap max-lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={[
              'rounded-xs px-3.5 py-2 text-[15px] transition-colors duration-150 ease-linear',
              active ? 'bg-page font-semibold' : 'font-medium hover:bg-page',
            ].join(' ')}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
