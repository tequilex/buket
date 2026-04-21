import type { ReactNode } from 'react';
import styles from './section-heading.module.scss';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className={styles.root}>
      {eyebrow ? (
        <p className={styles.eyebrow}>
          {eyebrow}
        </p>
      ) : null}
      <div className={styles.header}>
        <div className={styles.body}>
          <h2 className={styles.title}>
            {title}
          </h2>
          {description ? (
            <p className={styles.description}>
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </div>
  );
}
