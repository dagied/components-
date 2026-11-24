import React, { useState, useRef, useEffect, useId } from 'react';
import { cn } from '@/ui/utils/cn';
import { Search, ChevronDown, Check, X } from 'lucide-react';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export function Combobox({
  label,
  helperText,
  error,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found',
  disabled = false,
  fullWidth = true,
  className,
  id: customId,
}: ComboboxProps) {
  const generatedId = useId();
  const comboboxId = customId || generatedId;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opt.description && opt.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
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
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions[highlightedIndex] && !filteredOptions[highlightedIndex].disabled) {
        handleSelect(filteredOptions[highlightedIndex].value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div ref={containerRef} className={cn('relative flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label id={`${comboboxId}-label`} className="text-xs font-medium text-surface-foreground">
          {label}
        </label>
      )}

      <button
        type="button"
        id={comboboxId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${comboboxId}-label ${comboboxId}` : comboboxId}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-between h-10 px-3 text-sm rounded-lg border bg-surface transition-all duration-200 cursor-pointer text-left',
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
          className="absolute z-50 w-full top-full mt-1.5 rounded-lg border border-surface-border bg-surface-card p-1 shadow-lg shadow-black/10 backdrop-blur-md animate-in fade-in-50 zoom-in-95 duration-150"
        >
          <div className="flex items-center px-2 py-1.5 border-b border-surface-border mb-1">
            <Search className="w-3.5 h-3.5 text-surface-foreground-subtle shrink-0 mr-2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs text-surface-foreground placeholder:text-surface-foreground-subtle focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-0.5 text-surface-foreground-subtle hover:text-surface-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-4 px-2 text-center text-xs text-surface-foreground-subtle">{emptyText}</div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === selectedValue;
                const isHighlighted = index === highlightedIndex;

                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 text-xs rounded-md cursor-pointer transition-colors select-none',
                      isSelected && 'bg-primary-500/10 text-primary-500 font-medium',
                      isHighlighted && !isSelected && 'bg-surface-muted text-surface-foreground',
                      option.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
                    )}
                  >
                    <div className="flex flex-col truncate">
                      <span className="flex items-center gap-2 truncate">
                        {option.icon && <span className="shrink-0">{option.icon}</span>}
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-[11px] text-surface-foreground-subtle mt-0.5">{option.description}</span>
                      )}
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2 text-primary-500" />}
                  </div>
                );
              })
            )}
          </div>
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
