'use client';

import { useOrderModal } from '@/components/order/order-modal';

interface OrderPromptCardProps {
  title: string;
  text?: string;
  cta?: string;
  /** Метка места для Метрики. */
  source: string;
  /** Сколько колонок сетки занять — ими добивается неполный ряд букетов. */
  span?: number;
  className?: string;
}

const spans: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
};

/**
 * Жёлтая карточка-призыв. Встаёт на место недостающих букетов в сетке,
 * чтобы ряд не обрывался пустотой, и открывает ту же модалку заказа.
 */
export function OrderPromptCard({
  title,
  text,
  cta = 'Написать',
  source,
  span = 1,
  className,
}: OrderPromptCardProps) {
  const { open } = useOrderModal();

  return (
    <button
      type="button"
      onClick={() => open(source)}
      className={[
        'relative flex cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-lg bg-primary bg-dots p-7 text-left',
        'transition-colors duration-150 ease-linear hover:bg-primary-pressed',
        'max-md:rounded-md max-md:p-4',
        spans[span] ?? 'col-span-1',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        aria-hidden="true"
        className="flex size-14 items-center justify-center rounded-full bg-card text-[22px] font-bold text-ink max-md:size-10 max-md:text-[18px]"
      >
        ✱
      </span>
      <span className="flex flex-col gap-2.5">
        <span className="font-display text-[22px] leading-[1.1] font-bold text-ink max-md:text-[16px]">
          {title}
        </span>
        {text ? (
          <span className="text-[15px] text-ink text-pretty max-md:hidden">{text}</span>
        ) : null}
        <span className="mt-1.5 self-start rounded-full bg-ink px-4.5 py-2.5 text-[14px] font-semibold text-white max-md:mt-0 max-md:px-3.5 max-md:py-2 max-md:text-[13px]">
          {cta} <span aria-hidden="true">→</span>
        </span>
      </span>
    </button>
  );
}
