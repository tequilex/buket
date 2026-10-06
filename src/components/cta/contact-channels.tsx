'use client';

import siteConfig from '@/data/site-config';
import { trackCtaClick } from '@/lib/analytics/metrica';

type ChannelsLayout = 'wrap' | 'bar' | 'stack' | 'menu';

interface ContactChannelsProps {
  /** Куда уходит цель Метрики. */
  source: string;
  onDark?: boolean;
  /**
   * wrap — ряд пилюль с переносом.
   * bar  — три доли без переноса, для полосы внизу экрана.
   * stack — полноширинные пилюли со стрелкой справа.
   * menu — главный канал во всю ширину, остальные в две колонки.
   */
  layout?: ChannelsLayout;
  className?: string;
}

const containers: Record<ChannelsLayout, string> = {
  wrap: 'flex flex-wrap gap-2',
  bar: 'grid grid-cols-[1.4fr_1fr_1fr] gap-2',
  stack: 'flex flex-col gap-2',
  menu: 'grid grid-cols-2 gap-2',
};

const items: Record<ChannelsLayout, string> = {
  wrap: 'px-[26px] py-4 text-[15px] justify-center',
  bar: 'h-12 px-2 text-[14px] justify-center',
  stack: 'px-[22px] py-4 text-[16px] justify-between',
  menu: 'h-12 text-[15px] justify-center',
};

/**
 * Ряд мессенджеров. Корзины нет: любой путь заказа заканчивается перепиской,
 * поэтому это и есть конверсионный контрол.
 *
 * Неактивные каналы уезжают в конец: в макетах max стоит последним, а порядок
 * в `site-config` задан под разметку организации, а не под кнопки.
 */
export function ContactChannels({
  source,
  onDark = false,
  layout = 'wrap',
  className,
}: ContactChannelsProps) {
  const channels = [...siteConfig.channels].sort(
    (a, b) => Number(a.disabled ?? false) - Number(b.disabled ?? false),
  );

  // На тёмном призыве главный канал белый, в остальных местах — жёлтый.
  const whitePrimary = onDark && (layout === 'stack' || layout === 'menu');

  return (
    <div className={[containers[layout], className].filter(Boolean).join(' ')}>
      {channels.map((channel, index) => {
        const primary = index === 0 && !channel.disabled;
        const flat = channel.disabled
          ? onDark
            ? 'bg-dark-raised text-placeholder'
            : 'bg-page text-placeholder'
          : onDark
            ? 'bg-dark-raised text-white hover:bg-dark-line'
            : 'bg-page text-ink hover:bg-band';

        return (
          <a
            key={channel.id}
            href={channel.disabled ? undefined : channel.href}
            target={channel.disabled ? undefined : '_blank'}
            rel="noreferrer"
            aria-disabled={channel.disabled || undefined}
            onClick={(event) => {
              if (channel.disabled) {
                event.preventDefault();
                return;
              }
              trackCtaClick(channel.id, source);
            }}
            className={[
              'inline-flex min-h-11 items-center gap-2 rounded-full leading-none',
              'transition-colors duration-150 ease-linear',
              items[layout],
              layout === 'menu' && primary ? 'col-span-2 h-13' : '',
              channel.disabled ? 'cursor-default font-semibold' : 'cursor-pointer',
              primary
                ? whitePrimary
                  ? 'bg-card font-bold text-ink hover:bg-primary'
                  : 'bg-primary font-bold text-ink hover:bg-primary-pressed'
                : `${flat} font-semibold`,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {layout === 'stack' ? (
              <>
                <span>{channel.label}</span>
                {channel.disabled ? (
                  <span className="text-[14px] font-medium text-placeholder">скоро</span>
                ) : (
                  <span aria-hidden="true">→</span>
                )}
              </>
            ) : (
              <span>{channel.disabled ? `${channel.label} · скоро` : channel.label}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
