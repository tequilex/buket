'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/content/schemas';

interface FaqListProps {
  items: FaqItem[];
  /** Индекс открытого при монтировании. По умолчанию 0, null — все закрыты. */
  defaultOpen?: number | null;
}

/** Аккордеон с жёлтым плюс-минусом. Открыт один вопрос за раз. */
export function FaqList({ items, defaultOpen = 0 }: FaqListProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.question} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-4.5 text-left text-[17px] font-semibold text-ink max-md:py-3.5 max-md:text-[15px]"
            >
              {item.question}
              <span
                aria-hidden="true"
                className="flex size-8 flex-none items-center justify-center rounded-full bg-primary text-[18px] leading-none text-ink"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <p className="mb-4.5 max-w-[74ch] text-[15px] text-mute text-pretty max-md:mb-3.5 max-md:text-[14px]">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
