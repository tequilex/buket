import type { ReactNode } from 'react';

interface SpecProps {
  label: string;
  value: ReactNode;
  /** Инвертирует строку для графитовых блоков. */
  onDark?: boolean;
}

/** Строка «метка — значение» с волосяной отбивкой. */
export function Spec({ label, value, onDark = false }: SpecProps) {
  const line = onDark ? 'border-dark-line' : 'border-cream';
  const labelColor = onDark ? 'text-mute-on-dark' : 'text-mute';
  const valueColor = onDark ? 'text-on-dark' : 'text-ink';

  return (
    <div className={`flex gap-4.5 border-b ${line} py-3`}>
      <span className={`min-w-27.5 flex-none type-label ${labelColor}`}>{label}</span>
      <span className={`text-sm ${valueColor} text-pretty`}>{value}</span>
    </div>
  );
}
