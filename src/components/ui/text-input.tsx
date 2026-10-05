import type { ComponentProps } from 'react';
import { useId } from 'react';

interface TextInputProps extends Omit<ComponentProps<'input'>, 'id'> {
  /** Заглавная метка с разрядкой над полем. */
  label?: string;
  error?: string;
  helper?: string;
  /** Для поля внутри графитовой модалки. */
  onDark?: boolean;
}

/** Квадратное поле 50px. Фокус меняет волосяную рамку на зелёную 2px внутрь. */
export function TextInput({
  label,
  error,
  helper,
  onDark = false,
  className,
  ...rest
}: TextInputProps) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label
          htmlFor={inputId}
          className={['type-label', onDark ? 'text-mute-on-dark' : 'text-mute'].join(' ')}
        >
          {label}
        </label>
      ) : null}
      <input
        {...rest}
        id={inputId}
        aria-describedby={error || helper ? hintId : undefined}
        aria-invalid={error ? true : undefined}
        className={[
          'h-[50px] w-full px-4 py-3.5 outline-none transition-[box-shadow] duration-140 ease-linear',
          'focus-visible:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-primary)]',
          onDark
            ? 'bg-fill-on-dark text-on-dark placeholder:text-mute-on-dark'
            : 'bg-card text-ink placeholder:text-mute',
          error
            ? 'shadow-[inset_0_0_0_1px_var(--color-error)]'
            : onDark
              ? 'shadow-[inset_0_0_0_1px_var(--color-dark-line)]'
              : 'shadow-[inset_0_0_0_1px_var(--color-cream)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error || helper ? (
        <span
          id={hintId}
          className={[
            'text-caption',
            error ? 'text-error' : onDark ? 'text-mute-on-dark' : 'text-mute',
          ].join(' ')}
        >
          {error || helper}
        </span>
      ) : null}
    </div>
  );
}
