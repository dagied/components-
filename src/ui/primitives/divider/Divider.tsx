import React from 'react';
import { cn } from '@/ui/utils/cn';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerAlign = 'start' | 'center' | 'end';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  label?: React.ReactNode;
  align?: DividerAlign;
  dashed?: boolean;
}

export function Divider({
  orientation = 'horizontal',
  label,
  align = 'center',
  dashed = false,
  className,
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          'inline-block h-full min-h-[1em] w-[1px] self-stretch bg-surface-border',
          dashed && 'border-l border-dashed border-surface-border bg-transparent',
          className
        )}
        {...props}
      />
    );
  }

  if (!label) {
    return (
      <hr
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          'w-full border-t border-surface-border my-4',
          dashed && 'border-dashed',
          className
        )}
        {...props}
      />
    );
  }

  const alignStyles: Record<DividerAlign, { before: string; after: string }> = {
    start: { before: 'w-6 grow-0', after: 'grow' },
    center: { before: 'grow', after: 'grow' },
    end: { before: 'grow', after: 'w-6 grow-0' },
  };

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('flex items-center w-full my-4 text-xs text-surface-foreground-subtle', className)}
      {...props}
    >
      <div
        className={cn(
          'border-t border-surface-border',
          dashed && 'border-dashed',
          alignStyles[align].before
        )}
      />
      <span className="px-3 shrink-0 font-medium">{label}</span>
      <div
        className={cn(
          'border-t border-surface-border',
          dashed && 'border-dashed',
          alignStyles[align].after
        )}
      />
    </div>
  );
}
