import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Check } from 'lucide-react';

export type TimelineStatus = 'completed' | 'active' | 'pending';

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  date?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: TimelineStatus;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export function Timeline({ items, className, ...props }: TimelineProps) {
  const statusStyles: Record<TimelineStatus, { dot: string; text: string }> = {
    completed: {
      dot: 'bg-primary-600 text-white border-primary-600',
      text: 'text-surface-foreground',
    },
    active: {
      dot: 'bg-surface border-2 border-primary-600 text-primary-600 ring-4 ring-primary-500/15',
      text: 'text-primary-500 font-semibold',
    },
    pending: {
      dot: 'bg-surface-muted text-surface-foreground-subtle border-surface-border',
      text: 'text-surface-foreground-muted',
    },
  };

  return (
    <div className={cn('relative pl-6 space-y-8', className)} {...props}>
      {/* Connecting vertical line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-border" />

      {items.map((item) => {
        const status = item.status || 'pending';
        return (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Status dot or icon */}
            <div
              className={cn(
                'absolute -left-[23px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs shadow-xs',
                statusStyles[status].dot
              )}
            >
              {item.icon ? (
                item.icon
              ) : status === 'completed' ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h5 className={cn('text-xs font-semibold', statusStyles[status].text)}>
                  {item.title}
                </h5>
                {item.date && (
                  <span className="text-[11px] font-mono text-surface-foreground-subtle">
                    {item.date}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-surface-foreground-muted leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
