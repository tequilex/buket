import type { ChannelId } from '@/lib/content/schemas';

declare global {
  interface Window {
    ym?: ((
      id: number,
      action: 'init' | 'hit' | 'reachGoal',
      payload?: unknown,
      params?: Record<string, unknown>,
    ) => void) & {
      a?: IArguments[];
      l?: number;
    };
  }
}

interface MetricaHitOptions {
  referer?: string;
  title?: string;
}

function getMetricaCounterId() {
  const counterId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);

  if (!Number.isFinite(counterId) || counterId <= 0) {
    return null;
  }

  return counterId;
}

export function buildMetricaInitScript(counterId: number) {
  return `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j += 1) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(${counterId}, 'init', {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  `;
}

export function buildTrackedPageUrl(pathname: string, search: string) {
  return search ? `${pathname}${search}` : pathname;
}

export function trackPageView(url: string, options?: MetricaHitOptions) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  const counterId = getMetricaCounterId();

  if (!counterId) {
    return;
  }

  const params = {
    ...(options?.referer ? { referer: options.referer } : {}),
    ...(options?.title ? { title: options.title } : {}),
  };

  if (Object.keys(params).length > 0) {
    window.ym(counterId, 'hit', url, params);
    return;
  }

  window.ym(counterId, 'hit', url);
}

export function trackCtaClick(channel: ChannelId, source: string) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  const counterId = getMetricaCounterId();

  if (!counterId) {
    return;
  }

  window.ym(counterId, 'reachGoal', 'contact_click', {
    channel,
    source,
  });
}
