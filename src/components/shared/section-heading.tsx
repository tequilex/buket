import type { ReactNode } from 'react';

type HeadingTone = 'light' | 'dark' | 'yellow';

interface SectionHeadingProps {
  /** Надзаголовок обычным регистром. */
  eyebrow?: string;
  /** Набирается Unbounded 700. Перенос строки — через <br /> в строке. */
  title: ReactNode;
  /** Абзац под заголовком. */
  lead?: string;
  /**
   * Абзац справа от заголовка (на мобильном — под ним).
   * Так набраны почти все открытия разделов в макетах.
   */
  note?: ReactNode;
  /** Размер заголовка: lg — 40–44px (раздел), md — 30–34px (внутри карточки). */
  size?: 'lg' | 'md';
  /** На какой поверхности стоит — переключает цвета типографики. */
  tone?: HeadingTone;
  /** Уровень заголовка. h1 — только в шапке страницы, по одному на документ. */
  as?: 'h1' | 'h2';
  /** Выравнивание по центру — блок «Пять шагов» на доставке. */
  center?: boolean;
  className?: string;
}

const titleColor: Record<HeadingTone, string> = {
  light: 'text-ink',
  dark: 'text-white',
  yellow: 'text-ink',
};

const eyebrowColor: Record<HeadingTone, string> = {
  light: 'text-subtle',
  dark: 'text-primary',
  yellow: 'text-ink/70',
};

const bodyColor: Record<HeadingTone, string> = {
  light: 'text-mute',
  dark: 'text-mute-on-dark',
  yellow: 'text-ink',
};

const titleSize: Record<'lg' | 'md', string> = {
  lg: 'text-[44px] leading-[1.05] max-lg:text-[36px] max-md:text-[26px] max-md:leading-[1.1]',
  md: 'text-[30px] leading-[1.1] max-md:text-[22px] max-md:leading-[1.15]',
};

/** Открытие раздела: надзаголовок, заголовок Unbounded и абзац справа. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  note,
  size = 'lg',
  tone = 'light',
  as: Heading = 'h2',
  center = false,
  className,
}: SectionHeadingProps) {
  const head = (
    <div
      className={[
        'flex flex-col gap-2.5',
        center ? 'items-center text-center' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <span className={`text-[14px] font-semibold ${eyebrowColor[tone]} max-md:text-[13px]`}>
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={[
          'font-display font-bold tracking-[-0.03em] text-balance',
          titleSize[size],
          titleColor[tone],
        ].join(' ')}
      >
        {title}
      </Heading>
      {lead ? (
        <p className={`max-w-[46ch] text-[17px] ${bodyColor[tone]} text-pretty max-md:text-[14px]`}>
          {lead}
        </p>
      ) : null}
    </div>
  );

  if (!note) {
    return <header className={className}>{head}</header>;
  }

  return (
    <header
      className={[
        'flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {head}
      <p
        className={`max-w-[46ch] text-[15px] ${bodyColor[tone]} text-pretty max-md:text-[14px]`}
      >
        {note}
      </p>
    </header>
  );
}
