import Link from 'next/link';

interface FilterChipProps {
  /** Выбран — инвертируется в графитовую заливку. */
  active?: boolean;
  href: string;
  /** Счётчик букетов справа от названия. */
  count?: number;
  children: string;
}

const base =
  'inline-flex min-h-11 flex-none items-center gap-2 rounded-full border-2 px-[18px] py-[9px] ' +
  'text-[15px] leading-none font-semibold whitespace-nowrap ' +
  'transition-colors duration-150 ease-linear max-md:text-[14px] max-md:px-4';

/**
 * Пилюля-фильтр: белая с серой обводкой в покое, графитовая в выборе.
 *
 * В магазине у каждой категории свой маршрут и своя выдача, поэтому чипс —
 * это ссылка, а не кнопка состояния: фильтр остаётся в URL и индексируется.
 */
export function FilterChip({ active = false, href, count, children }: FilterChipProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={[
        base,
        active
          ? 'border-ink bg-ink text-white'
          : 'border-cream bg-card text-ink hover:border-ink',
      ].join(' ')}
    >
      {children}
      {typeof count === 'number' ? (
        <span className="text-[13px] font-semibold opacity-60">{count}</span>
      ) : null}
    </Link>
  );
}
