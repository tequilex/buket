import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';

export default function NotFound() {
  return (
    <div className="px-3 max-md:px-2">
      <div className="relative grid min-h-155 grid-cols-2 items-center gap-10 overflow-hidden rounded-3xl bg-ink bg-dots-dark px-16 py-18 text-white max-lg:grid-cols-1 max-md:min-h-0 max-md:gap-4.5 max-md:rounded-xl max-md:px-5 max-md:py-6">
        <div className="relative flex flex-col items-start gap-6.5 max-md:order-2 max-md:gap-4">
          <span className="rounded-full bg-primary px-4 py-1.75 text-[14px] font-bold text-ink">
            404
          </span>
          <h1 className="font-display text-[64px] leading-[1.02] font-bold tracking-[-0.03em] text-white max-lg:text-[48px] max-md:text-[32px] max-md:leading-[1.05]">
            Такой страницы
            <br />
            нет
          </h1>
          <p className="max-w-[40ch] text-[18px] text-mute-on-dark text-pretty max-md:text-[15px]">
            Вернитесь на главную или откройте каталог — десять букетов на месте.
          </p>
          <Button href="/" size="lg" arrow className="max-md:h-13 max-md:w-full">
            На главную
          </Button>
          <div className="flex flex-wrap gap-2">
            <Tag onDark href="/catalog" arrow={false}>
              Каталог
            </Tag>
            <Tag onDark href="/delivery" arrow={false}>
              Доставка
            </Tag>
            <Tag onDark href="/contacts" arrow={false}>
              Контакты
            </Tag>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative h-120 max-md:order-1 max-md:h-65"
        >
          <span className="absolute top-1/2 left-1/2 size-110 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary max-md:size-62.5" />
          <div className="absolute inset-0 flex items-center justify-center gap-1 font-display text-[190px] leading-none font-extrabold tracking-[-0.06em] text-ink max-lg:text-[140px] max-md:text-[104px]">
            <span>4</span>
            <Image
              src="/images/bouquets/4.webp"
              alt=""
              width={150}
              height={150}
              sizes="150px"
              className="size-37.5 rounded-full border-8 border-ink object-cover max-md:size-21 max-md:border-[5px]"
            />
            <span>4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
