import type { Metadata } from 'next';

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: `${getBaseUrl()}${input.path}`,
    },
  };
}
