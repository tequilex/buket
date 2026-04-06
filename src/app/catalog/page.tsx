import Link from 'next/link';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { bouquets, categories } from '@/lib/content/catalog';

const featuredBouquets = bouquets.filter((bouquet) => bouquet.featured).slice(0, 4);

export default function CatalogPage() {
  return (
    <div className="page-shell space-y-16 py-10 sm:py-14">
      <SectionHeading
        eyebrow="Каталог"
        title="Съедобные букеты по составу"
        description="Основной вход в каталог: мясные, рыбные, сладкие и фруктовые подборки с отдельными страницами под SEO."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--shadow-soft)]"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Категория
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">
              {category.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {category.heroDescription}
            </p>
          </Link>
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Хиты"
          title="С чего начать выбор"
          description="Выделяем несколько букетов как быстрый вход для пользователя, который пришел с рекламы или локального поиска."
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {featuredBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </section>
    </div>
  );
}
