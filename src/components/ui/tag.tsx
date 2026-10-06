import Link from 'next/link';
import type { ReactNode } from 'react';

interface TagProps {
  onDark?: boolean;
  /** С адресом метка становится ссылкой с обводкой и стрелкой. */
  href?: string;
  /**
   * link — пилюля с обводкой 2px (навигация по разделам).
   * info — плоская серая пилюля (метки состава букета).
   * По умолчанию определяется наличием `href`.
   */
  variant?: 'link' | 'info';
  /** Дописывает «→» в конец ссылочного тега. */
  arrow?: boolean;
  className?: string;
  children?: ReactNode;
}

const base = 'inline-flex items-center gap-1.5 rounded-full whitespace-nowrap';

/** Пилюля-метка: ссылочная с обводкой или информационная на серой подложке. */
export function Tag({
  onDark = false,
  href,
  variant,
  arrow = true,
  className,
  children,
}: TagProps) {
  const kind = variant ?? (href ? 'link' : 'info');

  const classes = [
    base,
    kind === 'link'
      ? [
          'border-2 px-4 py-2 text-[14px] font-semibold transition-colors duration-150 ease-linear',
          onDark
            ? 'border-dark-line text-white hover:border-primary hover:text-white'
            : 'border-ink text-ink hover:bg-ink hover:text-white',
        ].join(' ')
      : [
          'px-3.5 py-1.5 text-[14px] font-medium',
          onDark ? 'bg-dark-raised text-white' : 'bg-page text-ink',
        ].join(' '),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow ? <span aria-hidden="true">→</span> : null}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
