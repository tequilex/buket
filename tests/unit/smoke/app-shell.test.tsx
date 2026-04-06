import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders the launch heading', () => {
  render(<HomePage />);
  expect(
    screen.getByRole('heading', { name: /съедобные букеты/i }),
  ).toBeInTheDocument();
});
