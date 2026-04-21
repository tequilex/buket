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
            <span className={styles.questionText}>{item.question}</span>
            <span className={styles.questionIcon} aria-hidden="true">
              +
            </span>
          </summary>
          <div className={styles.answerWrap}>
            <p className={styles.answer}>
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
