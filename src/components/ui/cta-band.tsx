import { OrderButton } from '@/components/order/order-button';

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  text?: string;
  cta?: string;
  /** Метка места для Метрики — кнопка открывает модалку заказа. */
  ctaSource?: string;
  /** band — глубокая бумага (по умолчанию). dark — графит. */
  tone?: 'band' | 'dark';
}

/** Закрывающая полоса во всю ширину: заголовок слева, одна крупная кнопка справа. */
export function CtaBand({
  eyebrow,
  title,
  text,
  cta,
  ctaSource = 'cta_band',
  tone = 'band',
}: CtaBandProps) {
  const dark = tone === 'dark';

  return (
    <section className={dark ? 'bg-dark py-22' : 'bg-band py-22'}>
      <div className="page-container flex flex-wrap items-center justify-between gap-10">
        <div className="flex flex-col gap-3">
          {eyebrow ? <span className="type-eyebrow text-primary">{eyebrow}</span> : null}
          <h2
            className={[
              'type-heading-xl max-w-[22ch]',
              dark ? 'text-on-dark' : 'text-ink',
            ].join(' ')}
          >
            {title}
          </h2>
          {text ? (
            <p
              className={[
                'max-w-[42ch] text-pretty',
                dark ? 'text-mute-on-dark' : 'text-mute',
              ].join(' ')}
            >
              {text}
            </p>
          ) : null}
        </div>
        {cta ? (
          <OrderButton size="lg" source={ctaSource}>
            {cta}
          </OrderButton>
        ) : null}
      </div>
    </section>
  );
}
