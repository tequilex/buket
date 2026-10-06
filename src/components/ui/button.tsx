import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'dark' | 'outline' | 'outline-dark' | 'ghost' | 'white';
type ButtonSize = 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-ink hover:bg-primary-pressed',
  dark: 'bg-ink text-white hover:bg-black hover:text-primary',
  outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
  'outline-dark': 'border-2 border-dark-line text-white hover:border-primary',
  ghost: 'bg-page text-ink hover:bg-band',
  white: 'bg-card text-ink hover:bg-primary',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-[46px] px-[22px] py-3 text-[15px] font-semibold',
  lg: 'min-h-[56px] px-[30px] py-[18px] text-[17px] font-bold',
};

const base =
  'inline-flex items-center justify-center gap-3.5 whitespace-nowrap leading-none ' +
  'cursor-pointer transition-colors duration-150 ease-linear ' +
  'disabled:bg-band disabled:text-placeholder disabled:cursor-default';

/** pill — везде. soft — только кнопка «Написать» в шапке (radius 14px). */
const shapes = {
  pill: 'rounded-full',
  soft: 'rounded-sm max-md:rounded-xs',
} as const;

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: keyof typeof shapes;
  iconAfter?: ReactNode;
  /** Добавляет «→» справа — так набраны все кнопки-ссылки в макетах. */
  arrow?: boolean;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<'a'>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Пилюля-контрол: жёлтая, тёмная или с обводкой. Регистр обычный. */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'pill',
    iconAfter,
    arrow = false,
    className,
    children,
    ...rest
  } = props;

  const classes = [base, shapes[shape], variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {iconAfter}
      {arrow ? <span aria-hidden="true">→</span> : null}
    </>
  );

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as ComponentProps<'a'> & { href: string };
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a {...anchorProps} href={href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link {...anchorProps} href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as ComponentProps<'button'>;

  return (
    <button {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
