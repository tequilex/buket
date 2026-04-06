import Image from 'next/image';
import Link from 'next/link';
import type { BouquetEntry } from '@/lib/content/schemas';
import { ContactButtons } from '@/components/cta/contact-buttons';

interface BouquetCardProps {
  bouquet: BouquetEntry;
}

export function BouquetCard({ bouquet }: BouquetCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] shadow-[0_18px_40px_rgba(47,52,38,0.08)]">
      <Link href={`/bouquets/${bouquet.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
          <Image
            src={bouquet.images[0].src}
            alt={bouquet.images[0].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {bouquet.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/bouquets/${bouquet.slug}`}>
            <h3 className="text-xl font-semibold text-[var(--text)] transition hover:text-[var(--accent-strong)]">
              {bouquet.name}
            </h3>
          </Link>
          <p className="text-sm leading-6 text-[var(--muted)]">
            {bouquet.shortDescription}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Цена
            </p>
            <p className="text-2xl font-semibold text-[var(--text)]">
              от {bouquet.priceFrom} ₽
            </p>
          </div>
          <Link
            href={`/bouquets/${bouquet.slug}`}
            className="text-sm font-medium text-[var(--accent-strong)]"
          >
            Подробнее
          </Link>
        </div>

        <ContactButtons source={`card_${bouquet.slug}`} />
      </div>
    </article>
  );
}
