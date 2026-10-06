import type { Metadata } from 'next';
import { ContactChannels } from '@/components/cta/contact-channels';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { Tag } from '@/components/ui/tag';
import siteConfig from '@/data/site-config';
import { phoneHref } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Контакты и заказ съедобных букетов',
    description:
      'Контакты для заказа съедобных букетов в Краснодаре и Яблоновском: WhatsApp, max, Avito и быстрый ответ по доставке.',
    path: '/contacts',
  });
}

export default function ContactsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]}
        eyebrow="Контакты"
        title="Пишите в мессенджер"
        lead="Корзины нет и не будет: заказ идёт перепиской. Так быстрее согласовать состав, бюджет, дату и адрес."
      >
        <ContactChannels source="contacts_page" onDark />

        <div className="max-w-[54ch]">
          <Spec
            label="Телефон"
            value={
              <a
                href={phoneHref}
                // Цвет обязателен явно: базовое правило `a { color: ink }`
                // перебивает text-on-dark, унаследованный от Spec.
                className="text-on-dark underline decoration-primary underline-offset-[3px] hover:text-primary"
              >
                {siteConfig.phone}
              </a>
            }
          />
          <Spec label="Сборка" value="пгт. Яблоновский, вручную под конкретный заказ" />
          <Spec label="Доставка" value="Краснодар и Яблоновский, в день заказа по согласованию" />
          <Spec label="Ответ" value="За 15 минут в рабочее время" />
          <Spec label="Состав" value="Согласуется индивидуально до сборки" />
        </div>
      </PageHeader>

      <div className="page-container flex flex-col gap-10 py-22">
        <SectionHeading
          eyebrow="География"
          title="Где мы работаем"
          lead="Собираем в Яблоновском и возим по Краснодару. Время и стоимость доставки зависят от района и часа — считаем при заказе."
        />
        <div className="flex flex-wrap gap-2">
          <Tag href="/delivery">Доставка и самовывоз</Tag>
          <Tag href="/delivery">Доставка</Tag>
          <Tag href="/catalog">Весь каталог</Tag>
        </div>
      </div>

      <CtaBand
        eyebrow="Готовы собрать"
        title="Скажите повод — предложим состав"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource="contacts"
      />
    </div>
  );
}
