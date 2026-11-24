import React from 'react';
import { cn } from '@/ui/utils/cn';

export type SkeletonVariant = 'text' | 'circular' | 'rounded' | 'rectangular';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const variantStyles: Record<SkeletonVariant, string> = {
    text: 'rounded h-4 w-full',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    rectangular: 'rounded-none',
  };

  const inlineStyles: React.CSSProperties = {
    ...style,
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'animate-pulse bg-neutral-200 dark:bg-neutral-800/80',
        variantStyles[variant],
        className
      )}
      style={inlineStyles}
      {...props}
    />
  );
}
