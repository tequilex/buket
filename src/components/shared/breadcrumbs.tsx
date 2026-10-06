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
  /**
   * yellow — крошки лежат на жёлтой/светлой плитке (ink с прозрачностью).
   * dark — на графите. page — отдельной строкой на сером фоне.
   */
  tone?: 'yellow' | 'dark' | 'page';
  className?: string;
}

/**
 * След 14px с разделителем «/».
 *
 * Здесь же отдаётся BreadcrumbList: компонент рендерится ровно один раз на
 * страницу, поэтому разметка не дублируется, а ни одна страница со следом не
 * остаётся без неё.
 */
export function Breadcrumbs({ items, tone = 'yellow', className }: BreadcrumbsProps) {
  const current =
    tone === 'dark' ? 'text-white' : tone === 'page' ? 'text-ink' : 'text-ink';
  const rest =
    tone === 'dark'
      ? 'text-mute-on-dark hover:text-white'
      : tone === 'page'
        ? 'text-subtle hover:text-ink'
        : 'text-ink/70 hover:text-ink';
  const slash = tone === 'dark' ? 'text-subtle' : 'text-ink/50';

  return (
    <nav
      aria-label="Хлебные крошки"
      className={[
        'flex flex-wrap items-center gap-2 text-[14px] font-medium max-md:text-[13px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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
              <Link href={item.href} className={rest}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={last ? 'page' : undefined}
                className={last ? current : rest}
              >
                {item.label}
              </span>
            )}
            {last ? null : (
              <span aria-hidden="true" className={slash}>
                /
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
