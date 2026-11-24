import React from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { cn } from '@/ui/utils/cn';

export interface BarChartSeries {
  key: string;
  name: string;
  color?: string;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  xAxisKey: string;
  series: BarChartSeries[];
  height?: number;
  showGrid?: boolean;
}

export function BarChart({
  data,
  xAxisKey,
  series,
  height = 280,
  showGrid = true,
  className,
  ...props
}: BarChartProps) {
  const defaultColors = [
    'oklch(0.58 0.23 265)',
    'oklch(0.64 0.18 205)',
    'oklch(0.65 0.20 155)',
  ];

  return (
    <div className={cn('w-full', className)} style={{ height }} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-border)" />
          )}
          <XAxis
            dataKey={xAxisKey}
            stroke="var(--surface-foreground-subtle)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--surface-foreground-subtle)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--surface-border)',
              borderRadius: '0.75rem',
              fontSize: '12px',
              color: 'var(--surface-foreground)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          {series.map((s, idx) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color || defaultColors[idx % defaultColors.length]}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
