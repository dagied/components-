import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Loader2 } from 'lucide-react';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function IconButton({
  icon,
  className,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  disabled = false,
  'aria-label': ariaLabel,
  ref,
  ...props
}: IconButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg select-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-ring active:scale-95 shrink-0';

  const variantStyles: Record<IconButtonVariant, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 shadow-sm',
    secondary: 'bg-surface-muted text-surface-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-surface-border',
    outline: 'border border-surface-border bg-transparent text-surface-foreground hover:bg-surface-muted',
    ghost: 'bg-transparent text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted active:bg-neutral-200 dark:active:bg-neutral-800',
    danger: 'bg-danger-600 text-white hover:bg-danger-500 active:bg-danger-700 shadow-sm',
  };

  const sizeStyles: Record<IconButtonSize, string> = {
    xs: 'w-7 h-7 min-w-[28px] min-h-[28px] p-1 text-xs',
    sm: 'w-8 h-8 min-w-[32px] min-h-[32px] p-1.5 text-sm',
    md: 'w-10 h-10 min-w-[40px] min-h-[40px] p-2 text-base',
    lg: 'w-12 h-12 min-w-[48px] min-h-[48px] p-2.5 text-lg',
  };

  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : icon}
    </button>
  );
}
