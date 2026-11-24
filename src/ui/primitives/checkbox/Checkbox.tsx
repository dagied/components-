import React, { useId } from 'react';
import { cn } from '@/ui/utils/cn';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps {
  id?: string;
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Checkbox({
  id: customId,
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  error,
  disabled = false,
  className,
  ref,
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = customId || generatedId;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (disabled) return;
    const nextState = currentChecked === true ? false : true;
    if (!isControlled) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
  };

  const isChecked = currentChecked === true;
  const isIndeterminate = currentChecked === 'indeterminate';

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          role="checkbox"
          id={checkboxId}
          ref={ref}
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            'flex h-4 w-4 shrink-0 rounded items-center justify-center border transition-all duration-150 cursor-pointer focus-ring mt-0.5',
            isChecked || isIndeterminate
              ? 'bg-primary-600 border-primary-600 text-white shadow-xs'
              : 'border-surface-border bg-surface hover:border-neutral-400 dark:hover:border-neutral-600',
            isError && 'border-danger-500',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-muted'
          )}
        >
          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
          {isIndeterminate && <Minus className="h-3 w-3 stroke-[3]" />}
        </button>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                onClick={handleClick}
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

      {errorMessage && <p className="text-xs text-danger-500 font-medium pl-6">{errorMessage}</p>}
    </div>
  );
}
