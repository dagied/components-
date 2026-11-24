import React, { createContext, use, useId, useState } from 'react';
import { cn } from '@/ui/utils/cn';

export interface RadioGroupContextType {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  error?: string | boolean;
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
  name: customName,
  value,
  defaultValue,
  onChange,
  disabled = false,
  label,
  error,
  children,
  className,
  orientation = 'vertical',
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = customName || generatedName;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (val: string) => {
    if (disabled) return;
    if (value === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  return (
    <RadioGroupContext value={{ name: groupName, value: currentValue, onChange: handleChange, disabled }}>
      <div role="radiogroup" className={cn('flex flex-col gap-2', className)}>
        {label && <span className="text-xs font-medium text-surface-foreground">{label}</span>}
        <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
          {children}
        </div>
        {errorMessage && <p className="text-xs text-danger-500 font-medium">{errorMessage}</p>}
      </div>
    </RadioGroupContext>
  );
}

export interface RadioProps {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Radio({ value, label, description, disabled = false, className, id: customId }: RadioProps) {
  const context = use(RadioGroupContext);
  const generatedId = useId();
  const radioId = customId || generatedId;

  const isChecked = context?.value === value;
  const isDisabled = disabled || Boolean(context?.disabled);

  const handleClick = () => {
    if (!isDisabled) {
      context?.onChange?.(value);
    }
  };

  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <button
        type="button"
        role="radio"
        id={radioId}
        aria-checked={isChecked}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          'flex h-4 w-4 shrink-0 rounded-full items-center justify-center border transition-all duration-150 cursor-pointer focus-ring mt-0.5',
          isChecked
            ? 'border-primary-600 bg-surface'
            : 'border-surface-border bg-surface hover:border-neutral-400 dark:hover:border-neutral-600',
          isDisabled && 'opacity-50 cursor-not-allowed bg-surface-muted'
        )}
      >
        {isChecked && <span className="h-2 w-2 rounded-full bg-primary-600" />}
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={radioId}
              onClick={handleClick}
              className={cn(
                'text-xs font-medium cursor-pointer select-none text-surface-foreground',
                isDisabled && 'opacity-60 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-[11px] text-surface-foreground-subtle select-none mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
