import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});
import { YandexMetricaPageView } from '@/components/analytics/yandex-metrica-page-view';
import { MobileContactBar } from '@/components/layout/mobile-contact-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { buildMetricaInitScript } from '@/lib/analytics/metrica';
import { getBaseUrl } from '@/lib/utils';
import styles from './layout.module.scss';
import './globals.scss';

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gastro Buket',
    template: '%s | Gastro Buket',
  },
  description: 'Съедобные букеты в Краснодаре и Яблоновском',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'Gastro Buket',
    description: 'Съедобные букеты в Краснодаре и Яблоновском',
    url: siteUrl,
    siteName: 'Gastro Buket',
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
    <html lang="ru" className={montserrat.variable}>
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
        <div className={styles.appRoot}>
          <SiteHeader />
          <main className={styles.main}>{children}</main>
          <SiteFooter />
          <MobileContactBar />
        </div>
      </body>
    </html>
  );
}
