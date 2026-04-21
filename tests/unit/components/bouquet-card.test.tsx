import { render, screen } from '@testing-library/react';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { bouquets } from '@/lib/content/catalog';

test('renders a compact storefront bouquet card', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(
    screen.getByRole('img', { name: bouquets[0].images[0].alt }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: bouquets[0].name })).toBeInTheDocument();
  expect(screen.getByText(new RegExp(String(bouquets[0].priceFrom)))).toBeInTheDocument();
  expect(screen.getByTestId('bouquet-card-body')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /смотреть букет/i })).toBeInTheDocument();
});
