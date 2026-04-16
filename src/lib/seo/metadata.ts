import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/utils';

function normalizeTitle(title: string) {
  return title.replace(/(?:\s*\|\s*Gastro Buket)+$/, '');
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: normalizeTitle(input.title),
    description: input.description,
    alternates: {
      canonical: `${getBaseUrl()}${input.path}`,
    },
  };
}
