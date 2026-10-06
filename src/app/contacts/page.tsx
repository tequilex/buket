import type { Metadata } from 'next';
import { ContactChannels } from '@/components/cta/contact-channels';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { InlineLink } from '@/components/ui/inline-link';
import { Tag } from '@/components/ui/tag';
import siteConfig from '@/data/site-config';
import { phoneHref } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

const channels = [
  {
    title: 'WhatsApp',
    text: 'Основной канал. Сюда удобнее всего прислать фото того, что нравится, и получить ответ с составом и ценой.',
  },
  {
    title: 'Avito',
    text: 'Если привычнее писать там же, где нашли объявление. Отвечаем так же, но уведомления приходят с задержкой.',
  },
  {
    title: 'Телефон',
    text: 'Для звонка, если переписка неудобна. Состав всё равно придётся согласовывать текстом — так меньше шансов что-то перепутать.',
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Контакты и заказ съедобных букетов',
    description:
      'Как связаться и заказать съедобный букет в Краснодаре и Яблоновском: WhatsApp, Avito, телефон. Собираем в Яблоновском, возим по Краснодару, есть самовывоз.',
    path: '/contacts',
  });
}

export default function ContactsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]}
        eyebrow="Контакты"
        title="Как с нами связаться"
        lead="Заказ идёт текстом: так быстрее согласовать состав, бюджет, дату и адрес, чем выбирать вслепую из карточек."
      >
        <ContactChannels source="contacts_page" onDark />

        <div className="max-w-[54ch]">
          <Spec
            onDark
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
          <Spec onDark label="Ответ" value="За 15 минут в рабочее время" />
          <Spec onDark label="Сборка" value="пгт. Яблоновский, вручную, день на заказ" />
          <Spec
            onDark
            label="Доставка"
            value="Краснодар и Яблоновский, курьером Яндекс Доставки"
          />
          <Spec onDark label="Самовывоз" value="Из Яблоновского, адрес при заказе" />
        </div>
      </PageHeader>

      {/* КАНАЛЫ */}
      <div className="page-container py-22">
        <div className="flex flex-wrap items-end justify-between gap-6.5">
          <SectionHeading eyebrow="Куда писать" title="Три способа" />
          <p className="max-w-[46ch] text-sm text-mute text-pretty">
            Разницы в скорости между каналами нет, выбирайте тот, что привычнее. В любом
            из них ответит тот же человек, который будет собирать букет.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 max-[900px]:grid-cols-1">
          {channels.map((channel) => (
            <div key={channel.title} className="flex flex-col gap-3 bg-card p-4.5">
              <h2 className="type-heading-md text-ink">{channel.title}</h2>
              <p className="text-sm text-mute text-pretty">{channel.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* КАК ПРОХОДИТ ЗАКАЗ */}
      <div className="bg-band py-22">
        <div className="page-container grid grid-cols-[0.8fr_1fr_1fr] items-start gap-10 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
          <SectionHeading eyebrow="Что дальше" title="После первого сообщения" />

          <div className="flex flex-col gap-4.5 text-sm text-mute text-pretty">
            <p>
              Чтобы предложить состав сразу, напишите четыре вещи: дату, район, бюджет и
              кому букет. Если есть ограничения — аллергия, не ест острое, не пьёт —
              назовите их там же.
            </p>
            <p>
              Мы отвечаем составом и ценой, считаем доставку по вашему району и называем
              итоговую сумму до того, как вы что-то подтвердите.
            </p>
          </div>

          <div className="flex flex-col gap-4.5 text-sm text-mute text-pretty">
            <p>
              Дальше день уходит на закупку и сборку. Когда букет готов, присылаем его
              фотографию — посмотреть и сказать, если что-то не так, можно до отправки.
            </p>
            <p>
              Подробные условия, стоимость и сроки — на странице{' '}
              <InlineLink href="/delivery">доставки</InlineLink>.
            </p>
          </div>
        </div>
      </div>

      {/* ГДЕ МЫ */}
      <div className="page-container py-22">
        <div className="grid grid-cols-[0.8fr_1fr_1fr] items-start gap-10 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
          <SectionHeading eyebrow="Где мы" title="Яблоновский" />

          <div className="flex flex-col gap-4.5 text-sm text-mute text-pretty">
            <p>
              Собираем в Яблоновском, возим по всему Краснодару и посёлку. Отказа по
              району не будет: на цену доставки расстояние влияет, на готовность
              взяться — нет.
            </p>
            <p>
              Забрать букет можно самому. Точный адрес и время согласуем, когда заказ
              подтверждён.
            </p>
          </div>

          <div className="flex flex-col gap-4.5 text-sm text-mute text-pretty">
            <p>
              Шоурума и витрины у нас нет: готовые букеты мы не держим, продукты
              покупаются под конкретный заказ. Приехать «посмотреть, что есть» не
              получится — смотреть будет нечего.
            </p>
            <p>
              Зато поэтому в букете свежее, а состав собирается под вас, а не под
              остатки на полке.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Tag href="/delivery">Условия доставки</Tag>
              <Tag href="/catalog">Весь каталог</Tag>
            </div>
          </div>
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
