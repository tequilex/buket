import type { ReviewEntry } from '@/lib/content/schemas';
import styles from './review-list.module.scss';

interface ReviewListProps {
  items: ReviewEntry[];
}

export function ReviewList({ items }: ReviewListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        Реальные отзывы будут добавлены перед запуском сайта.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <article
          key={`${item.author}-${item.text}`}
          className={styles.item}
        >
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <p className={styles.text}>{item.text}</p>
          <div className={styles.meta}>
            <p className={styles.author}>{item.author}</p>
            <p className={styles.details}>
              {item.location} • {item.sourceLabel}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
