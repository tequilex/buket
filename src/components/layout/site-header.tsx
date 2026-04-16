import Link from 'next/link';

const navItems = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/locations/krasnodar', label: 'Краснодар' },
  { href: '/locations/yablonovskiy', label: 'Яблоновский' },
  { href: '/contacts', label: 'Контакты' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(251,248,242,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0">
          <span className="block text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            Gastro Buket
          </span>
          <span className="block text-base font-semibold text-[var(--text)]">
            Съедобные букеты
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-[var(--muted)] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--text)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
