import { render, screen } from '@testing-library/react';
import { bouquets } from '@/lib/content/catalog';
import { HeroFeaturedCarousel } from '@/components/home/hero-featured-carousel';

test('renders the popular bouquets carousel content', () => {
  render(
    <HeroFeaturedCarousel bouquets={bouquets.filter((bouquet) => bouquet.featured)} />,
  );

  expect(screen.getByText('Популярные букеты')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /букет "мужской хит"/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /показать следующие букеты/i }),
  ).toBeInTheDocument();
});

test('keeps the carousel compact and clipped inside its own panel', () => {
  render(
    <HeroFeaturedCarousel bouquets={bouquets.filter((bouquet) => bouquet.featured)} />,
  );

  expect(screen.getByTestId('hero-featured-carousel')).toHaveClass('max-w-[31rem]');
  expect(screen.getByTestId('hero-featured-carousel-viewport')).toHaveClass(
    'overflow-hidden',
  );
});
