import Link from 'next/link';

interface FilterChipProps {
  /** Выбран — инвертируется в графитовую заливку. */
  active?: boolean;
  href: string;
  children: string;
}

const base =
  'inline-flex min-h-[44px] items-center whitespace-nowrap px-[18px] py-[13px] type-button ' +
  'transition-[background-color] duration-140 ease-linear';

/**
 * Квадратный заглавный фильтр: волосяная рамка в покое, графитовая заливка в выборе.
 *
 * В магазине у каждой категории свой маршрут и своя выдача, поэтому чипс —
 * это ссылка, а не кнопка состояния: фильтр остаётся в URL и индексируется.
 */
export function FilterChip({ active = false, href, children }: FilterChipProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={[
        base,
        active
          ? 'bg-dark text-on-dark'
          : 'text-ink shadow-[inset_0_0_0_1px_var(--color-cream)] hover:bg-card',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}
