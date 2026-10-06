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

test('renders both hero calls to action', () => {
  renderWithOrderModal(<HomePage />);

  expect(screen.getByRole('link', { name: 'Смотреть каталог' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Собрать под повод' })).toBeInTheDocument();
});

test('renders the bento cards next to the hero', () => {
  renderWithOrderModal(<HomePage />);

  expect(screen.getByText('Хит к пятнице')).toBeInTheDocument();
  // «День в день» есть и в плашке доставки, и на мобильной наклейке в коллаже.
  expect(screen.getAllByText('День в день').length).toBeGreaterThan(0);
});
