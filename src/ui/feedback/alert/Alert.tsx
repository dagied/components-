import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Alert({
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  action,
  children,
  className,
  ...props
}: AlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const defaultIcons: Record<AlertVariant, React.ReactNode> = {
    info: <Info className="w-4 h-4 text-accent-500" />,
    success: <CheckCircle2 className="w-4 h-4 text-success-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-warning-500" />,
    danger: <AlertCircle className="w-4 h-4 text-danger-500" />,
  };

  const variantStyles: Record<AlertVariant, string> = {
    info: 'bg-accent-500/10 border-accent-500/25 text-surface-foreground',
    success: 'bg-success-500/10 border-success-500/25 text-surface-foreground',
    warning: 'bg-warning-500/10 border-warning-500/25 text-surface-foreground',
    danger: 'bg-danger-500/10 border-danger-500/25 text-surface-foreground',
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="shrink-0 mt-0.5">{icon || defaultIcons[variant]}</span>

      <div className="flex-1 space-y-1">
        {title && <h5 className="text-xs font-semibold">{title}</h5>}
        <div className="text-xs text-surface-foreground-muted leading-relaxed">{children}</div>
        {action && <div className="pt-2">{action}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 rounded-md text-surface-foreground-subtle hover:text-surface-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
