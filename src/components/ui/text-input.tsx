import type { ComponentProps } from 'react';
import { useId } from 'react';

interface TextInputProps extends Omit<ComponentProps<'input'>, 'id'> {
  /** Подпись над полем. */
  label?: string;
  error?: string;
  helper?: string;
  className?: string;
}

/** Поле-пилюля 52px. Фокус меняет серую обводку на графитовую. */
export function TextInput({ label, error, helper, className, ...rest }: TextInputProps) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-[14px] font-semibold text-ink">
          {label}
        </label>
      ) : null}
      <input
        {...rest}
        id={inputId}
        aria-describedby={error || helper ? hintId : undefined}
        aria-invalid={error ? true : undefined}
        className={[
          'h-13 w-full rounded-full border-2 bg-card px-5 text-[16px] text-ink',
          'outline-none transition-colors duration-150 ease-linear',
          'placeholder:text-placeholder focus-visible:outline-none',
          error ? 'border-error' : 'border-cream focus:border-ink',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error || helper ? (
        <span
          id={hintId}
          className={['text-[13px]', error ? 'text-error' : 'text-subtle'].join(' ')}
        >
          {error || helper}
        </span>
      ) : null}
    </div>
  );
}
