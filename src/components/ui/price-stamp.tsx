type StampPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const positions: Record<StampPosition, string> = {
  'top-left': 'absolute top-0 left-0',
  'top-right': 'absolute top-0 right-0',
  'bottom-left': 'absolute bottom-0 left-0',
  'bottom-right': 'absolute bottom-0 right-0',
};

interface PriceStampProps {
  /** Цифра с единицей, например «3800 ₽». */
  value: string;
  /** По умолчанию «от». */
  prefix?: string;
  /** md — одна строка. lg — надпись над 30px цифрой, для героя. */
  size?: 'md' | 'lg';
  /** Ставит штамп на угол фотографии. Родителю нужен relative. */
  position?: StampPosition;
  className?: string;
}

/**
 * Опознавательный жест системы: жёсткий зелёный блок цены,
 * впечатанный в угол фотографии.
 */
export function PriceStamp({
  value,
  prefix = 'от',
  size = 'md',
  position,
  className,
}: PriceStampProps) {
  return (
    <span
      className={[
        'z-2 inline-block whitespace-nowrap bg-primary px-[13px] py-2 font-display leading-none text-white uppercase',
        position ? positions[position] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {size === 'lg' ? (
        <>
          <span className="block type-eyebrow tracking-button opacity-85">{prefix}</span>
          <b className="block text-[30px] leading-none font-bold">{value}</b>
        </>
      ) : (
        <span className="text-stamp font-bold">
          {prefix} {value}
        </span>
      )}
    </span>
  );
}
