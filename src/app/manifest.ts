import type { MetadataRoute } from 'next';
import siteConfig from '@/data/site-config';

export const dynamic = 'force-static';

/**
 * Без манифеста браузер не использует иконки 192 и 512 — они лежали бы мёртвым
 * грузом. Даёт нормальный ярлык, если витрину добавят на домашний экран.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.siteName} — съедобные букеты в Краснодаре`,
    short_name: siteConfig.siteName,
    description: siteConfig.siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f3f1',
    theme_color: '#ffd23f',
    lang: 'ru',
    icons: [
      { src: '/icon1.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon2.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
