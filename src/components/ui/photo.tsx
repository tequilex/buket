import Image from 'next/image';

type PhotoRatio = 'panel' | 'card' | 'wide' | 'square' | 'auto';

const ratios: Record<PhotoRatio, string> = {
  panel: 'aspect-panel',
  card: 'aspect-card',
  wide: 'aspect-wide',
  square: 'aspect-square',
  auto: 'h-full',
};

interface PhotoProps {
  src: string;
  alt: string;
  /** 3:4 у панелей, 4:5 у карточек и товара, 1:1 у пар в герое, 16:10 у вставок. */
  ratio?: PhotoRatio;
  /** Затемняет фотографию, когда сверху лежит текст. */
  tinted?: boolean;
  /** Наезд 1.03 при наведении на group-родителе. */
  zoomOnHover?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Фотография с прямыми углами в фиксированном соотношении.
 * Единственная обработка — затемнение до 0.82, когда сверху лежит текст.
 */
export function Photo({
  src,
  alt,
  ratio = 'card',
  tinted = false,
  zoomOnHover = false,
  priority = false,
  sizes = '(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw',
  className,
}: PhotoProps) {
  return (
    <div
      className={['relative w-full overflow-hidden bg-band', ratios[ratio], className]
        .filter(Boolean)
        .join(' ')}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={[
          'object-cover',
          tinted ? 'photo-tinted' : '',
          tinted ? 'group-hover:photo-tinted-hover' : '',
          !tinted && zoomOnHover
            ? 'transition-transform duration-500 ease-linear group-hover:scale-[1.03]'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </div>
  );
}
