import { render, screen } from '@testing-library/react';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { bouquets, getDisplayName } from '@/lib/content/catalog';

test('renders bouquet card content and actions', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(
    screen.getByRole('heading', { name: getDisplayName(bouquets[0].name) }),
  ).toBeInTheDocument();
  expect(screen.getByTestId('bouquet-card-body')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /забрать/i })).toBeInTheDocument();
});

test('renders bouquet card image', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(screen.getByAltText(bouquets[0].images[0].alt)).toBeInTheDocument();
});

test('stamps the entry price onto the photograph', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(
    screen.getByText(`от ${bouquets[0].priceFrom} ₽`),
  ).toBeInTheDocument();
});
