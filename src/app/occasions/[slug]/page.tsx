import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { JsonLd } from '@/components/seo/json-ld';
import { FaqList } from '@/components/shared/faq-list';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { CtaBand } from '@/components/ui/cta-band';
import { Tag } from '@/components/ui/tag';
import { getBouquetBySlug, getOccasionBySlug, occasions } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildFaqJsonLd, buildItemListJsonLd } from '@/lib/seo/structured-data';

interface OccasionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return occasions.map((occasion) => ({ slug: occasion.slug }));
}

export async function generateMetadata({
  params,
}: OccasionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    return buildMetadata({
      title: 'Страница не найдена',
      description: 'Запрошенная подборка не найдена.',
      path: `/occasions/${slug}`,
    });
  }

  return buildMetadata({
    title: occasion.seoTitle,
    description: occasion.seoDescription,
    path: `/occasions/${occasion.slug}`,
  });
}

export default async function OccasionPage({ params }: OccasionPageProps) {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);

  if (!occasion) {
    notFound();
  }

  const relatedBouquets = occasion.relatedBouquetSlugs
    .map((bouquetSlug) => getBouquetBySlug(bouquetSlug))
    .filter((item) => item !== undefined);

  return (
    <div>
      <JsonLd
        id={`occasion-items-${occasion.slug}`}
        data={buildItemListJsonLd(relatedBouquets, occasion.title)}
      />
      {occasion.faqItems ? (
        <JsonLd
          id={`occasion-faq-${occasion.slug}`}
          data={buildFaqJsonLd(occasion.faqItems)}
        />
      ) : null}

      <PageHeader
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: occasion.title },
        ]}
        eyebrow="Повод"
        title={occasion.title}
        lead={occasion.intro}
      />

      <div className="page-container flex flex-col gap-10 py-22">
        <div className="grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {relatedBouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6.5">
          {occasion.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-sm text-mute text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-[0.8fr_1fr] items-start gap-10 bg-band p-5 max-[900px]:grid-cols-1 max-[900px]:gap-4.5">
          <SectionHeading eyebrow="Сроки" title="Когда заказывать" />
          <p className="text-sm text-mute text-pretty">{occasion.timing}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag href="/catalog">Весь каталог</Tag>
          <Tag href="/delivery">Доставка по Краснодару</Tag>
        </div>
      </div>

      {occasion.faqItems ? (
        <div className="bg-band py-22">
          <div className="page-container flex flex-col gap-10">
            <SectionHeading eyebrow="Вопросы" title="Что уточняют перед заказом" />
            <FaqList items={occasion.faqItems} />
          </div>
        </div>
      ) : null}

      <CtaBand
        eyebrow="Готовы собрать"
        title="Скажите повод — предложим состав"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource={`occasion_${occasion.slug}`}
      />
    </div>
  );
}
