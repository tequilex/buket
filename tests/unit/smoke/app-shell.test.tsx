import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

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
