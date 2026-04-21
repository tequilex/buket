import Image from 'next/image';
import Link from 'next/link';
import type { BouquetEntry } from '@/lib/content/schemas';
import { categories } from '@/lib/content/catalog';
import styles from './bouquet-card.module.scss';

interface BouquetCardProps {
  bouquet: BouquetEntry;
}

export function BouquetCard({ bouquet }: BouquetCardProps) {
  const categoryTitle =
    categories.find((category) => category.slug === bouquet.category)?.title ??
    'Букет';

  return (
    <article className={styles.card}>
      <Link href={`/bouquets/${bouquet.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={bouquet.images[0].src}
            alt={bouquet.images[0].alt}
            fill
            className={styles.image}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          />
        </div>
      </Link>

      <div data-testid="bouquet-card-body" className={styles.body}>
        <p className={styles.label}>{categoryTitle}</p>
        <Link href={`/bouquets/${bouquet.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>
            {bouquet.name}
          </h3>
        </Link>
        <p className={styles.description}>
          {bouquet.shortDescription}
        </p>

        <div className={styles.footer}>
          <p className={styles.price}>
            от {bouquet.priceFrom} ₽
          </p>
          <Link href={`/bouquets/${bouquet.slug}`} className={styles.detailsLink}>
            Смотреть букет
          </Link>
        </div>
      </div>
    </article>
  );
}
