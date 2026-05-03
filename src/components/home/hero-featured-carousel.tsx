'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BouquetEntry } from '@/lib/content/schemas';
import styles from './hero-featured-carousel.module.scss';

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
      className={styles.root}
    >
      <div className={styles.header}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            Витрина
          </p>
          <div className={styles.copyBody}>
            <h2 className={styles.title}>
              Популярные букеты
            </h2>
            <p className={styles.description}>
              Подборка букетов, с которых удобно начать выбор.
            </p>
          </div>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label="Показать предыдущие букеты"
            onClick={() => scrollTrack('prev')}
            className={styles.controlButton}
          >
            <svg
              viewBox="0 0 24 24"
              className={styles.controlIcon}
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
            className={styles.controlButton}
          >
            <svg
              viewBox="0 0 24 24"
              className={styles.controlIcon}
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

      <div data-testid="hero-featured-carousel-viewport" className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
        >
          {bouquets.map((bouquet) => (
            <Link
              key={bouquet.slug}
              href={`/bouquets/${bouquet.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={bouquet.images[0].src}
                  alt={bouquet.images[0].alt}
                  fill
                  className={styles.image}
                  sizes="10.5rem"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{bouquet.name}</h3>
                <p className={styles.price}>от {bouquet.priceFrom} ₽</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <p className={styles.hint}>
        Свайпните, чтобы посмотреть больше вариантов.
      </p>
    </article>
  );
}
