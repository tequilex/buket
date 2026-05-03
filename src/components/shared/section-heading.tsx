import styles from './section-heading.module.scss';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className={styles.root}>
      {eyebrow ? (
        <p className={styles.eyebrow}>
          {eyebrow}
        </p>
      ) : null}
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
    </div>
  );
}
