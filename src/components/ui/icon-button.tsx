import type { ComponentProps, ReactNode } from 'react';

interface IconButtonProps extends Omit<ComponentProps<'button'>, 'aria-label'> {
  /** Доступное имя — обязательно. */
  label: string;
  /** Инвертирует для графита. */
  onDark?: boolean;
  /** Сторона квадрата, по умолчанию 44px. */
  size?: number;
  children?: ReactNode;
}

/** Квадратный прозрачный контрол 44px: гамбургер, закрытие модалки. */
export function IconButton({
  label,
  onDark = false,
  size = 44,
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      type={rest.type ?? 'button'}
      aria-label={label}
      style={{ width: size, height: size, ...rest.style }}
      className={[
        'inline-flex shrink-0 items-center justify-center cursor-pointer',
        'transition-[background-color] duration-140 ease-linear',
        onDark
          ? 'text-on-dark active:bg-[rgb(243_238_228_/_0.14)]'
          : 'text-ink active:bg-band',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}
