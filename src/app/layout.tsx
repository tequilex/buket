import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Unbounded, Onest } from 'next/font/google';
import Script from 'next/script';

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
});

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-onest',
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
  // Блок icons не нужен: Next сам находит favicon.ico, icon*.png и
  // apple-icon.png в каталоге app и проставляет им верные sizes и type.
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
    <html lang="ru" className={`${unbounded.variable} ${onest.variable}`}>
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
          {/* Поля страницы 12px / 8px задают сами плитки — у оболочки их нет. */}
          <div className="flex min-h-screen flex-col gap-3 bg-page text-ink max-md:gap-2">
            <SiteHeader />
            <main className="flex flex-col gap-3 max-md:gap-2">{children}</main>
            <SiteFooter />
            <MobileContactBar />
          </div>
        </OrderModalProvider>
      </body>
    </html>
  );
}
