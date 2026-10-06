import {
  CalendarClock,
  Camera,
  Clock3,
  Fish,
  Gift,
  HandHeart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Pencil,
  Phone,
  Repeat,
  ShoppingBag,
  Store,
  TriangleAlert,
  Truck,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { ComponentProps } from 'react';

/**
 * Монохромный контурный глиф Lucide, наследующий цвет текста.
 *
 * Имена остаются строками, а не импортами на местах вызова: так набор иконок
 * виден целиком в одном файле и его легко свести с дизайн-системой.
 */
const ICONS = {
  'calendar-clock': CalendarClock,
  camera: Camera,
  'clock-3': Clock3,
  fish: Fish,
  gift: Gift,
  'hand-heart': HandHeart,
  leaf: Leaf,
  'map-pin': MapPin,
  menu: Menu,
  'message-circle': MessageCircle,
  package: Package,
  pencil: Pencil,
  phone: Phone,
  repeat: Repeat,
  'shopping-bag': ShoppingBag,
  store: Store,
  'triangle-alert': TriangleAlert,
  truck: Truck,
  x: X,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps extends Omit<ComponentProps<'svg'>, 'name' | 'ref'> {
  name: IconName;
  /** Сторона квадрата в px. По умолчанию 20. */
  size?: number;
}

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  const Glyph = ICONS[name];

  return (
    <Glyph
      {...rest}
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      strokeWidth={2}
      className={['shrink-0', className].filter(Boolean).join(' ')}
    />
  );
}
