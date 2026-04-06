import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            Buket Studio
          </p>
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            Съедобные букеты с доставкой по Краснодару и Яблоновскому. Быстрый
            заказ без корзины через WhatsApp, Telegram и Avito.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--text)]">Разделы</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/catalog" className="hover:text-[var(--text)]">
                Каталог
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="hover:text-[var(--text)]">
                Доставка
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:text-[var(--text)]">
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--text)]">География</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/locations/krasnodar" className="hover:text-[var(--text)]">
                Краснодар
              </Link>
            </li>
            <li>
              <Link
                href="/locations/yablonovskiy"
                className="hover:text-[var(--text)]"
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
