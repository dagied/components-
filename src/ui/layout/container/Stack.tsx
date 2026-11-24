import React from 'react';
import { cn } from '@/ui/utils/cn';

export type StackDirection = 'row' | 'col';
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  spacing?: StackSpacing;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
}

export function Stack({
  direction = 'col',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  const directionStyles: Record<StackDirection, string> = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const spacingStyles: Record<StackSpacing, string> = {
    none: 'gap-0',
    xs: 'gap-1.5',
    sm: 'gap-2.5',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const alignStyles: Record<StackAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyStyles: Record<StackJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div
      className={cn(
        'flex',
        directionStyles[direction],
        spacingStyles[spacing],
        alignStyles[align],
        justifyStyles[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
