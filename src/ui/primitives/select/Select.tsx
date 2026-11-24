import React, { useId, useState, useRef, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';
import { ChevronDown, Check } from 'lucide-react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  size?: SelectSize;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export function Select({
  label,
  helperText,
  error,
  size = 'md',
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  fullWidth = true,
  className,
  id: customId,
}: SelectProps) {
  const generatedId = useId();
  const selectId = customId || generatedId;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (val: string) => {
    if (disabled) return;
    if (value === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  const sizeStyles: Record<SelectSize, string> = {
    sm: 'h-8 text-xs px-2.5',
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  };

  return (
    <div ref={containerRef} className={cn('relative flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label id={`${selectId}-label`} className="text-xs font-medium text-surface-foreground">
          {label}
        </label>
      )}

      <button
        type="button"
        id={selectId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${selectId}-label ${selectId}` : selectId}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between rounded-lg border bg-surface transition-all duration-200 cursor-pointer text-left',
          sizeStyles[size],
          isError
            ? 'border-danger-500 focus-ring ring-danger-500/30'
            : 'border-surface-border hover:border-neutral-400 dark:hover:border-neutral-600 focus-ring ring-primary-500/20',
          disabled && 'opacity-60 bg-surface-muted cursor-not-allowed',
          className
        )}
      >
        <span className={cn('flex items-center gap-2 truncate', !selectedOption && 'text-surface-foreground-subtle')}>
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-surface-foreground-subtle transition-transform duration-200 shrink-0 ml-2',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 w-full top-full mt-1.5 max-h-60 overflow-y-auto rounded-lg border border-surface-border bg-surface-card p-1 shadow-lg shadow-black/10 backdrop-blur-md animate-in fade-in-50 zoom-in-95 duration-150"
        >
          {options.length === 0 ? (
            <div className="py-3 px-2 text-center text-xs text-surface-foreground-subtle">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 text-xs rounded-md cursor-pointer transition-colors select-none',
                    isSelected
                      ? 'bg-primary-500/10 text-primary-500 font-medium'
                      : 'text-surface-foreground hover:bg-surface-muted',
                    option.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    {option.icon && <span className="shrink-0">{option.icon}</span>}
                    {option.label}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2 text-primary-500" />}
                </div>
              );
            })
          )}
        </div>
      )}

      {(errorMessage || helperText) && (
        <p
          className={cn(
            'text-xs tracking-normal',
            isError ? 'text-danger-500 font-medium' : 'text-surface-foreground-subtle'
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}
