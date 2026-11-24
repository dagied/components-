import React, { useEffect } from 'react';
import { cn } from '@/ui/utils/cn';
import { X } from 'lucide-react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  title,
  description,
  children,
  footer,
  closeOnBackdrop = true,
  className,
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const placementContainerStyles: Record<DrawerPlacement, string> = {
    right: 'justify-end',
    left: 'justify-start',
    top: 'items-start',
    bottom: 'items-end',
  };

  const horizontalSizeStyles: Record<DrawerSize, string> = {
    sm: 'w-full max-w-xs',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
    xl: 'w-full max-w-2xl',
    full: 'w-full',
  };

  const verticalSizeStyles: Record<DrawerSize, string> = {
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-[500px]',
    xl: 'h-[650px]',
    full: 'h-full',
  };

  const isVertical = placement === 'top' || placement === 'bottom';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200',
        placementContainerStyles[placement]
      )}
      onClick={() => closeOnBackdrop && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex flex-col bg-surface-card border-surface-border shadow-2xl overflow-hidden transition-transform',
          isVertical ? `w-full ${verticalSizeStyles[size]}` : `h-full ${horizontalSizeStyles[size]}`,
          placement === 'right' && 'border-l animate-in slide-in-from-right duration-250',
          placement === 'left' && 'border-r animate-in slide-in-from-left duration-250',
          placement === 'top' && 'border-b animate-in slide-in-from-top duration-250',
          placement === 'bottom' && 'border-t rounded-t-2xl animate-in slide-in-from-bottom duration-250',
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-surface-border">
            <div className="space-y-1 pr-4">
              {title && <h3 className="text-base font-semibold text-surface-foreground">{title}</h3>}
              {description && <p className="text-xs text-surface-foreground-muted">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="rounded-lg p-1 text-surface-foreground-subtle hover:text-surface-foreground hover:bg-surface-muted transition-colors focus-ring"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 border-t border-surface-border bg-surface-muted/30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
