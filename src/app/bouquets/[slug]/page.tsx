import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { ContactChannels } from '@/components/cta/contact-channels';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { FaqList } from '@/components/shared/faq-list';
import { Photo } from '@/components/ui/photo';
import { PriceStamp } from '@/components/ui/price-stamp';
import { Tag } from '@/components/ui/tag';
import {
  bouquets,
  categories,
  faqs,
  getBouquetBySlug,
  getBouquetsByCategory,
  getDisplayName,
  getShortCategoryTitle,
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
    imageUrl: bouquet.images[0]?.src,
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
    .slice(0, 3);

  return (
    <div>
      <JsonLd
        id={`bouquet-product-${bouquet.slug}`}
        data={buildBouquetProductJsonLd(bouquet)}
      />

      <div className="bg-dark pt-6.5 pb-22 text-on-dark">
        <div className="page-container flex flex-col gap-6.5">
          <Breadcrumbs
            onDark
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Каталог', href: '/catalog' },
              ...(category
                ? [
                    {
                      label: getShortCategoryTitle(category.title),
                      href: `/catalog/${category.slug}`,
                    },
                  ]
                : []),
              { label: getDisplayName(bouquet.name) },
            ]}
          />

          <div className="grid grid-cols-2 items-start gap-10 max-[900px]:grid-cols-1">
            <div className="relative">
              <Photo
                src={bouquet.images[0].src}
                alt={bouquet.images[0].alt}
                ratio="card"
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
              />
              <PriceStamp
                value={`${bouquet.priceFrom} ₽`}
                size="lg"
                position="top-right"
              />
            </div>

            <div className="flex flex-col items-start gap-4.5">
              <div className="flex flex-wrap gap-1.5">
                {bouquet.tags.map((tag) => (
                  <Tag key={tag} onDark>
                    {tag}
                  </Tag>
                ))}
              </div>

              <h1 className="type-display-lg text-on-dark">
                {getDisplayName(bouquet.name)}
              </h1>

              <p className="max-w-[46ch] text-mute-on-dark text-pretty">
                {bouquet.fullDescription}
              </p>

              <ContactChannels source={`bouquet_${bouquet.slug}`} onDark />

              <div className="mt-3 w-full">
                <span className="mb-2 block type-label text-primary">Что внутри</span>
                {bouquet.composition.map((item) => (
                  <div
                    key={item}
                    className="border-b border-dotted border-dark-line py-2.5 text-sm text-on-dark first-letter:uppercase"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="w-full">
                <Spec label="Размер" value={bouquet.weightOrSize} />
                <Spec label="Доставка" value={bouquet.deliveryNote} />
                <Spec label="Состав" value="Согласуется индивидуально до сборки" />
              </div>

              <div className="flex flex-wrap gap-2">
                <Tag onDark href="/locations/krasnodar">
                  Краснодар
                </Tag>
                <Tag onDark href="/locations/yablonovskiy">
                  Яблоновский
                </Tag>
                <Tag onDark href="/delivery">
                  Доставка
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedBouquets.length > 0 ? (
        <div className="page-container flex flex-col gap-10 py-22">
          <SectionHeading
            eyebrow={category ? `${category.title}` : 'Каталог'}
            title="Похожие составы"
          />
          <div className="grid grid-cols-3 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {relatedBouquets.map((item) => (
              <BouquetCard
                key={item.slug}
                bouquet={item}
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="bg-band py-22">
        <div className="page-container flex flex-col gap-10">
          <SectionHeading eyebrow="Вопросы" title="Коротко о главном" />
          <FaqList items={faqs} />
        </div>
      </div>

      <CtaBand
        tone="dark"
        eyebrow="Готовы собрать"
        title={`Забрать «${getDisplayName(bouquet.name)}»`}
        text="Напишите в удобный канал — согласуем состав, дату и адрес."
        cta="Написать"
        ctaSource={`bouquet_${bouquet.slug}`}
      />
    </div>
  );
}
