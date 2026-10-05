import Link from 'next/link';
import { Photo } from '@/components/ui/photo';
import { PriceStamp } from '@/components/ui/price-stamp';
import { getDisplayName } from '@/lib/content/catalog';
import type { BouquetEntry } from '@/lib/content/schemas';

interface BouquetCardProps {
  bouquet: BouquetEntry;
  /** Подпись ссылки-действия. По умолчанию «Забрать». */
  actionLabel?: string;
  sizes?: string;
}

/**
 * Карточка товара: белый блок, фотография с зелёным штампом цены,
 * имя Oswald заглавными, одна строка состава, уезжающая стрелка.
 */
export function BouquetCard({
  bouquet,
  actionLabel = 'Забрать',
  sizes,
}: BouquetCardProps) {
  return (
    <Link
      href={`/bouquets/${bouquet.slug}`}
      className="group flex h-full flex-col bg-card"
    >
      <div className="relative overflow-hidden">
        <Photo
          src={bouquet.images[0].src}
          alt={bouquet.images[0].alt}
          ratio="card"
          zoomOnHover
          sizes={sizes}
        />
        <PriceStamp value={`${bouquet.priceFrom} ₽`} position="bottom-left" />
      </div>

      <div
        data-testid="bouquet-card-body"
        className="flex flex-1 flex-col gap-2 p-4.5"
      >
        <h3 className="type-heading-lg text-ink">{getDisplayName(bouquet.name)}</h3>
        <span className="text-sm text-mute text-pretty">{bouquet.shortDescription}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 type-button text-primary transition-[gap] duration-140 ease-linear group-hover:gap-[13px]">
          {actionLabel} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
