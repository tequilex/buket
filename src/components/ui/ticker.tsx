interface TickerProps {
  /** Слова, которые бегут мимо, — ингредиенты, а не обещания. */
  items: string[];
  /** По умолчанию «·». */
  separator?: string;
}

/** Зелёная полоса ингредиентов во всю ширину. Одна на страницу. */
export function Ticker({ items, separator = '·' }: TickerProps) {
  const line = items.join(` ${separator} `);

  return (
    <div className="overflow-hidden bg-primary py-[13px] whitespace-nowrap text-white">
      <span className="inline-block animate-ticker font-display text-[15px] leading-none font-semibold tracking-ticker uppercase">
        {line} {separator} {line} {separator}{' '}
      </span>
    </div>
  );
}
