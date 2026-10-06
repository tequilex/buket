'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ContactChannels } from '@/components/cta/contact-channels';
import { ModalCard } from '@/components/ui/modal-card';

interface OrderModalValue {
  open: (source: string) => void;
}

const OrderModalContext = createContext<OrderModalValue | null>(null);

export function useOrderModal() {
  const context = useContext(OrderModalContext);

  if (!context) {
    throw new Error('useOrderModal должен вызываться внутри OrderModalProvider');
  }

  return context;
}

/**
 * Одна модалка заказа на всё приложение: выбор канала и больше ничего.
 *
 * Поля телефона здесь нет намеренно. Бэкенда у витрины не существует,
 * принять заявку некуда: введённый номер никуда не уходил, пока человек не
 * дожимал отправку уже внутри WhatsApp. Подпись «перезвоним» при этом
 * обещала обратный звонок, которого не случалось бы, — и заказчик уходил
 * в уверенности, что оставил контакт.
 *
 * Отдельной кнопки «открыть WhatsApp» тоже нет: она дублировала бы ссылку
 * канала, стоящую строкой выше.
 */
export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);

  const open = useCallback((nextSource: string) => setSource(nextSource), []);
  const close = useCallback(() => setSource(null), []);

  const value = useMemo<OrderModalValue>(() => ({ open }), [open]);

  return (
    <OrderModalContext.Provider value={value}>
      {children}
      {source ? (
        <ModalCard
          title="Заказать букет"
          subtitle="Напишите в удобный канал — ответим за 15 минут и согласуем состав."
          onClose={close}
        >
          <ContactChannels source={source} layout="stack" className="relative" />
        </ModalCard>
      ) : null}
    </OrderModalContext.Provider>
  );
}
