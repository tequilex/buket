import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders hero section with stats', () => {
  render(<HomePage />);
  expect(screen.getByText(/500\+/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

test('renders hero tag with location', () => {
  render(<HomePage />);
  expect(screen.getAllByText(/Яблоновский/i).length).toBeGreaterThan(0);
});
