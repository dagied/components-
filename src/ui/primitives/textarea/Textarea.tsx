import React, { useId } from 'react';
import { cn } from '@/ui/utils/cn';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  size?: TextareaSize;
  showCount?: boolean;
  fullWidth?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea({
  id: customId,
  label,
  helperText,
  error,
  size = 'md',
  showCount = false,
  maxLength,
  fullWidth = true,
  disabled = false,
  className,
  value,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = customId || generatedId;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const currentLength = typeof value === 'string' ? value.length : 0;

  const sizeStyles: Record<TextareaSize, string> = {
    sm: 'text-xs p-2.5 min-h-[70px]',
    md: 'text-sm p-3 min-h-[96px]',
    lg: 'text-base p-4 min-h-[120px]',
  };

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-medium text-surface-foreground">
            {label}
          </label>
        )}
        {showCount && maxLength && (
          <span className="text-[11px] text-surface-foreground-subtle">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <div
        className={cn(
          'relative rounded-lg border bg-surface transition-all duration-200 overflow-hidden',
          isError
            ? 'border-danger-500 focus-within:ring-2 focus-within:ring-danger-500/30'
            : 'border-surface-border focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
          disabled && 'opacity-60 bg-surface-muted cursor-not-allowed'
        )}
      >
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          aria-invalid={isError}
          className={cn(
            'w-full bg-transparent text-surface-foreground placeholder:text-surface-foreground-subtle focus:outline-none resize-y disabled:cursor-not-allowed',
            sizeStyles[size],
            className
          )}
          {...props}
        />
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
