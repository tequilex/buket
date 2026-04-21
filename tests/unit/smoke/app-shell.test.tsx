import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { StorefrontShell } from '@/app/layout';

test('renders the storefront shell sections', () => {
  render(
    <StorefrontShell>
      <HomePage />
    </StorefrontShell>,
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(
    screen.getByRole('navigation', { name: /основная навигация/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('navigation', { name: /быстрые контакты/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('homepage hero keeps an indexable h1', () => {
  render(<HomePage />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /съедобные букеты с доставкой/i,
    }),
  ).toBeInTheDocument();
});

test('renders the popular bouquets carousel in the homepage hero', () => {
  render(<HomePage />);

  expect(screen.getByTestId('hero-featured-carousel')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /показать следующие букеты/i }),
  ).toBeInTheDocument();
});
