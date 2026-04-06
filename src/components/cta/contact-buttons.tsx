'use client';

import { trackCtaClick } from '@/lib/analytics/metrica';
import siteConfig from '@/data/site-config';

interface ContactButtonsProps {
  source: string;
  compact?: boolean;
  className?: string;
}

function getChannelClassName(channelId: string, compact: boolean) {
  const sizeClass = compact ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-sm';

  if (channelId === 'whatsapp') {
    return `${sizeClass} rounded-full bg-[var(--accent)] text-white transition hover:bg-[var(--accent-strong)]`;
  }

  return `${sizeClass} rounded-full border border-[var(--line)] bg-white text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]`;
}

export function ContactButtons({
  source,
  compact = false,
  className,
}: ContactButtonsProps) {
  return (
    <div
      className={[
        'flex flex-wrap gap-3',
        compact ? 'justify-center' : 'justify-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {siteConfig.channels.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          target="_blank"
          rel="noreferrer"
          className={getChannelClassName(channel.id, compact)}
          onClick={() => trackCtaClick(channel.id, source)}
        >
          {channel.label}
        </a>
      ))}
    </div>
  );
}
