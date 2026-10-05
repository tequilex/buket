import { render, screen } from '@testing-library/react';
import { ContactChannels } from '@/components/cta/contact-channels';

test('renders all configured lead channels', () => {
  render(<ContactChannels source="hero" />);

  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByText('max')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /avito/i })).toBeInTheDocument();
});

test('renders glyphs for the channels that have one', () => {
  render(<ContactChannels source="hero" />);

  expect(screen.getByLabelText('Иконка WhatsApp')).toBeInTheDocument();
  expect(screen.getByLabelText('Иконка Avito')).toBeInTheDocument();
  // У max собственного глифа нет — он остаётся только текстом.
  expect(screen.queryByLabelText('Иконка max')).not.toBeInTheDocument();
});

test('marks the max channel as disabled', () => {
  render(<ContactChannels source="hero" />);

  const max = screen.getByText('max');

  expect(max).toHaveAttribute('aria-disabled', 'true');
  expect(max).not.toHaveAttribute('href');
});
