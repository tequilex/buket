import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'outline-dark' | 'ghost';
type ButtonSize = 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white active:bg-primary-pressed',
  outline: 'text-ink shadow-[inset_0_0_0_1px_var(--color-cream)] active:bg-card',
  'outline-dark':
    'text-on-dark shadow-[inset_0_0_0_1px_var(--color-dark-line-strong)] active:bg-[rgb(243_238_228_/_0.1)]',
  ghost: 'text-primary active:bg-band',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-[46px] px-[22px] py-[15px]',
  lg: 'min-h-[56px] px-[30px] py-[18px]',
};

const base =
  'inline-flex items-center justify-center gap-2 type-button whitespace-nowrap ' +
  'cursor-pointer transition-[background-color] duration-140 ease-linear ' +
  'disabled:bg-band disabled:text-mute-on-dark disabled:cursor-default';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconAfter?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<'a'>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Квадратный заглавный контрол с разрядкой. Радиусов нет — их нет и в системе.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    iconAfter,
    className,
    children,
    ...rest
  } = props;

  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(' ');

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as ComponentProps<'a'> & { href: string };
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a {...anchorProps} href={href} className={classes}>
          {children}
          {iconAfter}
        </a>
      );
    }

    return (
      <Link {...anchorProps} href={href} className={classes}>
        {children}
        {iconAfter}
      </Link>
    );
  }

  const buttonProps = rest as ComponentProps<'button'>;

  return (
    <button {...buttonProps} className={classes}>
      {children}
      {iconAfter}
    </button>
  );
}
