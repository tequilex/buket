'use client';

import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useOrderModal } from './order-modal';

interface OrderButtonProps {
  /** Куда уходит цель Метрики и с какого места открыта модалка. */
  source: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  children: ReactNode;
}

/** Зелёная кнопка, открывающая модалку заказа. Ссылок наружу не ведёт. */
export function OrderButton({
  source,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: OrderButtonProps) {
  const { open } = useOrderModal();

  return (
    <Button variant={variant} size={size} className={className} onClick={() => open(source)}>
      {children}
    </Button>
  );
}
