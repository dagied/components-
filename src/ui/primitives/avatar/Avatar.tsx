import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  shape?: AvatarShape;
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  shape = 'circle',
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (n?: string) => {
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeStyles: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusSizeStyles: Record<AvatarSize, string> = {
    xs: 'w-1.5 h-1.5 ring-1',
    sm: 'w-2 h-2 ring-1.5',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3 h-3 ring-2',
    xl: 'w-4 h-4 ring-2',
  };

  const statusColors: Record<AvatarStatus, string> = {
    online: 'bg-success-500',
    offline: 'bg-neutral-400',
    busy: 'bg-danger-500',
    away: 'bg-warning-500',
  };

  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center font-medium select-none overflow-visible',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'w-full h-full flex items-center justify-center overflow-hidden border border-surface-border bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-600 dark:text-primary-400 font-semibold',
          shape === 'circle' ? 'rounded-full' : 'rounded-lg'
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-surface-card',
            statusColors[status],
            statusSizeStyles[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
