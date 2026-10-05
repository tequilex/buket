import { screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { renderWithOrderModal } from '@/test/render';

test('renders hero section with stats', () => {
  renderWithOrderModal(<HomePage />);
  expect(screen.getAllByText(/500\+/).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

test('renders the ingredient ticker instead of a carousel', () => {
  renderWithOrderModal(<HomePage />);
  expect(screen.getAllByText(/Раки/).length).toBeGreaterThan(0);
});

test('renders the hero photo grid', () => {
  renderWithOrderModal(<HomePage />);
  expect(screen.getByAltText('Букет из раков с лимоном')).toBeInTheDocument();
  expect(screen.getByAltText('Мясной букет с колбасами')).toBeInTheDocument();
  expect(screen.getByAltText('Рыбный букет из сушёной рыбы')).toBeInTheDocument();
});
