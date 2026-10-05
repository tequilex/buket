import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { OrderModalProvider } from '@/components/order/order-modal';

/** Любая кнопка «Написать» требует провайдера модалки — он живёт в layout. */
export function renderWithOrderModal(ui: ReactElement) {
  return render(<OrderModalProvider>{ui}</OrderModalProvider>);
}
