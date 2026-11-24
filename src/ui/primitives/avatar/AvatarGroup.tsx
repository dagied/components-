import React from 'react';
import { cn } from '@/ui/utils/cn';
import { type AvatarSize } from './Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ children, max = 4, size = 'md', className, ...props }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visibleAvatars = childArray.slice(0, max);
  const excess = childArray.length - max;

  const sizeStyles: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-[10px] -space-x-1.5',
    sm: 'w-8 h-8 text-xs -space-x-2',
    md: 'w-10 h-10 text-sm -space-x-2.5',
    lg: 'w-12 h-12 text-base -space-x-3',
    xl: 'w-16 h-16 text-xl -space-x-4',
  };

  const counterSizes: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base',
  };

  return (
    <div className={cn('inline-flex items-center', sizeStyles[size].split(' ')[sizeStyles[size].split(' ').length - 1], className)} {...props}>
      {visibleAvatars.map((child, idx) => (
        <div key={idx} className="relative ring-2 ring-surface rounded-full transition-transform hover:z-10 hover:scale-105">
          {child}
        </div>
      ))}
      {excess > 0 && (
        <div
          className={cn(
            'relative z-0 inline-flex items-center justify-center rounded-full bg-surface-muted text-surface-foreground border border-surface-border font-medium ring-2 ring-surface',
            counterSizes[size]
          )}
        >
          +{excess}
        </div>
      )}
    </div>
  );
}
