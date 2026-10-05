import Link from 'next/link';
import type { ReactNode } from 'react';

interface InlineLinkProps {
  href: string;
  onDark?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Ссылка в тексте: чернила с зелёным подчёркиванием, зеленеет при наведении. */
export function InlineLink({
  href,
  onDark = false,
  className,
  children,
}: InlineLinkProps) {
  return (
    <Link
      href={href}
      className={[
        'underline decoration-primary underline-offset-[3px] hover:text-primary',
        onDark ? 'text-on-dark' : 'text-ink',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Link>
  );
}
