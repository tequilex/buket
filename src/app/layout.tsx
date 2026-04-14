import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { YandexMetricaPageView } from '@/components/analytics/yandex-metrica-page-view';
import { MobileContactBar } from '@/components/layout/mobile-contact-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { buildMetricaInitScript } from '@/lib/analytics/metrica';
import { getBaseUrl } from '@/lib/utils';
import './globals.css';

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Buket Studio',
    template: '%s | Buket Studio',
  },
  description: 'Съедобные букеты в Краснодаре и Яблоновском',
  openGraph: {
    title: 'Buket Studio',
    description: 'Съедобные букеты в Краснодаре и Яблоновском',
    url: siteUrl,
    siteName: 'Buket Studio',
    locale: 'ru_RU',
    type: 'website',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const metricaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  const hasMetrica = Number.isFinite(metricaId) && metricaId > 0;

  return (
    <html lang="ru">
      <body>
        {hasMetrica ? (
          <Script
            id="yandex-metrica-init"
            strategy="beforeInteractive"
          >
            {buildMetricaInitScript(metricaId)}
          </Script>
        ) : null}
        {hasMetrica ? <YandexMetricaPageView /> : null}
        {hasMetrica ? (
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${metricaId}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        ) : null}
        <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
          <SiteHeader />
          <main className="pb-28 md:pb-0">{children}</main>
          <SiteFooter />
          <MobileContactBar />
        </div>
      </body>
    </html>
  );
}
