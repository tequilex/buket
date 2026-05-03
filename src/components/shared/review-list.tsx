'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReviewEntry } from '@/lib/content/schemas';
import styles from './review-list.module.scss';

interface ReviewListProps {
  items: ReviewEntry[];
}

export function ReviewList({ items }: ReviewListProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(items.length);

  const getCardWidth = () => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    return card ? card.offsetWidth + 24 : 1;
  };

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const cardWidth = getCardWidth();
      const visible = Math.round(track.clientWidth / cardWidth);
      setPages(Math.max(1, items.length - visible + 1));
      setActive(Math.round(track.scrollLeft / cardWidth));
    };

    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        Реальные отзывы будут добавлены перед запуском сайта.
      </div>
    );
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.track} ref={trackRef}>
        {items.map((item) => (
          <article key={`${item.author}-${item.text}`} className={styles.item}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.text}>«{item.text}»</p>
            <div className={styles.meta}>
              <div className={styles.avatar}>{item.author[0]}</div>
              <div>
                <p className={styles.author}>{item.author}</p>
                <p className={styles.details}>{item.location} • {item.sourceLabel}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.arrow}
          onClick={() => scrollTo(Math.max(0, active - 1))}
          disabled={active === 0}
          aria-label="Предыдущий отзыв"
        >
          ‹
        </button>

        <div className={styles.dots}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={styles.arrow}
          onClick={() => scrollTo(Math.min(items.length - 1, active + 1))}
          disabled={active === items.length - 1}
          aria-label="Следующий отзыв"
        >
          ›
        </button>
      </div>
    </div>
  );
}
