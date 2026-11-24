import React from 'react';
import { cn } from '@/ui/utils/cn';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: boolean;
  center?: boolean;
}

export function Container({
  size = 'xl',
  padding = true,
  center = true,
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeStyles: Record<ContainerSize, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'w-full',
        sizeStyles[size],
        center && 'mx-auto',
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
