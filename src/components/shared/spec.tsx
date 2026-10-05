import type { ReactNode } from 'react';

interface SpecProps {
  label: string;
  value: ReactNode;
}

/** Строка «метка — значение» с волосяной отбивкой. Живёт на графите. */
export function Spec({ label, value }: SpecProps) {
  return (
    <div className="flex gap-4.5 border-b border-dark-line py-3">
      <span className="min-w-27.5 flex-none type-label text-mute-on-dark">{label}</span>
      <span className="text-sm text-on-dark text-pretty">{value}</span>
    </div>
  );
}
