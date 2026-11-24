import React, { useId, useState } from 'react';
import { cn } from '@/ui/utils/cn';

export interface SliderProps {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
  helperText?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Slider({
  id: customId,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  label,
  helperText,
  formatValue = (v) => `${v}`,
  disabled = false,
  className,
  ref,
}: SliderProps) {
  const generatedId = useId();
  const sliderId = customId || generatedId;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const percentage = Math.min(100, Math.max(0, ((currentValue - min) / (max - min)) * 100));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const num = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(num);
    }
    onChange?.(num);
  };

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <div className="flex justify-between items-center text-xs font-medium">
        {label && <label htmlFor={sliderId} className="text-surface-foreground">{label}</label>}
        <span className="text-primary-500 font-mono text-xs">{formatValue(currentValue)}</span>
      </div>

      <div className="relative flex items-center h-5 w-full select-none touch-none">
        {/* Track */}
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-muted border border-surface-border">
          {/* Filled range */}
          <div
            className="absolute h-full bg-primary-600 transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Input */}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {/* Thumb */}
        <div
          className={cn(
            'pointer-events-none absolute h-4 w-4 rounded-full border-2 border-primary-600 bg-white shadow-md transition-transform duration-75 focus-ring',
            disabled && 'border-neutral-400 bg-neutral-200'
          )}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>

      {helperText && <p className="text-xs text-surface-foreground-subtle">{helperText}</p>}
    </div>
  );
}
