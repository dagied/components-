import React, { createContext, use, useState, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextType {
  toasts: ToastItem[];
  toast: (options: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = (options: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...options, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = options.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons: Record<ToastVariant, React.ReactNode> = {
    default: <Info className="w-4 h-4 text-primary-500" />,
    success: <CheckCircle2 className="w-4 h-4 text-success-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-warning-500" />,
    danger: <AlertCircle className="w-4 h-4 text-danger-500" />,
    info: <Info className="w-4 h-4 text-accent-500" />,
  };

  const variantBorders: Record<ToastVariant, string> = {
    default: 'border-surface-border',
    success: 'border-success-500/30',
    warning: 'border-warning-500/30',
    danger: 'border-danger-500/30',
    info: 'border-accent-500/30',
  };

  return (
    <ToastContext value={{ toasts, toast, dismiss }}>
      {children}

      {/* Floating toast stack */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => {
          const variant = t.variant || 'default';
          return (
            <div
              key={t.id}
              role="alert"
              className={cn(
                'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-surface-card shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200',
                variantBorders[variant]
              )}
            >
              <span className="shrink-0 mt-0.5">{icons[variant]}</span>
              <div className="flex-1 space-y-1">
                <h5 className="text-xs font-semibold text-surface-foreground">{t.title}</h5>
                {t.description && (
                  <p className="text-xs text-surface-foreground-muted leading-relaxed">{t.description}</p>
                )}
                {t.action && (
                  <button
                    type="button"
                    onClick={() => {
                      t.action?.onClick();
                      dismiss(t.id);
                    }}
                    className="mt-1 text-xs font-semibold text-primary-500 hover:underline cursor-pointer"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss toast"
                className="shrink-0 p-1 text-surface-foreground-subtle hover:text-surface-foreground rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext>
  );
}
