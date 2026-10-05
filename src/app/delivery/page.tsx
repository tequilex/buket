import type { Metadata } from 'next';
import { ContactChannels } from '@/components/cta/contact-channels';
import { FaqList } from '@/components/shared/faq-list';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { CtaBand } from '@/components/ui/cta-band';
import { StepCard } from '@/components/ui/step-card';
import { faqs, locations } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

const steps = [
  {
    n: '01',
    title: 'Выбрали',
    text: 'Букет из каталога или пример того, что нравится — подойдёт и то и другое.',
  },
  {
    n: '02',
    title: 'Написали',
    text: 'WhatsApp, max или Avito. Отвечаем за 15 минут в рабочее время.',
  },
  {
    n: '03',
    title: 'Согласовали',
    text: 'Состав, стоимость, дату, адрес и удобный интервал доставки.',
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Доставка съедобных букетов',
    description:
      'Условия доставки съедобных букетов по Краснодару и Яблоновскому: как оформить заказ и согласовать удобное время вручения.',
    path: '/delivery',
  });
}

export default function DeliveryPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Доставка' }]}
        eyebrow="Доставка"
        title="Возим сами, в день заказа"
        lead="Букет собирается под конкретный заказ, поэтому дату и интервал согласуем в переписке — обычно это пять минут."
      />

      <div className="page-container flex flex-col gap-10 py-22">
        <div className="grid grid-cols-2 gap-2 max-[900px]:grid-cols-1">
          {locations.map((location) => (
            <article key={location.slug} className="bg-card p-5">
              <h2 className="type-heading-lg text-ink">{location.title}</h2>
              <p className="mt-3 text-mute text-pretty">{location.deliveryLead}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-primary py-22">
        <div className="page-container">
          <SectionHeading
            tone="green"
            eyebrow="Как проходит заказ"
            title="Три шага до доставки"
          />
          <div className="mt-10 grid grid-cols-3 gap-2 max-[900px]:grid-cols-1">
            {steps.map((step) => (
              <StepCard key={step.n} n={step.n} title={step.title} text={step.text} />
            ))}
          </div>
        </div>
      </div>

      <div className="page-container flex flex-col gap-10 py-22">
        <SectionHeading eyebrow="Вопросы" title="Коротко о главном" />
        <FaqList items={faqs} />
        <ContactChannels source="delivery_page" />
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
