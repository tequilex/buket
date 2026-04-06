import type { ReviewEntry } from '@/lib/content/schemas';

interface ReviewListProps {
  items: ReviewEntry[];
}

export function ReviewList({ items }: ReviewListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[var(--line)] bg-[var(--card)] p-6 text-sm leading-6 text-[var(--muted)]">
        Реальные отзывы будут добавлены перед запуском сайта.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={`${item.author}-${item.text}`}
          className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6"
        >
          <p className="text-sm leading-6 text-[var(--muted)]">“{item.text}”</p>
          <div className="mt-4">
            <p className="font-semibold text-[var(--text)]">{item.author}</p>
            <p className="text-sm text-[var(--muted)]">
              {item.location} • {item.sourceLabel}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
