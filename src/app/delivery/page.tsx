import type { Metadata } from 'next';
import { ContactChannels } from '@/components/cta/contact-channels';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { StepCard } from '@/components/ui/step-card';
import { Tag } from '@/components/ui/tag';
import { locations } from '@/lib/content/catalog';
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

const notes = [
  {
    title: 'Фото до отправки',
    text: 'Когда букет собран, присылаем фотографию. Если что-то смущает — скажите до того, как курьер заберёт заказ.',
  },
  {
    title: 'Самовывоз',
    text: 'Забрать можно самому, из Яблоновского. Адрес и время согласуем при подтверждении заказа.',
  },
  {
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
    <div>
      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Доставка' }]}
        eyebrow="Доставка"
        title="По всему Краснодару и Яблоновскому"
        lead="Букет собирается под заказ, поэтому дату и адрес согласуем до закупки."
      />

      {/* УСЛОВИЯ — спецификация и пояснения в одной полосе */}
      <div className="page-container py-22">
        <div className="grid grid-cols-[0.8fr_1fr_1fr] items-start gap-10 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
          <SectionHeading eyebrow="Коротко" title="Условия" />

          <div className="w-full">
            <Spec label="Куда возим" value="Весь Краснодар и Яблоновский" />
            <Spec label="Чем возим" value="Курьер Яндекс Доставки" />
            <Spec label="Стоимость" value="По тарифу Яндекс Доставки, считаем по адресу" />
            <Spec label="Срок" value="День на закупку и сборку" />
            <Spec label="Самовывоз" value="Из Яблоновского" />
            <Spec label="Фото" value="Присылаем готовый букет до отправки" />
          </div>

          <div className="flex flex-col gap-4.5 text-sm text-mute text-pretty">
            <p>
              Фиксированной цены на доставку нет: тариф Яндекс Доставки зависит от
              расстояния. Назовите район — посчитаем сумму до того, как вы подтвердите
              заказ. В стоимость букета доставка не входит.
            </p>
            <p>
              На сборку нужен день: готовых букетов мы не держим и закупаем продукты
              под конкретный заказ. Успеть в тот же день иногда получается — зависит от
              состава и от того, в котором часу вы написали.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {locations.map((location) => (
                <Tag key={location.slug} href={`/locations/${location.slug}`}>
                  {location.city}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ШАГИ */}
      <div className="bg-primary py-22">
        <div className="page-container">
          <SectionHeading tone="green" eyebrow="Как проходит заказ" title="Пять шагов" />
          <div className="mt-10 grid grid-cols-5 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {steps.map((step) => (
              <StepCard key={step.n} n={step.n} title={step.title} text={step.text} />
            ))}
          </div>
        </div>
      </div>

      {/* ВРУЧЕНИЕ И ЗАКАЗ */}
      <div className="page-container py-22">
        <div className="flex flex-wrap items-end justify-between gap-6.5">
          <SectionHeading eyebrow="Вручение" title="Что важно знать" />
          <p className="max-w-[44ch] text-sm text-mute text-pretty">
            Чтобы предложить состав с первого сообщения, напишите сразу четыре вещи:
            дату, район, бюджет и кому букет. Ограничения — аллергия, не ест острое —
            лучше назвать там же.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 max-[900px]:grid-cols-1">
          {notes.map((note) => (
            <div key={note.title} className="flex flex-col gap-3 bg-card p-4.5">
              <h3 className="type-heading-md text-ink">{note.title}</h3>
              <p className="text-sm text-mute text-pretty">{note.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ContactChannels source="delivery_page" />
        </div>
      </div>

      <CtaBand
        eyebrow="Готовы собрать"
        title="Скажите адрес и дату — посчитаем доставку"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource="delivery"
      />
    </div>
  );
}
