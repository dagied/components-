import React, { useId } from 'react';
import { cn } from '@/ui/utils/cn';
import { X } from 'lucide-react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  fullWidth?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  id: customId,
  label,
  helperText,
  error,
  size = 'md',
  leftIcon,
  rightIcon,
  leftAddon,
  rightAddon,
  clearable = false,
  onClear,
  fullWidth = true,
  disabled = false,
  className,
  value,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const sizeStyles: Record<InputSize, string> = {
    sm: 'h-8 text-xs px-2.5',
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  };

  const iconSizeStyles: Record<InputSize, string> = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-surface-foreground">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center rounded-lg border bg-surface transition-all duration-200 overflow-hidden',
          isError
            ? 'border-danger-500 focus-within:ring-2 focus-within:ring-danger-500/30'
            : 'border-surface-border focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
          disabled && 'opacity-60 bg-surface-muted cursor-not-allowed'
        )}
      >
        {leftAddon && (
          <div className="flex items-center px-3 bg-surface-muted border-r border-surface-border text-surface-foreground-muted text-xs select-none">
            {leftAddon}
          </div>
        )}

        {leftIcon && (
          <div className="pl-3 text-surface-foreground-subtle flex items-center pointer-events-none shrink-0">
            {React.isValidElement(leftIcon)
              ? React.cloneElement(leftIcon as React.ReactElement<{ className?: string }>, {
                  className: cn(iconSizeStyles[size], (leftIcon as React.ReactElement<{ className?: string }>).props.className),
                })
              : leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          value={value}
          aria-invalid={isError}
          className={cn(
            'w-full bg-transparent text-surface-foreground placeholder:text-surface-foreground-subtle focus:outline-none disabled:cursor-not-allowed',
            sizeStyles[size],
            leftIcon && 'pl-2',
            (rightIcon || clearable) && 'pr-2',
            className
          )}
          {...props}
        />

        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear input"
            className="p-1 mr-1 text-surface-foreground-subtle hover:text-surface-foreground rounded-full hover:bg-surface-muted transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {rightIcon && (
          <div className="pr-3 text-surface-foreground-subtle flex items-center pointer-events-none shrink-0">
            {React.isValidElement(rightIcon)
              ? React.cloneElement(rightIcon as React.ReactElement<{ className?: string }>, {
                  className: cn(iconSizeStyles[size], (rightIcon as React.ReactElement<{ className?: string }>).props.className),
                })
              : rightIcon}
          </div>
        )}

        {rightAddon && (
          <div className="flex items-center px-3 bg-surface-muted border-l border-surface-border text-surface-foreground-muted text-xs select-none">
            {rightAddon}
          </div>
        )}
      </div>

      {(errorMessage || helperText) && (
        <p
          className={cn(
            'text-xs tracking-normal',
            isError ? 'text-danger-500 font-medium' : 'text-surface-foreground-subtle'
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}
