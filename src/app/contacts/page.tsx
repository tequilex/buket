import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactChannels } from '@/components/cta/contact-channels';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { Spec } from '@/components/shared/spec';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon, type IconName } from '@/components/ui/icon';
import { Tag } from '@/components/ui/tag';
import siteConfig from '@/data/site-config';
import { phoneHref } from '@/lib/content/catalog';
import { buildMetadata } from '@/lib/seo/metadata';

const channels: { icon: IconName; title: string; text: string; accent?: boolean }[] = [
  {
    icon: 'message-circle',
    title: 'WhatsApp',
    text: 'Основной канал. Сюда удобнее всего прислать фото того, что нравится, и получить ответ с составом и ценой.',
    accent: true,
  },
  {
    icon: 'shopping-bag',
    title: 'Avito',
    text: 'Если привычнее писать там же, где нашли объявление. Отвечаем так же, но уведомления приходят с задержкой.',
  },
  {
    icon: 'phone',
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
    <>
      <PageHeader
        tone="dark"
        crumbs={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]}
        eyebrow="Контакты"
        title="Как с нами связаться"
        lead="Заказ идёт текстом: так быстрее согласовать состав, бюджет, дату и адрес, чем выбирать вслепую из карточек."
        aside={
          <div className="rounded-xl bg-card px-6 py-2 text-ink">
            <Spec
              label="Телефон"
              value={
                <a
                  href={phoneHref}
                  className="font-bold text-ink underline decoration-primary decoration-[3px] underline-offset-4"
                >
                  {siteConfig.phone}
                </a>
              }
            />
            <Spec label="Ответ" value="За 15 минут в рабочее время" />
            <Spec label="Сборка" value="пгт. Яблоновский, вручную, день на заказ" />
            <Spec
              label="Доставка"
              value="Краснодар и Яблоновский, курьером Яндекс Доставки"
            />
            <Spec label="Самовывоз" value="Из Яблоновского, адрес при заказе" />
          </div>
        }
      >
        <ContactChannels source="contacts_page" onDark className="mt-2" />
      </PageHeader>

      {/* ТРИ СПОСОБА */}
      <section className="flex flex-col gap-7 px-3 pt-19 max-md:gap-3 max-md:px-2 max-md:pt-8">
        <SectionHeading
          className="px-4 max-md:px-2"
          eyebrow="Куда писать"
          title="Три способа"
          note="Разницы в скорости между каналами нет, выбирайте тот, что привычнее. В любом из них ответит тот же человек, который будет собирать букет."
        />

        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:gap-2">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className={[
                'flex min-h-62.5 flex-col gap-3 rounded-2xl p-7 transition-transform duration-150 ease-linear hover:-translate-y-1',
                'max-md:min-h-0 max-md:gap-2 max-md:rounded-lg max-md:p-4.5',
                channel.accent ? 'bg-primary' : 'bg-card',
              ].join(' ')}
            >
              <span
                className={[
                  'flex size-14 items-center justify-center rounded-full max-md:size-11',
                  channel.accent ? 'bg-card' : 'bg-primary',
                ].join(' ')}
              >
                <Icon name={channel.icon} size={26} className="text-ink" />
              </span>
              <h2 className="mt-auto font-display text-[22px] font-bold text-ink max-md:mt-2 max-md:text-[17px]">
                {channel.title}
              </h2>
              <p className="text-[15px] text-body text-pretty max-md:text-[14px]">
                {channel.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ПОСЛЕ ПЕРВОГО СООБЩЕНИЯ */}
      <section className="mx-3 mt-16 grid grid-cols-[0.8fr_1fr_1fr] items-start gap-10 rounded-2xl bg-card p-12 max-lg:grid-cols-2 max-md:mx-2 max-md:mt-6 max-md:grid-cols-1 max-md:gap-4 max-md:rounded-xl max-md:p-5">
        <SectionHeading
          className="max-lg:col-span-full"
          size="md"
          eyebrow="Что дальше"
          title="После первого сообщения"
        />

        <div className="flex flex-col gap-4.5 text-[15px] text-mute text-pretty max-md:gap-3 max-md:text-[14px]">
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

        <div className="flex flex-col gap-4.5 text-[15px] text-mute text-pretty max-md:gap-3 max-md:text-[14px]">
          <p>
            Дальше день уходит на закупку и сборку. Когда букет готов, присылаем его
            фотографию — посмотреть и сказать, если что-то не так, можно до отправки.
          </p>
          <p>
            Подробные условия, стоимость и сроки — на странице{' '}
            <Link
              href="/delivery"
              className="font-semibold text-ink underline decoration-primary decoration-[3px] underline-offset-4"
            >
              доставки
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ГДЕ МЫ */}
      <section className="mx-3 grid grid-cols-[1fr_1.25fr] gap-3 max-lg:grid-cols-1 max-md:mx-2 max-md:gap-2">
        <div className="relative min-h-115 overflow-hidden rounded-2xl max-md:min-h-62.5 max-md:rounded-xl">
          <Image
            src="/images/bouquets/9.webp"
            alt="Сборка букета в Яблоновском"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-primary px-4.5 py-2.5 text-[15px] font-bold text-ink max-md:bottom-3 max-md:left-3 max-md:text-[14px]">
            <Icon name="map-pin" size={18} className="text-ink" />
            пгт. Яблоновский
          </span>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl bg-card p-12 max-md:gap-4 max-md:rounded-xl max-md:p-5">
          <SectionHeading eyebrow="Где мы" title="Яблоновский" />

          <div className="grid grid-cols-2 gap-7 text-[15px] text-mute text-pretty max-md:grid-cols-1 max-md:gap-3 max-md:text-[14px]">
            <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4">
              <p>
                Шоурума и витрины у нас нет: готовые букеты мы не держим, продукты
                покупаются под конкретный заказ. Приехать «посмотреть, что есть» не
                получится — смотреть будет нечего.
              </p>
              <p>
                Зато поэтому в букете свежее, а состав собирается под вас, а не под
                остатки на полке.
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            <Tag href="/delivery">Условия доставки</Tag>
            <Tag href="/catalog">Весь каталог</Tag>
          </div>
        </div>
      </section>

      <CtaBand
        tone="yellow"
        eyebrow="Готовы собрать"
        title="Скажите повод — предложим состав"
        text="Напишите в удобный канал. Спросим три вещи: кому, на когда и какой бюджет."
        cta="Написать"
        ctaSource="contacts"
      />
    </>
  );
}
