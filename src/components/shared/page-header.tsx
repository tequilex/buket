import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs } from './breadcrumbs';

type HeaderTone = 'yellow' | 'dark' | 'light' | 'gray';

interface Crumb {
  label: string;
  href?: string;
}

interface HeaderPhoto {
  src: string;
  alt: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  tone?: HeaderTone;
  /** Коллаж справа: два прямоугольных кадра и круглый. Ровно три фото. */
  photos?: [HeaderPhoto, HeaderPhoto, HeaderPhoto];
  /** Блок под заголовком — каналы связи на странице контактов. */
  children?: ReactNode;
  /** Карточка в правой колонке вместо коллажа — спецификация на контактах. */
  aside?: ReactNode;
}

const surfaces: Record<HeaderTone, string> = {
  yellow: 'bg-primary bg-dots text-ink',
  dark: 'bg-ink bg-dots-dark text-white',
  light: 'bg-card bg-dots text-ink',
  gray: 'bg-band bg-dots text-ink',
};

const blobs: Record<HeaderTone, string> = {
  yellow: 'bg-white opacity-50',
  dark: 'bg-primary',
  light: 'bg-primary',
  gray: 'bg-primary',
};

const pills: Record<HeaderTone, string> = {
  yellow: 'bg-card text-ink font-semibold',
  dark: 'bg-primary text-ink font-bold',
  light: 'bg-ink text-primary font-bold',
  gray: 'bg-ink text-primary font-bold',
};

const leads: Record<HeaderTone, string> = {
  yellow: 'text-ink',
  dark: 'text-mute-on-dark',
  light: 'text-mute',
  gray: 'text-body',
};

const frames: Record<HeaderTone, string> = {
  yellow: 'border-white',
  dark: 'border-dark-raised',
  light: 'border-page',
  gray: 'border-white',
};

const crumbTones: Record<HeaderTone, 'yellow' | 'dark'> = {
  yellow: 'yellow',
  dark: 'dark',
  light: 'yellow',
  gray: 'yellow',
};

/**
 * Плитка-открытие раздела. Цвет задаётся категорией или назначением страницы,
 * внутри — крошки сверху, заголовок снизу и коллаж фотографий справа.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  tone = 'yellow',
  photos,
  children,
  aside,
}: PageHeaderProps) {
  const frame = frames[tone];

  return (
    <div className="px-3 max-md:px-2">
      <div
        className={[
          'relative min-h-105 overflow-hidden rounded-3xl px-12 py-11',
          'max-md:min-h-0 max-md:rounded-xl max-md:p-5',
          surfaces[tone],
          aside
            ? 'grid grid-cols-[1.15fr_1fr] items-start gap-12 max-lg:grid-cols-1 max-lg:gap-8'
            : 'flex flex-col justify-between gap-6.5 max-md:gap-3.5',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute -top-30 -right-15 size-115 rounded-full max-md:-top-15 max-md:-right-15 max-md:size-55',
            blobs[tone],
          ].join(' ')}
        />
        {tone === 'dark' ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-[38%] size-75 rounded-full border-2 border-[#2e2f35] max-lg:hidden"
          />
        ) : null}

        {/* Коллаж растянут на всю плитку: у обёртки нулевой ширины preflight
            схлопнул бы кадры по max-width. */}
        {photos ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 max-lg:hidden">
            <Image
              src={photos[0].src}
              alt=""
              width={170}
              height={280}
              sizes="170px"
              className={`absolute top-14 right-75 h-70 w-42.5 rounded-lg border-[6px] object-cover ${frame}`}
            />
            <Image
              src={photos[1].src}
              alt=""
              width={190}
              height={320}
              sizes="190px"
              className={`absolute top-9 right-27.5 h-80 w-47.5 rounded-lg border-[6px] object-cover shadow-photo ${frame}`}
            />
            <Image
              src={photos[2].src}
              alt=""
              width={130}
              height={130}
              sizes="130px"
              className={`absolute right-8 bottom-8 size-32.5 rounded-full border-[6px] object-cover ${frame}`}
            />
          </div>
        ) : null}

        <div className={aside ? 'relative flex flex-col gap-6.5' : 'relative'}>
          <Breadcrumbs items={crumbs} tone={crumbTones[tone]} />

          <div
            className={[
              'relative flex max-w-[560px] flex-col items-start gap-4.5',
              aside ? '' : 'mt-10 max-md:mt-0',
              'max-md:gap-3.5',
            ].join(' ')}
          >
            {eyebrow ? (
              <span
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] ${pills[tone]}`}
              >
                {tone === 'yellow' ? (
                  <span aria-hidden="true" className="size-2 rounded-full bg-ink" />
                ) : null}
                {eyebrow}
              </span>
            ) : null}
            <h1 className="font-display text-[54px] leading-[1.04] font-bold tracking-[-0.03em] text-balance max-lg:text-[42px] max-md:text-[30px] max-md:leading-[1.08]">
              {title}
            </h1>
            {lead ? (
              <p
                className={`max-w-[46ch] text-[17px] ${leads[tone]} text-pretty max-md:text-[14px]`}
              >
                {lead}
              </p>
            ) : null}
            {children}
          </div>
        </div>

        {aside ? <div className="relative self-end max-lg:self-start">{aside}</div> : null}

        {/* Мобильный коллаж — ряд из трёх кадров под текстом */}
        {photos ? (
          <div aria-hidden="true" className="relative hidden h-32.5 gap-1.5 max-lg:flex">
            {photos.map((photo, position) => (
              <Image
                key={`${photo.src}-${position}`}
                src={photo.src}
                alt=""
                width={120}
                height={130}
                sizes="120px"
                className={`h-full min-w-0 flex-1 rounded-[16px] border-4 object-cover ${frame}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
