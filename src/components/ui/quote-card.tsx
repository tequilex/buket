interface QuoteCardProps {
  text: string;
  author: string;
  /** Откуда пришёл отзыв: «WhatsApp», «Авито», «max». */
  source?: string;
}

/** Отзыв на приподнятом графитовом блоке, открытый крупной зелёной кавычкой. */
export function QuoteCard({ text, author, source }: QuoteCardProps) {
  return (
    <figure className="flex h-full flex-col gap-4.5 bg-dark-raised px-4.5 pt-6.5 pb-4.5">
      <span
        aria-hidden="true"
        className="font-display text-[44px] leading-[0.6] text-primary"
      >
        “
      </span>
      <blockquote className="text-[15px] leading-normal text-on-dark text-pretty">
        {text}
      </blockquote>
      <figcaption className="mt-auto type-label text-mute-on-dark">
        {author}
        {source ? ` · ${source}` : ''}
      </figcaption>
    </figure>
  );
}
