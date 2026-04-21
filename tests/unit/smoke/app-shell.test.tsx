import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders the launch heading', () => {
  render(<HomePage />);
  expect(
    screen.getByRole('heading', { name: /съедобные букеты/i }),
  ).toBeInTheDocument();
});

test('renders the catalog section in the homepage', () => {
  render(<HomePage />);

  expect(screen.getByText('Подберите букет по составу')).toBeInTheDocument();
});
