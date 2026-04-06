import type { MetadataRoute } from 'next';
import {
  bouquets,
  categories,
  occasions,
} from '@/lib/content/catalog';
import { getAllBlogPosts } from '@/lib/content/blog';
import { getBaseUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const blogPosts = await getAllBlogPosts();

  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/catalog` },
    { url: `${baseUrl}/delivery` },
    { url: `${baseUrl}/contacts` },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/locations/krasnodar` },
    { url: `${baseUrl}/locations/yablonovskiy` },
    ...categories.map((category) => ({
      url: `${baseUrl}/catalog/${category.slug}`,
    })),
    ...bouquets.map((bouquet) => ({
      url: `${baseUrl}/bouquets/${bouquet.slug}`,
    })),
    ...occasions.map((occasion) => ({
      url: `${baseUrl}/occasions/${occasion.slug}`,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
    })),
  ];
}
