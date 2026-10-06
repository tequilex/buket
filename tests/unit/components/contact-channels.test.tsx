import { render, screen } from '@testing-library/react';
import { ContactChannels } from '@/components/cta/contact-channels';

test('renders all configured lead channels', () => {
  render(<ContactChannels source="hero" />);

  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /avito/i })).toBeInTheDocument();
  expect(screen.getByText('max · скоро')).toBeInTheDocument();
});

test('puts the disabled channel last', () => {
  const { container } = render(<ContactChannels source="hero" />);
  const labels = [...container.querySelectorAll('a')].map((link) =>
    link.textContent?.trim(),
  );

  expect(labels).toEqual(['WhatsApp', 'Avito', 'max · скоро']);
});

test('marks the max channel as disabled', () => {
  render(<ContactChannels source="hero" />);

  const max = screen.getByText('max · скоро').closest('a');

  expect(max).toHaveAttribute('aria-disabled', 'true');
  expect(max).not.toHaveAttribute('href');
});
