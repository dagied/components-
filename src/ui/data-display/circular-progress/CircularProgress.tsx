import React from 'react';
import { cn } from '@/ui/utils/cn';

export type CircularProgressVariant = 'primary' | 'success' | 'warning' | 'danger';
export type CircularProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: CircularProgressVariant;
  size?: CircularProgressSize;
  strokeWidth?: number;
  showValue?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  strokeWidth = 4,
  showValue = true,
  className,
  ...props
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeDimensions: Record<CircularProgressSize, number> = {
    sm: 36,
    md: 48,
    lg: 72,
    xl: 96,
  };

  const dim = sizeDimensions[size];
  const radius = (dim - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variantColors: Record<CircularProgressVariant, string> = {
    primary: 'text-primary-600',
    success: 'text-success-500',
    warning: 'text-warning-500',
    danger: 'text-danger-500',
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: dim, height: dim }}
      {...props}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-muted"
          fill="transparent"
        />
        {/* Animated fill */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-500 ease-out', variantColors[variant])}
          fill="transparent"
        />
      </svg>

      {showValue && (
        <span className="absolute font-mono font-semibold text-surface-foreground text-[10px] sm:text-xs">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
