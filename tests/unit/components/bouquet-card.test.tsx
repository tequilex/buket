import { render, screen } from '@testing-library/react';
import { BouquetCard } from '@/components/catalog/bouquet-card';
import { bouquets, getDisplayName } from '@/lib/content/catalog';

test('renders bouquet card content and actions', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(
    screen.getByRole('heading', { name: getDisplayName(bouquets[0].name) }),
  ).toBeInTheDocument();
  expect(screen.getByText(bouquets[0].shortDescription)).toBeInTheDocument();
  expect(screen.getByText(bouquets[0].weightOrSize)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /забрать/i })).toBeInTheDocument();
});

test('renders bouquet card image', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  expect(screen.getByAltText(bouquets[0].images[0].alt)).toBeInTheDocument();
});

test('stamps the entry price onto the photograph', () => {
  render(<BouquetCard bouquet={bouquets[0]} />);

  // Цена набирается с разрядами по-русски: внутри числа неразрывный пробел,
  // а матчер testing-library приводит любые пробелы к обычным.
  const price = bouquets[0].priceFrom.toLocaleString('ru-RU').replace(/\s/gu, ' ');

  expect(screen.getByText(`от ${price} ₽`)).toBeInTheDocument();
});

test('marks a featured bouquet with the hit badge', () => {
  const featured = bouquets.find((bouquet) => bouquet.featured)!;
  render(<BouquetCard bouquet={featured} />);

  expect(screen.getByText('Хит')).toBeInTheDocument();
});
