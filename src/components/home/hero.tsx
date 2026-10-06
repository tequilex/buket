import Image from 'next/image';
import { OrderButton } from '@/components/order/order-button';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { RotatingBadge } from '@/components/ui/rotating-badge';

interface HeroProps {
  /** Цена входа — считается по каталогу, в разметке не зашита. */
  priceFrom: number;
  /** Букет для карточки «Хит к пятнице». */
  highlight: { href: string; name: string; note: string; price: number; image: string };
}

const heroPhoto = '/images/bouquets/hero.webp';

/**
 * Бенто первого экрана: жёлтая плитка во две строки слева, тёмный хит и белая
 * плашка доставки справа. На мобильном раскладка разворачивается в колонку,
 * а коллаж фотографий переезжает под лид.
 */
export function Hero({ priceFrom, highlight }: HeroProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr] grid-rows-[270px_270px] gap-3 px-3 max-lg:grid-cols-2 max-lg:grid-rows-[auto_230px] max-md:grid-cols-2 max-md:grid-rows-none max-md:gap-2 max-md:px-2">
      {/* ЖЁЛТАЯ ПЛИТКА */}
      <div className="relative row-span-2 flex flex-col justify-between overflow-hidden rounded-2xl bg-primary bg-dots p-12 max-lg:col-span-2 max-lg:row-span-1 max-md:col-span-2 max-md:gap-4 max-md:rounded-xl max-md:px-5 max-md:pt-6 max-md:pb-5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-27.5 -right-22.5 size-110 rounded-full bg-white opacity-50 max-md:-top-15 max-md:-right-15 max-md:size-55"
        />

        {/* Коллаж десктопа */}
        <div aria-hidden="true" className="max-lg:hidden">
          <Image
            src={heroPhoto}
            alt=""
            width={270}
            height={410}
            priority
            sizes="270px"
            className="absolute top-11 right-17.5 h-102.5 w-67.5 rounded-lg border-[6px] border-white object-cover shadow-photo"
          />
          <Image
            src="/images/bouquets/4.webp"
            alt=""
            width={150}
            height={150}
            sizes="150px"
            className="absolute right-5 bottom-6.5 size-37.5 rounded-full border-[6px] border-white object-cover"
          />
          <div className="absolute top-75 right-67.5">
            <RotatingBadge />
          </div>
          <span className="absolute top-15 right-62.5 rotate-[-7deg] rounded-sm bg-card px-3.5 py-2.5 text-[15px] font-bold text-ink shadow-sticker">
            от {priceFrom.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <div className="relative flex max-w-110 flex-col gap-5.5 max-md:gap-4">
          <span className="flex items-center gap-2 self-start rounded-full bg-card px-3.5 py-1.75 text-[13px] font-semibold text-ink">
            <span aria-hidden="true" className="size-2 rounded-full bg-ink max-md:hidden" />
            Съедобные букеты ручной сборки
          </span>
          <h1 className="font-display text-[54px] leading-[1.04] font-bold tracking-[-0.03em] text-ink max-lg:text-[44px] max-md:text-[34px] max-md:leading-[1.06]">
            Букеты, которые{' '}
            <span className="inline-block rotate-[-2deg] rounded-md bg-ink px-3.5 pb-1.5 text-primary max-md:rounded-xs max-md:px-2.5 max-md:pb-1">
              съедают
            </span>
          </h1>
          <p className="max-w-[36ch] text-[17px] text-ink text-pretty max-md:text-[15px]">
            Раки, колбасы, сушёная рыба, сыр, мармелад. Привозим по Краснодару в день
            заказа.
          </p>
        </div>

        {/* Коллаж мобильного */}
        <div aria-hidden="true" className="relative -mx-1 hidden h-82.5 max-md:block">
          <Image
            src="/images/bouquets/5.webp"
            alt=""
            width={118}
            height={190}
            sizes="118px"
            className="absolute top-9 left-0 h-47.5 w-29.5 rotate-[-6deg] rounded-md border-4 border-white object-cover"
          />
          <Image
            src={heroPhoto}
            alt=""
            width={164}
            height={290}
            priority
            sizes="164px"
            className="absolute top-0 left-1/2 -ml-20.5 h-72.5 w-41 rounded-[22px] border-[5px] border-white object-cover shadow-photo"
          />
          <Image
            src="/images/bouquets/4.webp"
            alt=""
            width={104}
            height={104}
            sizes="104px"
            className="absolute top-5 right-0 size-26 rounded-full border-4 border-white object-cover"
          />
          <Image
            src="/images/bouquets/10.webp"
            alt=""
            width={104}
            height={150}
            sizes="104px"
            className="absolute right-1.5 bottom-7 h-37.5 w-26 rotate-[6deg] rounded-md border-4 border-white object-cover"
          />
          <div className="absolute -bottom-1 -left-1.5">
            <RotatingBadge size={104} />
          </div>
          <span className="absolute bottom-1.5 left-1/2 -ml-14.5 rotate-[-4deg] rounded-sm bg-ink px-3.5 py-2 font-display text-[16px] font-bold whitespace-nowrap text-primary shadow-sticker">
            от {priceFrom.toLocaleString('ru-RU')} ₽
          </span>
          <span className="absolute top-34 -right-0.5 rotate-[8deg] rounded-xs bg-card px-2.5 py-1.5 text-[12px] font-bold whitespace-nowrap text-ink shadow-sticker">
            День в день
          </span>
        </div>

        <div className="relative flex gap-2 max-md:flex-col">
          <Button variant="dark" size="lg" href="/catalog" className="max-md:h-13 max-md:min-h-0 max-md:text-[16px]">
            Смотреть каталог
          </Button>
          <OrderButton
            variant="white"
            size="lg"
            source="hero"
            className="max-md:h-13 max-md:min-h-0 max-md:text-[16px]"
          >
            Собрать под повод
          </OrderButton>
        </div>
      </div>

      {/* ХИТ К ПЯТНИЦЕ */}
      <a
        href={highlight.href}
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-white max-md:min-h-42.5 max-md:rounded-lg max-md:p-4"
      >
        <Image
          src={highlight.image}
          alt=""
          width={130}
          height={150}
          sizes="130px"
          className="absolute right-5 bottom-5 h-37.5 w-32.5 rounded-md object-cover max-md:-right-5.5 max-md:-bottom-5.5 max-md:size-27.5 max-md:rounded-full max-md:border-4 max-md:border-dark-raised"
        />
        <span className="relative self-start rounded-full bg-primary px-3 py-1.25 text-[13px] font-bold text-ink max-md:text-[12px]">
          Хит к пятнице
        </span>
        <div className="relative max-w-[55%] max-md:max-w-[62%]">
          <div className="font-display text-[22px] leading-[1.15] font-bold text-white max-md:text-[14px] max-md:leading-tight">
            {highlight.name}
          </div>
          <div className="mt-1.5 text-[14px] text-mute-on-dark max-md:hidden">
            {highlight.note}
          </div>
          <div className="mt-2.5 font-display text-[20px] font-bold text-primary max-md:mt-1 max-md:text-[14px]">
            {highlight.price.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </a>

      {/* ДОСТАВКА */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card p-7 max-md:min-h-37.5 max-md:rounded-lg max-md:p-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 size-37.5 rounded-full bg-primary max-md:-top-7.5 max-md:-right-7.5 max-md:size-22.5"
        />
        <Icon
          name="truck"
          size={34}
          className="absolute top-6.5 right-6.5 text-ink max-md:hidden"
        />
        <span className="text-[13px] font-bold text-subtle max-md:text-[12px]">
          Доставка
        </span>
        <div>
          <div className="font-display text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-ink max-md:text-[17px] max-md:leading-[1.1]">
            День в день
          </div>
          <div className="mt-2 text-[14px] text-mute max-md:hidden">
            Краснодар и Яблоновский. Интервал согласуем в переписке.
          </div>
        </div>
      </div>
    </div>
  );
}
