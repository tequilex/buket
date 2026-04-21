import Image from 'next/image';
import Link from 'next/link';
import type { BouquetEntry } from '@/lib/content/schemas';
import { ContactButtons } from '@/components/cta/contact-buttons';
import styles from './bouquet-card.module.scss';

interface BouquetCardProps {
  bouquet: BouquetEntry;
}

export function BouquetCard({ bouquet }: BouquetCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/bouquets/${bouquet.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={bouquet.images[0].src}
            alt={bouquet.images[0].alt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div data-testid="bouquet-card-body" className={styles.body}>
        <div className={styles.copy}>
          <div className={styles.tags}>
            {bouquet.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={styles.tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/bouquets/${bouquet.slug}`}>
            <h3 className={styles.title}>
              {bouquet.name}
            </h3>
          </Link>
          <p className={styles.description}>
            {bouquet.shortDescription}
          </p>
        </div>

        <div className={styles.meta}>
          <div>
            <p className={styles.metaLabel}>
              Цена
            </p>
            <p className={styles.price}>
              от {bouquet.priceFrom} ₽
            </p>
          </div>
          <Link
            href={`/bouquets/${bouquet.slug}`}
            className={styles.detailsLink}
          >
            Подробнее
          </Link>
        </div>

        <ContactButtons
          source={`card_${bouquet.slug}`}
          compact
          className={styles.actions}
        />
      </div>
    </article>
  );
}
