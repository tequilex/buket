import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { renderWithOrderModal } from '@/test/render';

test('renders the launch heading', () => {
  renderWithOrderModal(<HomePage />);
  expect(screen.getByRole('heading', { level: 1, name: /букеты/i })).toBeInTheDocument();
});

test('renders the catalog section in the homepage', () => {
  renderWithOrderModal(<HomePage />);

  expect(screen.getByRole('heading', { name: 'Выберите основу' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Чаще всего берут' })).toBeInTheDocument();
});

test('header carries the wordmark, the nav and one cta', () => {
  renderWithOrderModal(<SiteHeader />);

  expect(screen.getAllByText('gastro buket').length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: 'Каталог' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Написать' })).toBeInTheDocument();
});

test('footer carries the wordmark block and the link columns', () => {
  render(<SiteFooter />);

  expect(
    screen.getByText('Съедобные букеты ручной сборки. Яблоновский · Краснодар'),
  ).toBeInTheDocument();
  expect(screen.getByText('Каталог')).toBeInTheDocument();
  expect(screen.getByText('Поводы')).toBeInTheDocument();
  expect(screen.getByText('Связаться')).toBeInTheDocument();
});
