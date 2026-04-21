import { render, screen } from '@testing-library/react';
import { bouquets } from '@/lib/content/catalog';
import { HeroFeaturedCarousel } from '@/components/home/hero-featured-carousel';

test('exposes a popular bouquets storefront strip', () => {
  render(
    <HeroFeaturedCarousel bouquets={bouquets.filter((bouquet) => bouquet.featured)} />,
  );

  expect(
    screen.getByRole('heading', { name: /популярные букеты/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /букет "мужской хит"/i })).toBeInTheDocument();
  expect(screen.getByTestId('hero-featured-carousel')).toBeInTheDocument();
  expect(screen.getByTestId('hero-featured-carousel-viewport')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /показать следующие букеты/i }),
  ).toBeInTheDocument();
});

test('keeps the storefront strip compact inside the hero panel', () => {
  render(
    <HeroFeaturedCarousel bouquets={bouquets.filter((bouquet) => bouquet.featured)} />,
  );

  expect(screen.getAllByRole('link')).toHaveLength(4);
});
