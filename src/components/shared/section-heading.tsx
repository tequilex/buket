import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Небольшая зелёная метка над заголовком. */
  eyebrow?: string;
  /** Набирается Oswald заглавными. Перенос строки — через <br /> в строке. */
  title: ReactNode;
  lead?: string;
  /** На какой поверхности стоит — переключает цвета типографики. */
  tone?: 'cream' | 'dark' | 'green';
  /** Уровень заголовка. h1 — только в шапке страницы, по одному на документ. */
  as?: 'h1' | 'h2';
  className?: string;
}

/** Открытие раздела: зелёный надзаголовок, заголовок Oswald заглавными, приглушённый лид. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'cream',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const onDark = tone === 'dark' || tone === 'green';

  return (
    <header className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      {eyebrow ? (
        <span
          className={[
            'type-eyebrow',
            tone === 'green' ? 'text-[rgb(255_255_255_/_0.8)]' : 'text-primary',
          ].join(' ')}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={['type-heading-xl', onDark ? 'text-on-dark' : 'text-ink'].join(' ')}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={[
            'max-w-[54ch] text-pretty',
            tone === 'green'
              ? 'text-[rgb(255_255_255_/_0.8)]'
              : onDark
                ? 'text-mute-on-dark'
                : 'text-mute',
          ].join(' ')}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
