import { getAllBlogPosts } from '@/lib/content/blog';

test('returns an empty list when no blog posts exist yet', async () => {
  await expect(getAllBlogPosts()).resolves.toEqual([]);
});
