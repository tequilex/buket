interface RotatingBadgeProps {
  /**
   * Текст по окружности. Заканчивать разделителем: «… СБОРКА · ».
   * Длина окружности — около 295px, при кегле 12.5 с разрядкой 2 это примерно
   * 30 знаков. Если строка длиннее, хвост обрежется и упрётся в начало.
   */
  text?: string;
  /** Диаметр в px. 130 на десктопе, 104 на мобильном. */
  size?: number;
  /** Уникальный id пути — нужен, если на странице два значка. */
  id?: string;
  className?: string;
}

/**
 * Тёмный значок с текстом по кругу и жёлтой звёздочкой в центре.
 * Вращение останавливается при `prefers-reduced-motion`.
 */
export function RotatingBadge({
  text = 'ВСЕГДА СВЕЖЕЕ · РУЧНАЯ СБОРКА · ',
  size = 130,
  id: pathId = 'gb-badge-ring',
  className,
}: RotatingBadgeProps) {
  // Путь окружности строится в своей системе координат 130×130 и масштабируется
  // viewBox'ом — так один и тот же значок годится и для мобильных 104px.
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={[
        'relative inline-flex items-center justify-center rounded-full bg-ink',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <svg
        viewBox="0 0 130 130"
        className="absolute inset-0 size-full animate-spin-slow motion-reduce:animate-none"
      >
        <defs>
          <path
            id={pathId}
            d="M65,65 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          />
        </defs>
        <text
          fill="#fff"
          className="font-sans"
          style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 2 }}
        >
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span
        className="relative text-primary"
        style={{ fontSize: Math.round(size * 0.23) }}
      >
        ✱
      </span>
    </span>
  );
}
