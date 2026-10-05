'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/content/schemas';

interface FaqListProps {
  items: FaqItem[];
  /** Индекс открытого при монтировании. По умолчанию 0, null — все закрыты. */
  defaultOpen?: number | null;
}

/** Волосяной аккордеон со строками Oswald заглавными и зелёным плюс-минусом. */
export function FaqList({ items, defaultOpen = 0 }: FaqListProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-cream">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.question} className="border-b border-cream">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full min-h-11 cursor-pointer items-center justify-between gap-6.5 py-6.5 text-left type-heading-md text-ink"
            >
              {item.question}
              <span
                aria-hidden="true"
                className="flex-none font-display text-[26px] leading-none text-primary"
              >
                {isOpen ? '–' : '+'}
              </span>
            </button>
            {isOpen ? (
              <p className="mb-6.5 max-w-[74ch] text-mute text-pretty">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
