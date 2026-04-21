import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { MobileContactBar } from '@/components/layout/mobile-contact-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

test('renders the storefront shell sections', () => {
  render(
    <>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
      <MobileContactBar />
    </>,
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { name: /популярные букеты/i })).toHaveLength(2);
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders the launch heading', () => {
  render(<HomePage />);
  expect(
    screen.getByRole('heading', { name: /съедобные букеты/i }),
  ).toBeInTheDocument();
});

test('renders the popular bouquets carousel in the homepage hero', () => {
  render(<HomePage />);

  expect(screen.getAllByText('Популярные букеты').length).toBeGreaterThan(0);
  expect(
    screen.getByRole('button', { name: /показать следующие букеты/i }),
  ).toBeInTheDocument();
});
