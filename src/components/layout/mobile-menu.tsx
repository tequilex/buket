'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { ContactChannels } from '@/components/cta/contact-channels';
import { Icon } from '@/components/ui/icon';
import siteConfig from '@/data/site-config';
import { occasions, phoneHref } from '@/lib/content/catalog';
import type { NavItem } from './nav-items';

const noop = () => () => {};
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

interface MobileMenuProps {
  items: NavItem[];
}

/** Бургер и белая шторка справа. Внутри — разделы, поводы и каналы связи. */
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
    <button
      type="button"
      aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xs bg-page text-ink"
    >
      <Icon name={open ? 'x' : 'menu'} size={22} />
    </button>
  );

  if (!isClient) return burger;

  return (
    <>
      {burger}
      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-70 bg-[rgb(23_24_28_/_0.6)]"
              onClick={() => setOpen(false)}
            >
              <nav
                className="absolute top-2 right-2 bottom-2 left-10 flex flex-col gap-5 overflow-y-auto rounded-xl bg-card p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[15px] font-bold text-ink">
                    gastro buket
                  </span>
                  <button
                    type="button"
                    aria-label="Закрыть"
                    onClick={() => setOpen(false)}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-xs bg-ink text-white"
                  >
                    <Icon name="x" size={20} />
                  </button>
                </div>

                <div className="flex flex-col">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-14 items-center justify-between border-b border-line font-display text-[20px] font-bold text-ink"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="flex size-9 flex-none items-center justify-center rounded-full bg-primary font-sans text-[15px] text-ink"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-bold text-subtle">Поводы</span>
                  <div className="flex flex-wrap gap-1.5">
                    {occasions.map((occasion) => (
                      <Link
                        key={occasion.slug}
                        href={`/occasions/${occasion.slug}`}
                        className="rounded-full bg-page px-3 py-2 text-[14px] font-semibold text-ink"
                      >
                        {occasion.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={phoneHref}
                    className="p-2 text-center text-[16px] font-bold text-ink"
                  >
                    {siteConfig.phone}
                  </a>
                  <ContactChannels source="mobile_menu" layout="menu" />
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
