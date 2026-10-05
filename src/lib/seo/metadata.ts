import type { Metadata } from 'next';
import { absoluteUrl, assetUrl } from '@/lib/utils';

/**
 * Карточка по умолчанию для мессенджеров. Ссылку на сайт чаще всего пересылают
 * в WhatsApp, и без og:image она выглядит голой строкой.
 */
const defaultOgImage = {
  url: assetUrl('/og-default.jpg'),
  width: 1200,
  height: 630,
  alt: 'Съедобные букеты Gastro Buket',
};

function normalizeTitle(title: string) {
  return title.replace(/(?:\s*\|\s*Gastro Buket)+$/, '');
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  imageAlt?: string;
}): Metadata {
  const title = normalizeTitle(input.title);
  const canonical = absoluteUrl(input.path);

  return {
    title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: input.description,
      url: canonical,
      type: 'website',
      images: [
        input.imageUrl
          ? { url: assetUrl(input.imageUrl), alt: input.imageAlt ?? title }
          : defaultOgImage,
      ],
    },
  };
}
