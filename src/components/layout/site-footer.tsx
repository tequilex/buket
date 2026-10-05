import Link from 'next/link';
import siteConfig from '@/data/site-config';
import { categories, occasions, phoneHref } from '@/lib/content/catalog';

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const columns: FooterColumn[] = [
  {
    title: 'Каталог',
    links: categories.map((category) => ({
      label: category.title,
      href: `/catalog/${category.slug}`,
    })),
  },
  {
    title: 'Поводы',
    links: occasions.map((occasion) => ({
      label: occasion.title,
      href: `/occasions/${occasion.slug}`,
    })),
  },
  {
    title: 'Связаться',
    links: [
      { label: siteConfig.phone, href: phoneHref, external: true },
      ...siteConfig.channels.map((channel) => ({
        label: channel.label,
        href: channel.href,
        external: true,
      })),
      { label: 'Контакты', href: '/contacts' },
      { label: 'Доставка', href: '/delivery' },
    ],
  },
];

const linkClass = 'block py-[5px] text-sm text-mute-on-dark hover:text-primary';

/** Графитовый футер: блок вордмарка и три колонки ссылок, волосяная нижняя строка. */
export function SiteFooter() {
  return (
    <footer className="bg-dark pt-22 pb-10 text-mute-on-dark">
      <div className="page-container">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 max-[900px]:grid-cols-2">
          <div>
            <span className="block font-display text-[22px] leading-none font-bold tracking-mark uppercase text-on-dark">
              Gastro Buket
            </span>
            <span className="mt-1 block text-[9px] leading-none tracking-[0.22em] uppercase text-mute-on-dark">
              Искусство вкусных подарков
            </span>
            <p className="mt-4.5 max-w-[32ch] text-sm text-mute-on-dark">
              Съедобные букеты ручной сборки. пгт. Яблоновский, доставка по Краснодару.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-3 type-label text-on-dark">{column.title}</h4>
              {column.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    // tel: открывается в том же контексте, мессенджеры — в новой вкладке.
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-6.5 border-t border-dark-line pt-6.5 text-[12px]">
          <span>© 2026 Gastro Buket</span>
          <span>Состав любого букета согласуется индивидуально</span>
        </div>
      </div>
    </footer>
  );
}
