import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderButton } from '@/components/order/order-button';
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
});

/**
 * Поля телефона в модалке быть не должно. Бэкенда у витрины нет, принять
 * заявку некуда — поле обещало обратный звонок, которого не случилось бы:
 * номер никуда не уходил, если человек не дожимал отправку уже в WhatsApp.
 */
test('the modal asks for nothing it cannot receive', async () => {
  const user = userEvent.setup();
  renderWithOrderModal(<OrderButton source="header">Написать</OrderButton>);

  await user.click(screen.getByRole('button', { name: 'Написать' }));

  expect(screen.queryByLabelText('Телефон')).not.toBeInTheDocument();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(screen.queryByText(/перезвоним/i)).not.toBeInTheDocument();

  // И никакой второй кнопки WhatsApp: она дублировала бы ссылку канала.
  expect(screen.getAllByRole('link', { name: /whatsapp/i })).toHaveLength(1);
});

test('escape closes the modal', async () => {
  const user = userEvent.setup();
  renderWithOrderModal(<OrderButton source="header">Написать</OrderButton>);

  await user.click(screen.getByRole('button', { name: 'Написать' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

/**
 * Регрессия. Декоративный кружок висит на 50px правее края карточки, а при
 * overflow-y: auto соседняя ось перестаёт быть visible и тоже становится
 * auto — модалка получала горизонтальный скролл ровно на эти 50px.
 * Оболочка обязана обрезать декор и не прокручиваться, прокрутка живёт
 * во вложенном блоке.
 */
test('the modal shell clips decoration instead of scrolling sideways', async () => {
  const user = userEvent.setup();
  renderWithOrderModal(<OrderButton source="header">Написать</OrderButton>);

  await user.click(screen.getByRole('button', { name: 'Написать' }));

  const shell = screen.getByRole('dialog');

  expect(shell.className).toContain('overflow-hidden');
  expect(shell.className).not.toContain('overflow-y-auto');

  const scroller = shell.querySelector('.overflow-y-auto');

  expect(scroller).not.toBeNull();
  // Крестик и кружок остаются в оболочке, иначе они уезжают с содержимым.
  expect(scroller?.contains(screen.getByRole('button', { name: 'Закрыть' }))).toBe(
    false,
  );
});
