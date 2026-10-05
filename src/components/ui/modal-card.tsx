'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './icon';
import { IconButton } from './icon-button';

interface ModalCardProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: ReactNode;
  /** Максимальная ширина в px. По умолчанию 460. */
  width?: number;
  children?: ReactNode;
}

/**
 * Оверлей заказа — графитовый блок на плотном затемнении. Единственная
 * приподнятая поверхность системы и единственное место, где есть тень.
 */
export function ModalCard({
  title,
  subtitle,
  onClose,
  footer,
  width = 460,
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
      className="fixed inset-0 z-60 flex items-center justify-center bg-[rgb(18_17_13/0.72)] p-6.5"
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
        className="relative flex max-h-full w-full flex-col gap-4.5 overflow-y-auto bg-dark px-6.5 pt-10 pb-6.5 text-on-dark shadow-modal outline-none"
      >
        <IconButton
          label="Закрыть"
          onDark
          size={40}
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <Icon name="x" size={20} />
        </IconButton>

        <div className="flex flex-col gap-2">
          <h2 className="type-heading-xl text-on-dark">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-mute-on-dark text-pretty">{subtitle}</p>
          ) : null}
        </div>

        {children}
        {footer}
      </div>
    </div>,
    document.body,
  );
}
