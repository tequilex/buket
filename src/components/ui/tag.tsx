import Link from 'next/link';
import type { ReactNode } from 'react';

interface TagProps {
  onDark?: boolean;
  /** С адресом метка становится ссылкой — так переносятся прежние pillLink. */
  href?: string;
  className?: string;
  children?: ReactNode;
}

const base = 'inline-flex items-center whitespace-nowrap px-3 py-[7px] text-caption';

/** Квадратная метка-атрибут с волосяной рамкой. */
export function Tag({ onDark = false, href, className, children }: TagProps) {
  const classes = [
    base,
    onDark
      ? 'text-mute-on-dark shadow-[inset_0_0_0_1px_var(--color-dark-line)]'
      : 'text-mute shadow-[inset_0_0_0_1px_var(--color-cream)]',
    href ? 'hover:text-primary' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
