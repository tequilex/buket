import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';

interface BreadcrumbItem {
  label: string;
  /** Не указывается на текущей странице. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Инвертирует след для графитовых шапок разделов. */
  onDark?: boolean;
}

/**
 * Заглавный след с разрядкой и разделителем «/».
 *
 * Здесь же отдаётся BreadcrumbList: компонент рендерится ровно один раз на
 * страницу, поэтому разметка не дублируется, а ни одна страница со следом не
 * остаётся без неё.
 */
export function Breadcrumbs({ items, onDark = false }: BreadcrumbsProps) {
  const currentColor = onDark ? 'text-on-dark' : 'text-ink';
  const restColor = onDark ? 'text-mute-on-dark' : 'text-mute';
  const slashColor = onDark ? 'text-dark-line-strong' : 'text-cream';

  return (
    <nav
      aria-label="Хлебные крошки"
      className="flex flex-wrap items-center gap-2 type-label"
    >
      <JsonLd
        id="breadcrumbs-jsonld"
        data={buildBreadcrumbJsonLd(
          items.map((item) => ({ name: item.label, path: item.href })),
        )}
      />
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !last ? (
              <Link href={item.href} className={restColor}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={last ? 'page' : undefined} className={last ? currentColor : restColor}>
                {item.label}
              </span>
            )}
            {last ? null : (
              <span aria-hidden="true" className={slashColor}>
                /
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
