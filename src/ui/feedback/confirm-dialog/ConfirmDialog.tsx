import React, { useState } from 'react';
import { Modal } from '@/ui/feedback/modal/Modal';
import { Button } from '@/ui/primitives/button/Button';
import { AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react';

export type ConfirmVariant = 'danger' | 'primary' | 'warning';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const icons: Record<ConfirmVariant, React.ReactNode> = {
    danger: <AlertCircle className="w-6 h-6 text-danger-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-warning-500" />,
    primary: <HelpCircle className="w-6 h-6 text-primary-500" />,
  };

  const buttonVariant: Record<ConfirmVariant, 'danger' | 'primary'> = {
    danger: 'danger',
    warning: 'danger',
    primary: 'primary',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={!loading}>
      <div className="flex flex-col items-center text-center p-2 space-y-4">
        <div className="h-12 w-12 rounded-full bg-surface-muted flex items-center justify-center">
          {icons[variant]}
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-semibold text-surface-foreground">{title}</h4>
          <p className="text-xs text-surface-foreground-muted leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center gap-3 w-full pt-2">
          <Button
            type="button"
            variant="outline"
            fullWidth
            disabled={loading}
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={buttonVariant[variant]}
            fullWidth
            isLoading={loading}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
