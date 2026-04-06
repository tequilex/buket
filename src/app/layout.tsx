import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { MobileContactBar } from '@/components/layout/mobile-contact-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
  const metricaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  return (
    <html lang="ru">
      <body>
        {metricaId ? (
          <Script
            id="yandex-metrica-init"
            strategy="afterInteractive"
          >{`
            window.ym = window.ym || function() {
              (window.ym.a = window.ym.a || []).push(arguments);
            };
            window.ym.l = new Date().getTime();
            window.ym(${metricaId}, 'init', {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true
            });
          `}</Script>
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
