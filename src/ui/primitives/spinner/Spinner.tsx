import React from 'react';
import { cn } from '@/ui/utils/cn';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'current' | 'white' | 'muted';

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

export function Spinner({
  size = 'md',
  variant = 'primary',
  label = 'Loading...',
  className,
  ...props
}: SpinnerProps) {
  const sizeStyles: Record<SpinnerSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantStyles: Record<SpinnerVariant, string> = {
    primary: 'text-primary-500',
    current: 'text-current',
    white: 'text-white',
    muted: 'text-surface-foreground-subtle',
  };

  return (
    <div className="inline-flex items-center gap-2" role="status" aria-label={label}>
      <svg
        className={cn('animate-spin', sizeStyles[size], variantStyles[variant], className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
