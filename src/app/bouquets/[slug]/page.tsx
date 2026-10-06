import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OrderPromptCard } from '@/components/catalog/order-prompt-card';
import { ContactChannels } from '@/components/cta/contact-channels';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FaqList } from '@/components/shared/faq-list';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec, SpecList } from '@/components/shared/spec';
import { Icon, type IconName } from '@/components/ui/icon';
import { PriceStamp } from '@/components/ui/price-stamp';
import { RotatingBadge } from '@/components/ui/rotating-badge';
import { Tag } from '@/components/ui/tag';
import {
  bouquets,
  categories,
  categoryFaqs,
  getBouquetBySlug,
  getBouquetsByCategory,
  getDisplayName,
} from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildBouquetProductJsonLd, buildFaqJsonLd } from '@/lib/seo/structured-data';

interface BouquetPageProps {
  params: Promise<{ slug: string }>;
}

const notes: { icon: IconName; title: string; dark?: boolean }[] = [
  { icon: 'pencil', title: 'Что можно поменять' },
  { icon: 'leaf', title: 'Сезонные позиции' },
  { icon: 'truck', title: 'Цена и доставка', dark: true },
];

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
    <>
      <JsonLd
        id={`bouquet-product-${bouquet.slug}`}
        data={buildBouquetProductJsonLd(bouquet)}
      />
      <JsonLd
        id={`bouquet-faq-${bouquet.slug}`}
        data={buildFaqJsonLd(categoryFaqs[bouquet.category])}
      />

      <div className="px-7 pt-2 max-md:px-4.5">
        <Breadcrumbs
          tone="page"
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Каталог', href: '/catalog' },
            ...(category
              ? [{ label: category.shortTitle, href: `/catalog/${category.slug}` }]
              : []),
            { label: getDisplayName(bouquet.name) },
          ]}
        />
      </div>

      {/* ФОТО И КАРТОЧКА */}
      <div className="grid grid-cols-2 items-start gap-3 px-3 max-lg:grid-cols-1 max-md:gap-2 max-md:px-2">
        <div className="relative flex h-175 justify-center overflow-hidden rounded-3xl bg-primary bg-dots p-7 max-md:h-125 max-md:rounded-xl max-md:p-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-27.5 -right-27.5 size-100 rounded-full bg-white opacity-50"
          />
          {/* Фото показывается целиком: высота по плитке, ширина — по пропорции исходника */}
          <Image
            src={bouquet.images[0].src}
            alt={bouquet.images[0].alt}
            width={1232}
            height={2048}
            priority
            sizes="(max-width: 768px) 60vw, 40vw"
            className="relative aspect-source h-full w-auto rounded-xl border-[6px] border-white object-cover shadow-photo max-md:rounded-[20px] max-md:border-4"
          />
          <PriceStamp
            value={bouquet.priceFrom}
            size="lg"
            className="absolute top-4 right-4 max-md:top-3 max-md:right-3"
          />
          <div className="absolute bottom-6 left-6 max-md:hidden">
            <RotatingBadge text="СОСТАВ ПОД ВАС · СВЕЖЕЕ · " />
          </div>
        </div>

        <div className="flex flex-col gap-5.5 rounded-3xl bg-card p-10 max-md:gap-4 max-md:rounded-xl max-md:p-5">
          <div className="flex flex-wrap gap-1.5">
            {bouquet.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <h1 className="font-display text-[48px] leading-[1.04] font-bold tracking-[-0.03em] text-ink text-balance max-lg:text-[38px] max-md:text-[30px] max-md:leading-[1.05]">
            {getDisplayName(bouquet.name)}
          </h1>

          <p className="text-[16px] text-mute text-pretty max-md:text-[14px] max-md:leading-[1.55]">
            {bouquet.fullDescription}
          </p>

          <ContactChannels source={`bouquet_${bouquet.slug}`} />

          <div className="flex flex-col gap-3.5 rounded-xl bg-page px-6 py-5.5 max-md:gap-2.5 max-md:rounded-[20px] max-md:px-4 max-md:py-3.5">
            <span className="font-display text-[16px] font-bold text-ink max-md:text-[14px]">
              Что внутри
            </span>
            <div className="flex flex-wrap gap-2 max-md:gap-1.5">
              {bouquet.composition.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[15px] font-semibold text-ink max-md:px-3 max-md:py-1.5 max-md:text-[14px]"
                >
                  <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <SpecList>
            <Spec label="Размер" value={bouquet.weightOrSize} />
            <Spec label="Доставка" value={bouquet.deliveryNote} />
            <Spec label="Состав" value="Согласуется индивидуально до сборки" />
          </SpecList>

          <div className="mt-auto flex flex-wrap gap-2">
            <Tag href="/delivery">Доставка по Краснодару</Tag>
            <Tag href="/catalog">Весь каталог</Tag>
          </div>
        </div>
      </div>

      {/* СОСТАВ, ЦЕНА, СРОКИ */}
      <section className="flex flex-col gap-7 px-3 pt-19 max-md:gap-2 max-md:px-2 max-md:pt-6">
        <SectionHeading
          className="px-4 max-md:px-2"
          eyebrow="Про этот букет"
          title="Состав, цена, сроки"
          note={
            <>
              В основе — {bouquet.composition.join(', ')}. Это базовый набор, от которого
              отталкиваемся: состав согласуется до сборки и меняется под вкус, повод и
              бюджет.
            </>
          }
        />

        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:gap-2">
          {notes.map((note) => (
            <div
              key={note.title}
              className={[
                'flex flex-col gap-2.5 rounded-2xl p-7 max-md:gap-1.5 max-md:rounded-lg max-md:p-4.5',
                note.dark ? 'bg-ink text-white' : 'bg-card text-ink',
              ].join(' ')}
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary max-md:hidden">
                <Icon name={note.icon} size={24} className="text-ink" />
              </span>
              <h3 className="mt-2 font-display text-[18px] font-bold max-md:mt-0 max-md:text-[15px]">
                {note.title}
              </h3>
              <p
                className={[
                  'text-[15px] text-pretty max-md:text-[14px]',
                  note.dark ? 'text-mute-on-dark' : 'text-mute',
                ].join(' ')}
              >
                {note.title === 'Что можно поменять' ? (
                  <>
                    Убрать строку — нормально. Аллергия, не ест острое, не любит рыбу —
                    скажите заранее. До закупки поменять позицию легко, после уже нет.
                  </>
                ) : note.title === 'Сезонные позиции' ? (
                  <>
                    Ягоды, фрукты и морская часть зависят от того, что удалось взять
                    свежим в день закупки. Точный набор подтверждаем перед сборкой.
                  </>
                ) : (
                  <>
                    {bouquet.priceFrom.toLocaleString('ru-RU')} ₽ — за базовый состав
                    этого размера. Больше позиций — дороже, меньше — дешевле. Везём по
                    Краснодару и Яблоновскому,{' '}
                    <Link
                      href="/delivery"
                      className="font-semibold text-white underline decoration-primary decoration-[3px] underline-offset-4"
                    >
                      условия доставки
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ПОХОЖИЕ СОСТАВЫ */}
      <section className="mx-3 mt-16 flex flex-col gap-7 rounded-3xl bg-card p-10 max-md:mx-2 max-md:mt-6 max-md:gap-3.5 max-md:rounded-xl max-md:p-3">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5">
            <span className="text-[14px] font-semibold text-subtle max-md:hidden">
              {category?.title ?? 'Каталог'}
            </span>
            <h2 className="font-display text-[40px] leading-[1.05] font-bold tracking-[-0.03em] text-ink max-lg:text-[32px] max-md:text-[24px] max-md:leading-[1.1]">
              Похожие составы
            </h2>
          </div>
          {category ? (
            <Tag href={`/catalog/${category.slug}`} className="max-md:hidden">
              Все {category.shortTitle.toLowerCase()}
            </Tag>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-4 max-md:scroll-row max-md:grid-cols-none max-md:gap-2">
          {relatedBouquets.map((item) => (
            <div key={item.slug} className="max-md:w-42.5 max-md:flex-none">
              <BouquetCardLink slug={item.slug} />
            </div>
          ))}
          {relatedBouquets.length < 3 ? (
            <OrderPromptCard
              source={`bouquet_${bouquet.slug}_filler`}
              title="Собрать под повод"
              text="Скажите повод — предложим состав."
              className="max-md:w-42.5 max-md:flex-none"
            />
          ) : null}
        </div>
      </section>

      {/* ВОПРОСЫ И ПРИЗЫВ */}
      <section className="mx-3 mt-16 grid grid-cols-[1.5fr_1fr] gap-3 max-lg:grid-cols-1 max-md:mx-2 max-md:mt-6 max-md:gap-2">
        <div className="rounded-2xl bg-card p-9 max-md:rounded-xl max-md:p-4.5">
          <span className="text-[14px] font-semibold text-subtle">Вопросы</span>
          <h2 className="mt-2 mb-3 font-display text-[30px] leading-[1.1] font-bold tracking-[-0.03em] text-ink max-md:mt-1 max-md:mb-1 max-md:text-[18px] max-md:leading-[1.2]">
            Что спрашивают про этот состав
          </h2>
          <FaqList items={categoryFaqs[bouquet.category]} />
        </div>

        <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-ink p-9 max-md:gap-3 max-md:rounded-xl max-md:p-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-15 -right-15 size-37.5 rounded-full bg-primary max-md:-top-10 max-md:-right-10 max-md:size-27.5"
          />
          <div className="relative flex max-w-72.5 flex-col gap-3">
            <span className="text-[14px] font-semibold text-primary">Готовы собрать</span>
            <h2 className="font-display text-[30px] leading-[1.1] font-bold tracking-[-0.03em] text-white max-md:text-[20px] max-md:leading-[1.15]">
              Забрать «{getDisplayName(bouquet.name)}»
            </h2>
            <p className="text-[15px] text-mute-on-dark max-md:text-[14px]">
              Напишите в удобный канал — согласуем состав, дату и адрес.
            </p>
          </div>
          <ContactChannels
            source={`bouquet_${bouquet.slug}_cta`}
            onDark
            layout="stack"
            className="relative"
          />
        </div>
      </section>
    </>
  );
}

/** Локальная обёртка: карточка похожего состава без описания и кнопки. */
function BouquetCardLink({ slug }: { slug: string }) {
  const item = getBouquetBySlug(slug);
  if (!item) return null;

  return (
    <Link href={`/bouquets/${item.slug}`} className="group flex flex-col gap-3 max-md:gap-1.5">
      <div className="relative">
        <Image
          src={item.images[0].src}
          alt={item.images[0].alt}
          width={300}
          height={400}
          sizes="(max-width: 768px) 170px, 300px"
          className="aspect-panel w-full rounded-lg bg-page object-cover max-md:rounded-md"
        />
        <PriceStamp
          value={item.priceFrom}
          position="bottom-left"
          className="max-md:bottom-2 max-md:left-2"
        />
      </div>
      <div className="flex flex-col gap-0.5 px-1.5">
        <h3 className="text-[18px] font-bold text-ink max-md:text-[15px]">
          {getDisplayName(item.name)}
        </h3>
        <span className="text-[14px] text-subtle max-md:hidden">
          {item.shortDescription}
        </span>
      </div>
      <span className="rounded-full border-2 border-ink py-2.5 text-center text-[14px] font-semibold text-ink transition-colors duration-150 ease-linear group-hover:bg-ink group-hover:text-white max-md:hidden">
        Смотреть <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
