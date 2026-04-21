import { render, screen } from '@testing-library/react';
import { ContactButtons } from '@/components/cta/contact-buttons';

test('exposes the primary messenger CTAs in the hero', () => {
  render(<ContactButtons source="hero" compact />);

  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /telegram/i })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /avito/i })).not.toBeInTheDocument();
});

test('renders messenger icons for the compact hero cta group', () => {
  render(<ContactButtons source="hero" compact />);

  expect(screen.getByLabelText('Иконка WhatsApp')).toBeInTheDocument();
  expect(screen.getByLabelText('Иконка Telegram')).toBeInTheDocument();
});
