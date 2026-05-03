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
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.text}>«{item.text}»</p>
          <div className={styles.meta}>
            <div className={styles.avatar}>{item.author[0]}</div>
            <div>
              <p className={styles.author}>{item.author}</p>
              <p className={styles.details}>
                {item.location} • {item.sourceLabel}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
