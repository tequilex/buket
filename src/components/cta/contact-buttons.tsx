'use client';

import { trackCtaClick } from '@/lib/analytics/metrica';
import siteConfig from '@/data/site-config';
import styles from './contact-buttons.module.scss';

interface ContactButtonsProps {
  source: string;
  compact?: boolean;
  className?: string;
}

const primaryMessengerChannelIds = new Set(['whatsapp', 'telegram']);

function ChannelIcon({ channelId, label }: { channelId: string; label: string }) {
  const sharedProps = {
    'aria-label': `Иконка ${label}`,
    className: styles.icon,
    viewBox: '0 0 24 24',
    fill: 'none',
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

  if (channelId === 'telegram') {
    return (
      <svg {...sharedProps}>
        <path
          d="M21 4 3.8 10.63c-.72.29-.7 1.33.03 1.58l4.35 1.47 1.63 5.04c.22.7 1.12.85 1.56.27l2.5-3.3 4.9 3.6c.6.44 1.45.11 1.6-.63L22.5 5.2C22.66 4.47 21.73 3.72 21 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m8.18 13.68 9.9-7.03-7.15 8.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
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

function getChannelClassName(channelId: string, compact: boolean) {
  const classNames = [styles.button, compact ? styles.compact : ''];

  if (channelId === 'whatsapp') {
    classNames.push(styles.whatsapp);
  } else if (channelId === 'telegram') {
    classNames.push(styles.telegram);
  } else {
    classNames.push(styles.avito);
  }

  return classNames.filter(Boolean).join(' ');
}

export function ContactButtons({
  source,
  compact = false,
  className,
}: ContactButtonsProps) {
  const channels =
    source === 'hero'
      ? siteConfig.channels.filter((channel) => primaryMessengerChannelIds.has(channel.id))
      : siteConfig.channels;

  return (
    <div
      className={[
        styles.container,
        compact ? styles.compactContainer : '',
        source === 'hero' && compact ? styles.heroCompactContainer : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {channels.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          target="_blank"
          rel="noreferrer"
          className={getChannelClassName(channel.id, compact)}
          onClick={() => trackCtaClick(channel.id, source)}
        >
          <ChannelIcon channelId={channel.id} label={channel.label} />
          {channel.label}
        </a>
      ))}
    </div>
  );
}
