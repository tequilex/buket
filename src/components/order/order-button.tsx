'use client';

import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useOrderModal } from './order-modal';

interface OrderButtonProps {
  /** Куда уходит цель Метрики и с какого места открыта модалка. */
  source: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  shape?: ButtonProps['shape'];
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

/** Кнопка, открывающая модалку заказа. Ссылок наружу не ведёт. */
export function OrderButton({
  source,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  arrow = false,
  className,
  children,
}: OrderButtonProps) {
  const { open } = useOrderModal();

  return (
    <Button
      variant={variant}
      size={size}
      shape={shape}
      arrow={arrow}
      className={className}
      onClick={() => open(source)}
    >
      {children}
    </Button>
  );
}
