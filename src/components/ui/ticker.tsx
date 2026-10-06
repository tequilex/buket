interface TickerProps {
  /** Слова, которые бегут мимо, — ингредиенты, а не обещания. */
  items: string[];
}

/**
 * Тёмная полоса ингредиентов во всю ширину. Одна на страницу.
 *
 * Лента дублируется: анимация сдвигает её на половину длины, поэтому шов
 * приходится ровно на стык копий и не виден.
 */
export function Ticker({ items }: TickerProps) {
  const line = [...items, ...items];

  return (
    <div className="overflow-hidden bg-ink py-5 text-white max-md:py-3.5">
      <div className="flex w-max animate-ticker max-md:animate-ticker-fast motion-reduce:animate-none">
        {line.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-7 pr-7 font-display text-[28px] font-semibold whitespace-nowrap max-md:gap-4 max-md:pr-4 max-md:text-[18px]"
          >
            {item}
            <span aria-hidden="true" className="text-primary">
              ✱
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
