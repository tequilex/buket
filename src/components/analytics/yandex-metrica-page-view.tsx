'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { buildTrackedPageUrl, trackPageView } from '@/lib/analytics/metrica';

export function YandexMetricaPageView() {
  const pathname = usePathname();
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const url = buildTrackedPageUrl(pathname, window.location.search);
    const referer = previousUrlRef.current ?? document.referrer ?? undefined;

    trackPageView(url, {
      referer,
      title: document.title,
    });

    previousUrlRef.current = url;
  }, [pathname]);

  return null;
}
