type StampPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const positions: Record<StampPosition, string> = {
  'top-left': 'absolute top-3 left-3',
  'top-right': 'absolute top-3 right-3',
  'bottom-left': 'absolute bottom-3 left-3',
  'bottom-right': 'absolute bottom-3 right-3',
};

interface PriceStampProps {
  /** Цена числом. Форматируется разрядами по-русски. */
  value: number;
  /** По умолчанию «от». */
  prefix?: string;
  /** md — жёлтая пилюля на фотографии. lg — тёмная плашка на странице букета. */
  size?: 'md' | 'lg';
  /** Ставит ценник на угол фотографии. Родителю нужен relative. */
  position?: StampPosition;
  className?: string;
}

/** Опознавательный жест системы: жёлтый ценник, впечатанный в угол фотографии. */
export function PriceStamp({
  value,
  prefix = 'от',
  size = 'md',
  position,
  className,
}: PriceStampProps) {
  const price = `${value.toLocaleString('ru-RU')} ₽`;

  if (size === 'lg') {
    return (
      <span
        className={[
          'z-2 inline-flex flex-col rounded-lg bg-ink px-5 py-4 leading-[1.1] shadow-sticker',
          position ? positions[position] : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="text-[13px] text-mute-on-dark">{prefix}</span>
        <b className="font-display text-[26px] font-bold whitespace-nowrap text-primary max-md:text-[20px]">
          {price}
        </b>
      </span>
    );
  }

  return (
    <span
      className={[
        'z-2 inline-block rounded-full bg-primary px-3.5 py-2 text-[16px] leading-none',
        'font-bold whitespace-nowrap text-ink max-md:px-2.5 max-md:py-1 max-md:text-[13px]',
        position ? positions[position] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {prefix} {price}
    </span>
  );
}
