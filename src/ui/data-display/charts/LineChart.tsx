import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { cn } from '@/ui/utils/cn';

export interface LineChartSeries {
  key: string;
  name: string;
  color?: string;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  xAxisKey: string;
  series: LineChartSeries[];
  height?: number;
  showGrid?: boolean;
}

export function LineChart({
  data,
  xAxisKey,
  series,
  height = 280,
  showGrid = true,
  className,
  ...props
}: LineChartProps) {
  const defaultColors = [
    'oklch(0.58 0.23 265)', // primary
    'oklch(0.64 0.18 205)', // accent
    'oklch(0.65 0.20 155)', // success
    'oklch(0.72 0.18 85)',  // warning
  ];

  return (
    <div className={cn('w-full', className)} style={{ height }} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color || defaultColors[idx % defaultColors.length]}
              strokeWidth={2.5}
              dot={{ r: 3, fill: s.color || defaultColors[idx % defaultColors.length] }}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
