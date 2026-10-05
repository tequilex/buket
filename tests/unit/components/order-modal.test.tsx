import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderButton } from '@/components/order/order-button';
import siteConfig from '@/data/site-config';
import { renderWithOrderModal } from '@/test/render';

test('the order button opens the modal with every channel', async () => {
  const user = userEvent.setup();
  renderWithOrderModal(<OrderButton source="header">Написать</OrderButton>);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Написать' }));

  const dialog = screen.getByRole('dialog', { name: 'Заказать букет' });

  expect(dialog).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  expect(screen.getByText('max')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /avito/i })).toBeInTheDocument();
  expect(screen.getByLabelText('Телефон')).toHaveAttribute(
    'placeholder',
    siteConfig.phone,
  );
});

test('the typed phone travels into the whatsapp message', async () => {
  const user = userEvent.setup();
  renderWithOrderModal(<OrderButton source="header">Написать</OrderButton>);

  await user.click(screen.getByRole('button', { name: 'Написать' }));
  await user.type(screen.getByLabelText('Телефон'), '+7 900 000-00-00');

  const submit = screen.getByRole('link', { name: /отправить заявку/i });

  expect(submit).toHaveAttribute(
    'href',
    expect.stringContaining(encodeURIComponent('+7 900 000-00-00')),
  );
});

test('escape closes the modal', async () => {
  const user = userEvent.setup();
  renderWithOrderModal(<OrderButton source="header">Написать</OrderButton>);

  await user.click(screen.getByRole('button', { name: 'Написать' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
