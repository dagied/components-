import React from 'react';
import { cn } from '@/ui/utils/cn';
import { X } from 'lucide-react';

export type TagVariant = 'default' | 'primary' | 'outline' | 'filled';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TagVariant;
  size?: TagSize;
  selected?: boolean;
  onSelect?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Tag({
  variant = 'default',
  size = 'md',
  selected = false,
  onSelect,
  removable = false,
  onRemove,
  icon,
  disabled = false,
  children,
  className,
  ...props
}: TagProps) {
  const isClickable = Boolean(onSelect) && !disabled;

  const baseStyles =
    'inline-flex items-center font-medium rounded-lg select-none transition-all duration-150 border';

  const variantStyles: Record<TagVariant, string> = {
    default: selected
      ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
      : 'bg-surface-muted text-surface-foreground border-surface-border hover:border-neutral-400 dark:hover:border-neutral-600',
    primary: selected
      ? 'bg-primary-600 text-white border-primary-600'
      : 'bg-primary-500/10 text-primary-500 border-primary-500/20 hover:bg-primary-500/20',
    outline: selected
      ? 'bg-primary-500/15 text-primary-500 border-primary-500'
      : 'bg-transparent text-surface-foreground border-surface-border hover:bg-surface-muted',
    filled: selected
      ? 'bg-primary-600 text-white border-primary-600'
      : 'bg-neutral-200 dark:bg-neutral-800 text-surface-foreground border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-700',
  };

  const sizeStyles: Record<TagSize, string> = {
    sm: 'text-xs px-2 py-0.5 gap-1.5 h-6',
    md: 'text-xs px-2.5 py-1 gap-1.5 h-7',
    lg: 'text-sm px-3 py-1.5 gap-2 h-8',
  };

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onSelect : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.();
              }
            }
          : undefined
      }
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isClickable && 'cursor-pointer active:scale-98 focus-ring',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {removable && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove tag"
          className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
