import React from 'react';
import { cn } from '@/ui/utils/cn';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger' | 'accent';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showValue?: boolean;
  label?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showValue = false,
  label,
  animated = false,
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeStyles: Record<ProgressSize, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantStyles: Record<ProgressVariant, string> = {
    primary: 'bg-primary-600',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    accent: 'bg-accent-500',
  };

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-medium text-surface-foreground">{label}</span>}
          {showValue && (
            <span className="font-mono text-surface-foreground-subtle text-[11px]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'w-full rounded-full bg-surface-muted overflow-hidden border border-surface-border',
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantStyles[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
