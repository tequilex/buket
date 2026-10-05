import Link from 'next/link';
import { Photo } from './photo';

interface CategoryPanelProps {
  /** Двузначный индекс, «01» … «04». */
  number: string;
  title: string;
  /** Одна строка о том, что внутри категории. */
  composition?: string;
  /** Цена входа, выводится как «от … ₽». */
  price?: number;
  href: string;
  src: string;
  alt?: string;
}

/**
 * Высокая тёмная панель категории: затемнённое фото 3:4, номер сверху
 * и подпись на защитном градиенте снизу.
 */
export function CategoryPanel({
  number,
  title,
  composition,
  price,
  href,
  src,
  alt,
}: CategoryPanelProps) {
  return (
    <Link href={href} className="group relative block overflow-hidden bg-dark">
      <Photo
        src={src}
        alt={alt || title}
        ratio="panel"
        tinted
        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
      />
      <span className="absolute top-3 left-4.5 font-display type-label text-on-dark">
        {number}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 scrim-panel px-4 py-5">
        <span className="type-heading-lg text-on-dark">{title}</span>
        {composition ? (
          <span className="text-caption text-mute-on-dark">{composition}</span>
        ) : null}
        {price ? (
          <span className="mt-1 text-sm font-semibold text-on-dark">от {price} ₽</span>
        ) : null}
      </span>
    </Link>
  );
}
