import Image from 'next/image';
import Link from 'next/link';
import { PriceStamp } from '@/components/ui/price-stamp';
import { getDisplayName } from '@/lib/content/catalog';
import type { BouquetEntry } from '@/lib/content/schemas';

interface BouquetCardProps {
  bouquet: BouquetEntry;
  /** Подпись кнопки. По умолчанию «Забрать». */
  actionLabel?: string;
  /**
   * Метка слева сверху. По умолчанию «Хит» у `featured`.
   * На странице повода вместо неё ставится белая метка категории.
   */
  badge?: string;
  badgeTone?: 'dark' | 'light';
  sizes?: string;
}

/**
 * Карточка товара: фото 3:4 с жёлтым ценником, название, строка состава
 * и кнопка с обводкой. На мобильном описание и кнопка скрыты — карточка
 * целиком работает ссылкой.
 */
export function BouquetCard({
  bouquet,
  actionLabel = 'Забрать',
  badge,
  badgeTone = 'dark',
  sizes = '(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 300px',
}: BouquetCardProps) {
  const label = badge ?? (bouquet.featured ? 'Хит' : null);

  return (
    <Link
      href={`/bouquets/${bouquet.slug}`}
      className="group flex h-full flex-col gap-3 max-md:gap-2"
    >
      <div className="relative">
        <Image
          src={bouquet.images[0].src}
          alt={bouquet.images[0].alt}
          width={300}
          height={400}
          sizes={sizes}
          className="aspect-panel w-full rounded-lg bg-page object-cover max-md:rounded-md"
        />
        {label ? (
          <span
            className={[
              'absolute top-3 left-3 rounded-full px-3 py-1 text-[12px] font-bold max-md:top-2 max-md:left-2',
              badgeTone === 'dark' ? 'bg-ink text-primary' : 'bg-card text-ink',
            ].join(' ')}
          >
            {label}
          </span>
        ) : null}
        <PriceStamp
          value={bouquet.priceFrom}
          position="bottom-left"
          className="max-md:bottom-2 max-md:left-2"
        />
      </div>

      <div className="flex flex-col gap-0.75 px-1.5">
        <h3 className="text-[17px] font-bold text-ink max-md:text-[15px] max-md:leading-[1.25]">
          {getDisplayName(bouquet.name)}
        </h3>
        <span className="text-[14px] text-subtle text-pretty max-md:hidden">
          {bouquet.shortDescription}
        </span>
        <span className="mt-0.5 text-[13px] text-placeholder max-md:mt-0 max-md:text-subtle">
          {bouquet.weightOrSize}
        </span>
      </div>

      <span className="mt-auto rounded-full border-2 border-ink py-2.25 text-center text-[14px] font-semibold text-ink transition-colors duration-150 ease-linear group-hover:bg-ink group-hover:text-white max-md:hidden">
        {actionLabel} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
