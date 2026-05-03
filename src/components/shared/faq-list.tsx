import type { FaqItem } from '@/lib/content/schemas';
import styles from './faq-list.module.scss';

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details
          key={item.question}
          className={styles.item}
        >
          <summary className={styles.question}>
            {item.question}
          </summary>
          <p className={styles.answer}>
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
