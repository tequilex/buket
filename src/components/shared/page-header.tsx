import type { ReactNode } from 'react';
import { Breadcrumbs } from './breadcrumbs';
import { SectionHeading } from './section-heading';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  /** Дополнительный контент под заголовком — каналы, метки, спецификации. */
  children?: ReactNode;
}

/**
 * Графитовая шапка раздела. Страница начинается и заканчивается графитом,
 * поэтому её открывает один и тот же блок на всех внутренних маршрутах.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: PageHeaderProps) {
  return (
    <div className="bg-dark pt-6.5 pb-10 text-on-dark">
      <div className="page-container flex flex-col gap-6.5">
        <Breadcrumbs onDark items={crumbs} />
        <SectionHeading as="h1" tone="dark" eyebrow={eyebrow} title={title} lead={lead} />
        {children}
      </div>
    </div>
  );
}
