'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BouquetEntry } from '@/lib/content/schemas';

interface HeroFeaturedCarouselProps {
  bouquets: BouquetEntry[];
}

export function HeroFeaturedCarousel({
  bouquets,
}: HeroFeaturedCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (bouquets.length === 0) {
    return null;
  }

  function scrollTrack(direction: 'prev' | 'next') {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const cardWidth = 176;
    const gap = 10;
    const offset = direction === 'next' ? cardWidth + gap : -(cardWidth + gap);

    track.scrollBy({ left: offset, behavior: 'smooth' });
  }

  return (
    <article
      data-testid="hero-featured-carousel"
      className="w-full max-w-[31rem] min-w-0 justify-self-end overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-4 shadow-[var(--shadow-soft)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
            Витрина
          </p>
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--text)] sm:text-xl">
              Популярные букеты
            </h2>
            <p className="max-w-[17rem] text-xs leading-5 text-[var(--muted)]">
              Подборка букетов, с которых удобно начать выбор.
            </p>
          </div>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Показать предыдущие букеты"
            onClick={() => scrollTrack('prev')}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--background)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m15 5-7 7 7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Показать следующие букеты"
            onClick={() => scrollTrack('next')}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--background)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9 5 7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div data-testid="hero-featured-carousel-viewport" className="mt-4 overflow-hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {bouquets.map((bouquet) => (
            <Link
              key={bouquet.slug}
              href={`/bouquets/${bouquet.slug}`}
              className="group min-w-[10.5rem] max-w-[10.5rem] snap-start overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--background)] transition hover:border-[var(--accent)] hover:shadow-[0_10px_24px_rgba(47,52,38,0.08)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                <Image
                  src={bouquet.images[0].src}
                  alt={bouquet.images[0].alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="10.5rem"
                />
              </div>
              <div className="space-y-2 p-2.5">
                <div className="space-y-1">
                  <h3 className="text-[13px] font-semibold leading-5 text-[var(--text)]">
                    {bouquet.name}
                  </h3>
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-[var(--text)]">
                    от {bouquet.priceFrom} ₽
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-[var(--muted)] sm:hidden">
        Свайпните, чтобы посмотреть больше вариантов.
      </p>
    </article>
  );
}
