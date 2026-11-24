import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  ref,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium select-none rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-ring active:scale-[0.98]';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 shadow-sm shadow-primary-500/20 hover:shadow-md hover:shadow-primary-500/30',
    secondary:
      'bg-surface-muted text-surface-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-surface-border active:bg-neutral-300 dark:active:bg-neutral-700',
    outline:
      'border border-surface-border bg-transparent text-surface-foreground hover:bg-surface-muted hover:border-neutral-400 dark:hover:border-neutral-600',
    ghost:
      'bg-transparent text-surface-foreground hover:bg-surface-muted active:bg-neutral-200 dark:active:bg-neutral-800',
    danger:
      'bg-danger-600 text-white hover:bg-danger-500 active:bg-danger-700 shadow-sm shadow-danger-500/20 hover:shadow-md hover:shadow-danger-500/30',
    link:
      'bg-transparent text-primary-500 hover:underline p-0 h-auto active:text-primary-600 focus-visible:ring-0',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 h-10 min-h-[40px]',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12 min-h-[48px]',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'link' && sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
