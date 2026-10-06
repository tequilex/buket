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
import { Button } from '@/components/ui/button';
import { ModalCard } from '@/components/ui/modal-card';
import { TextInput } from '@/components/ui/text-input';
import siteConfig from '@/data/site-config';
import { trackCtaClick } from '@/lib/analytics/metrica';

interface OrderModalValue {
  open: (source: string) => void;
}

const OrderModalContext = createContext<OrderModalValue | null>(null);

const whatsappChannel = siteConfig.channels.find(
  (channel) => channel.id === 'whatsapp',
);

/** Номер из ссылки канала — второго источника правды заводить незачем. */
const whatsappNumber = whatsappChannel?.href.match(/wa\.me\/(\d+)/)?.[1] ?? '';

function buildOrderHref(phone: string) {
  const trimmed = phone.trim();
  const text = trimmed
    ? `Хочу заказать съедобный букет. Мой телефон: ${trimmed}`
    : 'Хочу заказать съедобный букет';

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function useOrderModal() {
  const context = useContext(OrderModalContext);

  if (!context) {
    throw new Error('useOrderModal должен вызываться внутри OrderModalProvider');
  }

  return context;
}

/**
 * Одна модалка заказа на всё приложение: каналы связи, поле телефона
 * и зелёная кнопка. Открывается любой кнопкой «Написать».
 */
export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const [phone, setPhone] = useState('');

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

          <TextInput
            label="Телефон"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={siteConfig.phone}
            helper="Перезвоним, если так удобнее"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />

          {/* Бэкенда у витрины нет: заявка уходит той же перепиской,
              только номер уже вписан в сообщение. */}
          <Button
            variant="dark"
            href={buildOrderHref(phone)}
            target="_blank"
            rel="noreferrer"
            className="w-full"
            onClick={() => {
              trackCtaClick('whatsapp', `${source}_form`);
              close();
            }}
          >
            Отправить заявку
          </Button>
        </ModalCard>
      ) : null}
    </OrderModalContext.Provider>
  );
}
