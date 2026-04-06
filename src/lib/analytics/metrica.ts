import type { ChannelId } from '@/lib/content/schemas';

declare global {
  interface Window {
    ym?: (
      id: number,
      action: 'reachGoal',
      goal: string,
      params?: Record<string, string>,
    ) => void;
  }
}

export function trackCtaClick(channel: ChannelId, source: string) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  if (!counterId) {
    return;
  }

  window.ym(Number(counterId), 'reachGoal', 'contact_click', {
    channel,
    source,
  });
}
