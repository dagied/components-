import React from 'react';
import { cn } from '@/ui/utils/cn';

export type CardVariant = 'default' | 'elevated' | 'outline' | 'ghost';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}

export function Card({
  variant = 'default',
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-surface-card border border-surface-border shadow-xs',
    elevated: 'bg-surface-card border border-surface-border shadow-lg shadow-black/5',
    outline: 'bg-transparent border border-surface-border',
    ghost: 'bg-surface-muted/50 border border-transparent',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-200 overflow-hidden',
        variantStyles[variant],
        hoverable && 'hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5 border-b border-surface-border/80 flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-sm sm:text-base font-semibold text-surface-foreground tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-surface-foreground-muted leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-4 border-t border-surface-border/80 bg-surface-muted/20 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
