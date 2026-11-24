import React from 'react';
import { cn } from '@/ui/utils/cn';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumbs({
  items,
  separator = <ChevronRight className="w-3.5 h-3.5 text-surface-foreground-subtle" />,
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs', className)} {...props}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 text-surface-foreground-muted hover:text-surface-foreground transition-colors"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5',
                    isLast ? 'font-medium text-surface-foreground' : 'text-surface-foreground-muted'
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
              {!isLast && <span className="shrink-0 select-none">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
