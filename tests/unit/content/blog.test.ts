import { render, screen } from '@testing-library/react';
import ContactsPage from '@/app/contacts/page';
import { getAllBlogPosts } from '@/lib/content/blog';

test('returns an empty list when no blog posts exist yet', async () => {
  await expect(getAllBlogPosts()).resolves.toEqual([]);
});

test('contacts page renders inside the storefront support layout', () => {
  render(ContactsPage());

  expect(
    screen.getByRole('heading', { name: /как быстро связаться и оформить заказ/i }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /whatsapp/i }).length).toBeGreaterThan(0);
});
