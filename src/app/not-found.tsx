import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-shell py-16">
      <div className="rounded-[32px] border border-[var(--line)] bg-[var(--card)] p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--text)]">
          Такой страницы нет
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Вернитесь на главную, откройте каталог или проверьте доставку по
          Краснодару и Яблоновскому.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--accent)] px-4 py-3 text-sm text-white"
          >
            На главную
          </Link>
          <Link
            href="/catalog"
            className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--text)]"
          >
            Каталог
          </Link>
          <Link
            href="/delivery"
            className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--text)]"
          >
            Доставка
          </Link>
        </div>
      </div>
    </div>
  );
}
