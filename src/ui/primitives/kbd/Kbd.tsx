import React from 'react';
import { cn } from '@/ui/utils/cn';

export type KbdSize = 'sm' | 'md' | 'lg';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize;
  children: React.ReactNode;
}

export function Kbd({ size = 'md', children, className, ...props }: KbdProps) {
  const sizeStyles: Record<KbdSize, string> = {
    sm: 'text-[10px] px-1.5 py-0.5 min-h-[18px] min-w-[18px]',
    md: 'text-xs px-2 py-0.5 min-h-[22px] min-w-[22px]',
    lg: 'text-sm px-2.5 py-1 min-h-[26px] min-w-[26px]',
  };

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center font-mono font-medium rounded border border-surface-border bg-surface-muted text-surface-foreground shadow-xs select-none',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
