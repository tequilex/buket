'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './icon';

interface ModalCardProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: ReactNode;
  /** Максимальная ширина в px. По умолчанию 440. */
  width?: number;
  children?: ReactNode;
}

/**
 * Оверлей заказа — белая карточка на затемнении. Единственная приподнятая
 * поверхность системы и единственное место, где есть крупная тень.
 */
export function ModalCard({
  title,
  subtitle,
  onClose,
  footer,
  width = 440,
  children,
}: ModalCardProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[rgb(23_24_28/0.5)] p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        style={{ maxWidth: width }}
        // Оболочка не прокручивается и обрезает декор: кружок висит на 50px
        // правее края, а при overflow-y: auto соседняя ось перестаёт быть
        // visible и тоже становится auto — отсюда и брался горизонтальный
        // скролл. Крестик с кружком живут здесь, чтобы не уезжать вместе с
        // содержимым, когда его много.
        className="relative flex max-h-full w-full flex-col overflow-hidden rounded-[32px] bg-card shadow-modal outline-none max-md:rounded-xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-12.5 -right-12.5 size-37.5 rounded-full bg-primary"
        />

        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-ink text-white"
        >
          <Icon name="x" size={18} />
        </button>

        <div className="relative flex flex-col gap-5 overflow-y-auto p-8 max-md:p-5">
          <div className="flex flex-col gap-2 pr-12">
            <h2 className="font-display text-[26px] leading-[1.1] font-bold tracking-[-0.03em] text-ink max-md:text-[22px]">
              {title}
            </h2>
            {subtitle ? (
              <p className="text-[15px] text-mute text-pretty max-md:text-[14px]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {children}
          {footer}
        </div>
      </div>
    </div>,
    document.body,
  );
}
