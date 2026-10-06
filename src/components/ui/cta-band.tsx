import { OrderButton } from '@/components/order/order-button';

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  text?: string;
  cta?: string;
  /** Метка места для Метрики — кнопка открывает модалку заказа. */
  ctaSource?: string;
  /** dark — графит с жёлтым кругом. yellow — жёлтый с точками. */
  tone?: 'dark' | 'yellow';
}

/** Закрывающая плитка: заголовок слева, одна крупная кнопка справа. */
export function CtaBand({
  eyebrow,
  title,
  text,
  cta,
  ctaSource = 'cta_band',
  tone = 'dark',
}: CtaBandProps) {
  const dark = tone === 'dark';

  return (
    <section className="mt-16 px-3 max-md:mt-6 max-md:px-2">
      <div
        className={[
          'relative grid grid-cols-[1.3fr_1fr] items-center gap-12 overflow-hidden rounded-3xl px-14 py-16',
          'max-lg:grid-cols-1 max-lg:gap-8 max-md:rounded-xl max-md:px-5 max-md:py-6',
          dark ? 'bg-ink text-white' : 'bg-primary bg-dots text-ink',
        ].join(' ')}
      >
        {dark ? (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-30 -right-20 size-90 rounded-full bg-primary max-md:-top-12.5 max-md:-right-12.5 max-md:size-32.5"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-35 right-65 size-60 rounded-full border-2 border-dark-line max-lg:hidden"
            />
          </>
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-15 -bottom-30 size-80 rounded-full bg-white opacity-50 max-md:-right-10 max-md:-bottom-15 max-md:size-40"
          />
        )}

        <div className="relative flex flex-col items-start gap-4">
          {eyebrow ? (
            dark ? (
              <span className="text-[14px] font-semibold text-primary">{eyebrow}</span>
            ) : (
              <span className="rounded-full bg-card px-3.5 py-1.5 text-[13px] font-semibold text-ink">
                {eyebrow}
              </span>
            )
          ) : null}
          <h2
            className={[
              'font-display text-[42px] leading-[1.08] font-bold tracking-[-0.03em] text-balance',
              'max-lg:text-[34px] max-md:text-[22px] max-md:leading-[1.15]',
              dark ? 'text-white' : 'text-ink',
            ].join(' ')}
          >
            {title}
          </h2>
          {text ? (
            <p
              className={[
                'max-w-[42ch] text-[17px] text-pretty max-md:text-[14px]',
                dark ? 'text-mute-on-dark' : 'text-ink',
              ].join(' ')}
            >
              {text}
            </p>
          ) : null}
        </div>

        {cta ? (
          <div className="relative justify-self-end max-lg:w-full max-lg:justify-self-start">
            <OrderButton
              size="lg"
              arrow
              variant={dark ? 'white' : 'dark'}
              source={ctaSource}
              className="max-lg:h-13 max-lg:w-full"
            >
              {cta}
            </OrderButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
