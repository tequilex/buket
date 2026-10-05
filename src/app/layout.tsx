import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Oswald, Inter } from 'next/font/google';
import Script from 'next/script';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
import { YandexMetricaPageView } from '@/components/analytics/yandex-metrica-page-view';
import { MobileContactBar } from '@/components/layout/mobile-contact-bar';
import { OrderModalProvider } from '@/components/order/order-modal';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { buildMetricaInitScript } from '@/lib/analytics/metrica';
import { getBaseUrl } from '@/lib/utils';
import './globals.css';

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Съедобные букеты с доставкой в Краснодаре и Яблоновском | Gastro Buket',
    template: '%s | Gastro Buket',
  },
  description:
    'Авторские съедобные букеты из фруктов, мяса, рыбы и сладостей. Доставка по Краснодару и Яблоновскому в день заказа. Состав букета согласуется индивидуально.',
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
    title: 'Съедобные букеты с доставкой в Краснодаре и Яблоновском | Gastro Buket',
    description:
      'Авторские съедобные букеты из фруктов, мяса, рыбы и сладостей. Доставка по Краснодару и Яблоновскому в день заказа.',
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
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        {hasMetrica ? (
          <Script
            id="yandex-metrica-init"
            strategy="afterInteractive"
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
        <OrderModalProvider>
          <div className="min-h-screen bg-page text-ink">
            <SiteHeader />
            <main className="pt-0 pb-24 md:pb-0">{children}</main>
            <SiteFooter />
            <MobileContactBar />
          </div>
        </OrderModalProvider>
      </body>
    </html>
  );
}
