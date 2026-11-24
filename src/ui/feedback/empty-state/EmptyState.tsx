import React from 'react';
import { cn } from '@/ui/utils/cn';
import { FolderOpen } from 'lucide-react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function EmptyState({
  icon = <FolderOpen className="w-8 h-8 text-surface-foreground-subtle" />,
  title = 'No items found',
  description = 'There is currently no data or items to display in this view.',
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-surface-border rounded-2xl bg-surface/40',
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted border border-surface-border mb-4 text-surface-foreground-subtle shadow-xs">
        {icon}
      </div>
      <h4 className="text-sm font-semibold text-surface-foreground">{title}</h4>
      <p className="text-xs text-surface-foreground-muted max-w-sm mt-1.5 leading-relaxed">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-6">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
