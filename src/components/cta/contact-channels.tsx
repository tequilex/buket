'use client';

import siteConfig from '@/data/site-config';
import { trackCtaClick } from '@/lib/analytics/metrica';
import type { ChannelId } from '@/lib/content/schemas';

interface ContactChannelsProps {
  /** Куда уходит цель Метрики. */
  source: string;
  onDark?: boolean;
  /**
   * wrap — обычный ряд с переносом. bar — три равные доли без переноса,
   * для фиксированной полосы внизу экрана.
   */
  layout?: 'wrap' | 'bar';
  className?: string;
}

function ChannelIcon({ channelId, label }: { channelId: ChannelId; label: string }) {
  const sharedProps = {
    'aria-label': `Иконка ${label}`,
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    className: 'shrink-0',
    xmlns: 'http://www.w3.org/2000/svg',
  };

  if (channelId === 'whatsapp') {
    return (
      <svg {...sharedProps}>
        <path
          d="M12 21a8.94 8.94 0 0 1-4.58-1.25L3 21l1.34-4.3A9 9 0 1 1 12 21Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 8.8c.18-.4.36-.41.53-.42h.44c.15 0 .4.06.6.53.2.47.68 1.63.74 1.75.06.12.1.27.02.43-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.1.49.14.24.63 1.03 1.35 1.67.93.82 1.72 1.08 1.97 1.2.24.12.39.1.53-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.6-.14 1.18-.2.58-1.14 1.11-1.57 1.17-.43.06-.97.09-1.57-.1-.36-.12-.81-.27-1.4-.52-2.46-1.06-4.06-3.6-4.18-3.77-.12-.16-1-1.34-1-2.56 0-1.22.64-1.82.87-2.08Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // У max собственного глифа нет ни здесь, ни в исходнике — он остаётся текстом.
  if (channelId === 'max') {
    return null;
  }

  return (
    <svg {...sharedProps}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 9.25h7M8.5 12h7M8.5 14.75h4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Ряд мессенджеров — WhatsApp, max, Avito. Корзины нет: любой путь заказа
 * заканчивается перепиской, поэтому это и есть конверсионный контрол.
 */
export function ContactChannels({
  source,
  onDark = false,
  layout = 'wrap',
  className,
}: ContactChannelsProps) {
  const bar = layout === 'bar';

  return (
    <div
      className={[
        'flex gap-2',
        bar ? 'flex-nowrap' : 'flex-wrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {siteConfig.channels.map((channel, index) => {
        const primary = index === 0 && !channel.disabled;

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
              'inline-flex min-h-[46px] items-center justify-center gap-1.5 py-[15px]',
              bar ? 'flex-1 basis-0 px-2' : 'px-[22px]',
              'type-button whitespace-nowrap transition-[background-color] duration-140 ease-linear',
              channel.disabled ? 'cursor-default opacity-45' : 'cursor-pointer',
              primary
                ? 'bg-primary text-white active:bg-primary-pressed'
                : onDark
                  ? 'text-on-dark shadow-[inset_0_0_0_1px_var(--color-dark-line-strong)] active:bg-[rgb(243_238_228_/_0.1)]'
                  : 'text-ink shadow-[inset_0_0_0_1px_var(--color-cream)] active:bg-card',
            ].join(' ')}
          >
            <ChannelIcon channelId={channel.id} label={channel.label} />
            {channel.label}
          </a>
        );
      })}
    </div>
  );
}
