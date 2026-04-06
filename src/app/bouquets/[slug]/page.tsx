import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactButtons } from '@/components/cta/contact-buttons';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  bouquets,
  categories,
  getBouquetBySlug,
  getBouquetsByCategory,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildBouquetProductJsonLd } from '@/lib/seo/structured-data';

interface BouquetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bouquets.map((bouquet) => ({ slug: bouquet.slug }));
}

export async function generateMetadata({
  params,
}: BouquetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) {
    return buildMetadata({
      title: 'Букет не найден',
      description: 'Запрошенный букет не найден.',
      path: `/bouquets/${slug}`,
    });
  }

  return buildMetadata({
    title: bouquet.seoTitle,
    description: bouquet.seoDescription,
    path: `/bouquets/${bouquet.slug}`,
  });
}

export default async function BouquetPage({ params }: BouquetPageProps) {
  const { slug } = await params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) {
    notFound();
  }

  const category = categories.find((entry) => entry.slug === bouquet.category);
  const relatedBouquets = getBouquetsByCategory(bouquet.category)
    .filter((entry) => entry.slug !== bouquet.slug)
    .slice(0, 2);

  return (
    <div className="page-shell space-y-12 py-10 sm:py-14">
      <JsonLd
        id={`bouquet-product-${bouquet.slug}`}
        data={buildBouquetProductJsonLd(bouquet)}
      />

      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          category ? { label: category.title, href: `/catalog/${category.slug}` } : undefined,
          { label: bouquet.name },
        ].filter((item): item is { label: string; href?: string } => Boolean(item))}
      />

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)]">
            <Image
              src={bouquet.images[0].src}
              alt={bouquet.images[0].alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {bouquet.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-[20px] border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--muted)]"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading
            eyebrow="Карточка букета"
            title={bouquet.name}
            description={bouquet.fullDescription}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[var(--line)] bg-[var(--card)] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Цена
              </p>
              <p className="mt-2 text-3xl font-semibold text-[var(--text)]">
                от {bouquet.priceFrom} ₽
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-[var(--card)] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Размер
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--text)]">
                {bouquet.weightOrSize}
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">Что внутри</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
                {bouquet.composition.map((item) => (
                  <li key={item} className="rounded-[18px] bg-[var(--surface)] px-4 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--muted)]">
              {bouquet.deliveryNote}
            </div>
            <ContactButtons source={`bouquet_${bouquet.slug}_primary`} />
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          Доставка
        </p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--text)]">
          Работаем по Краснодару и Яблоновскому. Для уточнения времени,
          адреса и возможной замены ингредиентов лучше сразу написать в удобный
          канал связи.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/locations/krasnodar"
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)]"
          >
            Краснодар
          </Link>
          <Link
            href="/locations/yablonovskiy"
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)]"
          >
            Яблоновский
          </Link>
        </div>
        <div className="mt-5">
          <ContactButtons source={`bouquet_${bouquet.slug}_secondary`} />
        </div>
      </section>

      {relatedBouquets.length > 0 ? (
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Похожие букеты"
            title="Еще в этой категории"
            description="Похожие позиции внутри той же категории, чтобы пользователь мог быстро сравнить варианты."
          />
          <div className="grid gap-6 xl:grid-cols-2">
            {relatedBouquets.map((item) => (
              <BouquetCard key={item.slug} bouquet={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
