import React from 'react';
import { cn } from '@/ui/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/ui/data-display/card/Card';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: React.ReactNode;
  change?: number | string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  changePeriod?: string;
  icon?: React.ReactNode;
  description?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'increase',
  changePeriod = 'vs last month',
  icon,
  description,
  className,
  ...props
}: StatCardProps) {
  const trendIcons = {
    increase: <TrendingUp className="w-3.5 h-3.5" />,
    decrease: <TrendingDown className="w-3.5 h-3.5" />,
    neutral: <Minus className="w-3.5 h-3.5" />,
  };

  const trendStyles = {
    increase: 'text-success-500 bg-success-500/10 border-success-500/20',
    decrease: 'text-danger-500 bg-danger-500/10 border-danger-500/20',
    neutral: 'text-surface-foreground-subtle bg-surface-muted border-surface-border',
  };

  return (
    <Card className={cn('p-5 flex flex-col justify-between gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-surface-foreground-muted">{title}</span>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 shrink-0 border border-primary-500/15">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold font-display tracking-tight text-surface-foreground">
          {value}
        </div>

        {(change !== undefined || description) && (
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {change !== undefined && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium border',
                  trendStyles[changeType]
                )}
              >
                {trendIcons[changeType]}
                <span>{change}</span>
              </span>
            )}
            <span className="text-surface-foreground-subtle text-[11px]">
              {description || changePeriod}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
