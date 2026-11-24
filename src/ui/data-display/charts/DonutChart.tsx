import React from 'react';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { cn } from '@/ui/utils/cn';

export interface DonutDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutDataPoint[];
  centerLabel?: string;
  centerValue?: string | number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function DonutChart({
  data,
  centerLabel,
  centerValue,
  height = 260,
  innerRadius = 60,
  outerRadius = 85,
  className,
  ...props
}: DonutChartProps) {
  const defaultColors = [
    'oklch(0.58 0.23 265)', // primary
    'oklch(0.64 0.18 205)', // accent
    'oklch(0.65 0.20 155)', // success
    'oklch(0.72 0.18 85)',  // warning
    'oklch(0.62 0.23 25)',  // danger
  ];

  return (
    <div className={cn('relative w-full flex items-center justify-center', className)} style={{ height }} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
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
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
                stroke="var(--surface-card)"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>

      {/* Center label & value */}
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center">
          {centerValue && (
            <span className="text-xl font-bold font-display text-surface-foreground leading-tight">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="text-[11px] font-medium text-surface-foreground-subtle">
              {centerLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
