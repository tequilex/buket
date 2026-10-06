import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactChannels } from '@/components/cta/contact-channels';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec, SpecList } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon, type IconName } from '@/components/ui/icon';
import { StepsDotted } from '@/components/ui/step-card';
import { Tag } from '@/components/ui/tag';
import { buildMetadata } from '@/lib/seo/metadata';

const steps = [
  {
    n: '01',
    title: 'Написали',
    text: 'WhatsApp или Avito. Букет из каталога или описание своими словами.',
  },
  {
    n: '02',
    title: 'Согласовали',
    text: 'Состав, размер, бюджет, дату, адрес. Считаем доставку по вашему району.',
  },
  {
    n: '03',
    title: 'Собрали',
    text: 'Закупаем продукты под заказ и собираем вручную. День.',
  },
  {
    n: '04',
    title: 'Показали',
    text: 'Присылаем фото готового букета до того, как он уедет.',
  },
  {
    n: '05',
    title: 'Привезли',
    text: 'Курьер Яндекс Доставки везёт по адресу в согласованное время.',
  },
];

const notes: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'camera',
    title: 'Фото до отправки',
    text: 'Когда букет собран, присылаем фотографию. Если что-то смущает — скажите до того, как курьер заберёт заказ.',
  },
  {
    icon: 'store',
    title: 'Самовывоз',
    text: 'Забрать можно самому, из Яблоновского. Адрес и время согласуем при подтверждении заказа.',
  },
  {
    icon: 'repeat',
    title: 'Повторная доставка',
    text: 'Если получателя нет на месте или он не берёт трубку, курьер не сможет отдать букет. Второй выезд оплачивается отдельно, по тому же тарифу.',
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Доставка съедобных букетов по Краснодару и Яблоновскому',
    description:
      'Условия доставки: возим по всему Краснодару и Яблоновскому курьером Яндекс Доставки, стоимость по тарифу считаем при заказе, на сборку уходит день. Есть самовывоз.',
    path: '/delivery',
  });
}

export default function DeliveryPage() {
  return (
    <>
      {/* БЕНТО: шапка, чем возим, срок */}
      <div className="grid grid-cols-[2fr_1fr] grid-rows-[230px_230px] gap-3 px-3 max-lg:grid-cols-2 max-lg:grid-rows-[auto_200px] max-md:grid-cols-2 max-md:grid-rows-none max-md:gap-2 max-md:px-2">
        <div className="relative row-span-2 flex flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-primary bg-dots px-12 py-11 max-lg:col-span-2 max-lg:row-span-1 max-md:col-span-2 max-md:rounded-xl max-md:p-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-27.5 -right-22.5 size-105 rounded-full bg-white opacity-50 max-md:-top-15 max-md:-right-15 max-md:size-55"
          />
          <div aria-hidden="true" className="max-lg:hidden">
            <Image
              src="/images/bouquets/hero.webp"
              alt=""
              width={240}
              height={330}
              sizes="240px"
              className="absolute top-11 right-14 h-82.5 w-60 rounded-lg border-[6px] border-white object-cover"
            />
            <Image
              src="/images/bouquets/6.webp"
              alt=""
              width={130}
              height={130}
              sizes="130px"
              className="absolute right-6 bottom-7 size-32.5 rounded-full border-[6px] border-white object-cover"
            />
          </div>

          <Breadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'Доставка' }]}
          />

          <div className="relative flex max-w-117.5 flex-col items-start gap-4.5 max-md:gap-3.5">
            <span className="flex items-center gap-2 rounded-full bg-card px-3.5 py-1.75 text-[13px] font-semibold text-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-ink" />
              Доставка
            </span>
            <h1 className="font-display text-[50px] leading-[1.05] font-bold tracking-[-0.03em] text-ink text-balance max-lg:text-[40px] max-md:text-[28px] max-md:leading-[1.1]">
              По всему Краснодару и Яблоновскому
            </h1>
            <p className="max-w-[38ch] text-[17px] text-ink text-pretty max-md:text-[14px]">
              Букет собирается под заказ, поэтому дату и адрес согласуем до закупки.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl bg-ink p-7 text-white max-md:min-h-37.5 max-md:rounded-lg max-md:p-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-12.5 -right-12.5 size-42.5 rounded-full bg-primary max-md:-top-7.5 max-md:-right-7.5 max-md:size-22.5"
          />
          <Icon
            name="truck"
            size={34}
            className="absolute top-7 right-7 text-ink max-md:hidden"
          />
          <span className="relative text-[13px] font-bold text-primary max-md:text-[12px]">
            Чем возим
          </span>
          <div className="relative">
            <div className="font-display text-[24px] leading-[1.15] font-bold text-white max-md:text-[16px]">
              Курьер Яндекс Доставки
            </div>
            <div className="mt-2 text-[14px] text-mute-on-dark max-md:hidden">
              Стоимость по тарифу, считаем по адресу
            </div>
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl bg-card p-7 max-md:min-h-37.5 max-md:rounded-lg max-md:p-4">
          <Icon
            name="clock-3"
            size={32}
            className="absolute top-7 right-7 text-ink max-md:hidden"
          />
          <span className="text-[13px] font-bold text-subtle max-md:text-[12px]">
            Срок
          </span>
          <div>
            <div className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.03em] text-ink max-md:text-[20px]">
              День
            </div>
            <div className="mt-2 text-[14px] text-mute max-md:mt-1 max-md:text-[13px]">
              на закупку и сборку
            </div>
          </div>
        </div>
      </div>

      {/* УСЛОВИЯ */}
      <section className="mx-3 mt-11 grid grid-cols-[0.8fr_1fr_1fr] items-start gap-10 rounded-2xl bg-card p-12 max-lg:grid-cols-2 max-md:mx-2 max-md:mt-6 max-md:grid-cols-1 max-md:gap-4 max-md:rounded-xl max-md:p-5">
        <SectionHeading
          className="max-lg:col-span-full"
          eyebrow="Коротко"
          title="Условия"
        />

        <SpecList>
          <Spec label="Куда возим" value="Весь Краснодар и Яблоновский" />
          <Spec label="Чем возим" value="Курьер Яндекс Доставки" />
          <Spec label="Стоимость" value="По тарифу Яндекс Доставки, считаем по адресу" />
          <Spec label="Срок" value="День на закупку и сборку" />
          <Spec label="Самовывоз" value="Из Яблоновского" />
          <Spec label="Фото" value="Присылаем готовый букет до отправки" />
        </SpecList>

        <div className="flex flex-col gap-4.5 text-[15px] text-mute text-pretty max-md:gap-3 max-md:text-[14px]">
          <p>
            Фиксированной цены на доставку нет: тариф Яндекс Доставки зависит от
            расстояния. Назовите район — посчитаем сумму до того, как вы подтвердите
            заказ. В стоимость букета доставка не входит.
          </p>
          <p>
            На сборку нужен день: готовых букетов мы не держим и закупаем продукты под
            конкретный заказ. Успеть в тот же день иногда получается — зависит от состава
            и от того, в котором часу вы написали.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Tag href="/catalog">Весь каталог</Tag>
          </div>
        </div>
      </section>

      {/* ПЯТЬ ШАГОВ */}
      <section className="flex flex-col gap-12 px-7 pt-22 max-md:gap-5 max-md:px-4 max-md:pt-8">
        <SectionHeading center eyebrow="Как проходит заказ" title="Пять шагов" />
        <StepsDotted steps={steps} />
      </section>

      {/* ЧТО ВАЖНО ЗНАТЬ */}
      <section className="flex flex-col gap-7 px-3 pt-22 max-md:gap-3 max-md:px-2 max-md:pt-6">
        <SectionHeading
          className="px-4 max-md:px-2"
          eyebrow="Вручение"
          title="Что важно знать"
          note="Чтобы предложить состав с первого сообщения, напишите сразу четыре вещи: дату, район, бюджет и кому букет. Ограничения — аллергия, не ест острое — лучше назвать там же."
        />

        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:gap-2">
          {notes.map((note) => (
            <div
              key={note.title}
              className="flex flex-col gap-2.5 rounded-2xl bg-card p-7 max-md:gap-1.5 max-md:rounded-lg max-md:p-4.5"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary max-md:hidden">
                <Icon name={note.icon} size={26} className="text-ink" />
              </span>
              <h3 className="mt-2 font-display text-[18px] font-bold text-ink max-md:mt-0 max-md:text-[15px]">
                {note.title}
              </h3>
              <p className="text-[15px] text-mute text-pretty max-md:text-[14px]">
                {note.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-6 rounded-2xl bg-card px-7 py-6 max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:rounded-lg max-md:p-4.5">
          <span className="font-display text-[18px] font-bold text-ink max-md:text-[15px]">
            Написать в удобный канал
          </span>
          <ContactChannels source="delivery_page" className="max-md:grid max-md:grid-cols-2" />
        </div>
      </section>

      <CtaBand
        eyebrow="Готовы собрать"
        title="Скажите адрес и дату — посчитаем доставку"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource="delivery"
      />
    </>
  );
}
