import type { ReviewEntry } from '@/lib/content/schemas';
import { QuoteCard } from '@/components/ui/quote-card';

interface ReviewListProps {
  items: ReviewEntry[];
}

/** Сетка отзывов. Живёт на графитовой секции — карточка сама графитовая. */
export function ReviewList({ items }: ReviewListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-dark-raised p-8 text-mute-on-dark">
        Реальные отзывы будут добавлены перед запуском сайта.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
      {items.map((item) => (
        <QuoteCard
          key={`${item.author}-${item.sourceLabel}`}
          text={item.text}
          author={item.author}
          source={item.sourceLabel}
        />
      ))}
    </div>
  );
}
