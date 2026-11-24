import React, { useId } from 'react';
import { cn } from '@/ui/utils/cn';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  size?: SwitchSize;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Switch({
  id: customId,
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className,
  ref,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = customId || generatedId;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const trackSizes: Record<SwitchSize, string> = {
    sm: 'h-4 w-7',
    md: 'h-5 w-9',
    lg: 'h-6 w-11',
  };

  const thumbSizes: Record<SwitchSize, string> = {
    sm: 'h-3 w-3 translate-x-0.5 data-[state=checked]:translate-x-3.5',
    md: 'h-4 w-4 translate-x-0.5 data-[state=checked]:translate-x-4.5',
    lg: 'h-5 w-5 translate-x-0.5 data-[state=checked]:translate-x-5.5',
  };

  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <button
        type="button"
        role="switch"
        id={switchId}
        ref={ref}
        aria-checked={isChecked}
        data-state={isChecked ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-ring items-center',
          trackSizes[size],
          isChecked ? 'bg-primary-600' : 'bg-surface-border hover:bg-neutral-300 dark:hover:bg-neutral-600',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          data-state={isChecked ? 'checked' : 'unchecked'}
          className={cn(
            'pointer-events-none inline-block transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
            thumbSizes[size]
          )}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              onClick={handleToggle}
              className={cn(
                'text-xs font-medium cursor-pointer select-none text-surface-foreground',
                disabled && 'opacity-60 cursor-not-allowed'
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
