'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/metrica';

export function YandexMetricaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef<string | null>(null);
  const search = searchParams.toString();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const url = search ? `${pathname}?${search}` : pathname;
    const referer = previousUrlRef.current ?? document.referrer ?? undefined;

    trackPageView(url, {
      referer,
      title: document.title,
    });

    previousUrlRef.current = url;
  }, [pathname, search]);

  return null;
}
