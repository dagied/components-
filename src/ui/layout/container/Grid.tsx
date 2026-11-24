import React from 'react';
import { cn } from '@/ui/utils/cn';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  smCols?: GridCols;
  mdCols?: GridCols;
  lgCols?: GridCols;
  xlCols?: GridCols;
  gap?: GridGap;
}

export function Grid({
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  xlCols,
  gap = 'md',
  className,
  children,
  ...props
}: GridProps) {
  const colStyles: Record<GridCols, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  };

  const smColStyles: Record<GridCols, string> = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
    12: 'sm:grid-cols-12',
  };

  const mdColStyles: Record<GridCols, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    12: 'md:grid-cols-12',
  };

  const lgColStyles: Record<GridCols, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
  };

  const xlColStyles: Record<GridCols, string> = {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5',
    6: 'xl:grid-cols-6',
    12: 'xl:grid-cols-12',
  };

  const gapStyles: Record<GridGap, string> = {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  };

  return (
    <div
      className={cn(
        'grid w-full',
        colStyles[cols],
        smCols && smColStyles[smCols],
        mdCols && mdColStyles[mdCols],
        lgCols && lgColStyles[lgCols],
        xlCols && xlColStyles[xlCols],
        gapStyles[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
