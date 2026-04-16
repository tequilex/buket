import { render, screen } from '@testing-library/react';
import { ContactButtons } from '@/components/cta/contact-buttons';

test('renders all configured lead channels', () => {
  render(<ContactButtons source="hero" />);

  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /telegram/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /avito/i })).toBeInTheDocument();
});

test('renders channel icons for the configured lead buttons', () => {
  render(<ContactButtons source="hero" />);

  expect(screen.getByLabelText('Иконка WhatsApp')).toBeInTheDocument();
  expect(screen.getByLabelText('Иконка Telegram')).toBeInTheDocument();
  expect(screen.getByLabelText('Иконка Avito')).toBeInTheDocument();
});
