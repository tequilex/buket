import type { FaqItem } from '@/lib/content/schemas';

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-[24px] border border-[var(--line)] bg-[var(--card)] p-5"
        >
          <summary className="cursor-pointer list-none text-base font-semibold text-[var(--text)]">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
