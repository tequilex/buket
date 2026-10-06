import type { ReactNode } from 'react';

interface SpecProps {
  label: string;
  value: ReactNode;
  /** Инвертирует строку для графитовых блоков. */
  onDark?: boolean;
}

interface SpecListProps {
  onDark?: boolean;
  className?: string;
  children: ReactNode;
}

/** Таблица «метка — значение». Открывается жирной чертой сверху. */
export function SpecList({ onDark = false, className, children }: SpecListProps) {
  return (
    <div
      className={[
        'flex flex-col border-t-2',
        onDark ? 'border-primary' : 'border-ink',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

/** Строка таблицы: узкая колонка подписи и значение. */
export function Spec({ label, value, onDark = false }: SpecProps) {
  return (
    <div
      className={[
        'grid grid-cols-[110px_1fr] gap-4 border-b py-3.5 max-md:grid-cols-[90px_1fr] max-md:gap-3 max-md:py-2.5',
        onDark ? 'border-[#2e2f35]' : 'border-line',
      ].join(' ')}
    >
      <span
        className={[
          'text-[14px]',
          onDark ? 'text-[#9a9ca3]' : 'text-subtle',
        ].join(' ')}
      >
        {label}
      </span>
      <span
        className={[
          'text-[15px] font-semibold text-pretty max-md:text-[14px]',
          onDark ? 'text-white' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}
