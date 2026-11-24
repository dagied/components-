import React from 'react';
import { cn } from '@/ui/utils/cn';
import { X } from 'lucide-react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'subtle';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  removable = false,
  onRemove,
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none transition-colors';

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-surface-muted text-surface-foreground border border-surface-border',
    primary: 'bg-primary-500/15 text-primary-500 border border-primary-500/25',
    secondary: 'bg-secondary-500/15 text-secondary-500 border border-secondary-500/25',
    success: 'bg-success-500/15 text-success-500 border border-success-500/25',
    warning: 'bg-warning-500/15 text-warning-500 border border-warning-500/25',
    danger: 'bg-danger-500/15 text-danger-500 border border-danger-500/25',
    outline: 'bg-transparent text-surface-foreground border border-surface-border',
    subtle: 'bg-surface-muted/60 text-surface-foreground-muted',
  };

  const dotColorStyles: Record<BadgeVariant, string> = {
    default: 'bg-neutral-500',
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    outline: 'bg-neutral-400',
    subtle: 'bg-neutral-400',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-sm px-3 py-1 gap-2',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColorStyles[variant])} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove badge"
          className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
