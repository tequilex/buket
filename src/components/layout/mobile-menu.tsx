'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { ContactChannels } from '@/components/cta/contact-channels';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import type { NavItem } from './nav-items';

const noop = () => () => {};
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

interface MobileMenuProps {
  items: NavItem[];
}

/** Гамбургер и правая графитовая шторка. Прямые углы, плотное затемнение. */
export function MobileMenu({ items }: MobileMenuProps) {
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const burger = (
    <IconButton
      label={open ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={open}
      onDark
      onClick={() => setOpen((value) => !value)}
    >
      <Icon name={open ? 'x' : 'menu'} size={22} />
    </IconButton>
  );

  if (!isClient) return burger;

  return (
    <>
      {burger}
      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-70 bg-[rgb(18_17_13_/_0.72)]"
              onClick={() => setOpen(false)}
            >
              <nav
                className="absolute inset-y-0 right-0 flex w-[min(340px,88vw)] flex-col gap-6.5 bg-dark px-6.5 pt-4.5 pb-6.5"
                onClick={(event) => event.stopPropagation()}
              >
                <IconButton
                  label="Закрыть"
                  onDark
                  className="self-end"
                  onClick={() => setOpen(false)}
                >
                  <Icon name="x" size={20} />
                </IconButton>

                <div className="flex flex-col">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-[44px] items-center border-b border-dark-line py-3 type-heading-md text-on-dark"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <ContactChannels source="mobile_menu" onDark />
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
