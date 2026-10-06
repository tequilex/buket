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

const linkClass = 'text-mute leading-[1.35] hover:text-ink max-md:text-[14px] max-md:leading-[1.6]';

/** Белая плашка-подвал: вордмарк и три колонки ссылок. */
export function SiteFooter() {
  return (
    <footer className="mt-12 mr-3 mb-3 ml-3 max-md:mt-6 max-md:mr-2 max-md:mb-2 max-md:ml-2 max-md:pb-21">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 rounded-xl bg-card p-8 text-[14px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4.5 max-md:rounded-lg max-md:p-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-[18px] font-bold text-ink max-md:text-[16px]">
            gastro buket
          </span>
          <span className="text-subtle max-md:text-[13px]">
            Съедобные букеты ручной сборки. Яблоновский · Краснодар
          </span>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-1.5">
            <span className="font-bold text-ink">{column.title}</span>
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

        <div className="col-span-full flex justify-between gap-6 border-t border-line pt-5 text-[12px] text-subtle max-md:flex-col max-md:gap-2 max-md:pt-3.5">
          <span>© 2026 Gastro Buket</span>
          <span>Состав любого букета согласуется индивидуально</span>
        </div>
      </div>
    </footer>
  );
}
