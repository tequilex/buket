interface StatBlockProps {
  value: string;
  label: string;
  tone?: 'cream' | 'dark';
}

/** Цифра Oswald над заглавной меткой с разрядкой. Ставятся по три в ряд. */
export function StatBlock({ value, label, tone = 'cream' }: StatBlockProps) {
  const onDark = tone === 'dark';

  return (
    <div className="flex flex-col gap-1">
      <span
        className={[
          'font-display text-[38px] leading-[0.95] font-bold tracking-[-0.01em] uppercase',
          onDark ? 'text-on-dark' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </span>
      <span
        className={[
          'text-caption tracking-eyebrow uppercase',
          onDark ? 'text-mute-on-dark' : 'text-mute',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  );
}
