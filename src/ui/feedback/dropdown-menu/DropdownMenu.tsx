import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';
import { Kbd } from '@/ui/primitives/kbd/Kbd';

export interface DropdownMenuItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  placement?: DropdownPlacement;
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  placement = 'bottom-start',
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const placementStyles: Record<DropdownPlacement, string> = {
    'bottom-start': 'top-full left-0 mt-1.5',
    'bottom-end': 'top-full right-0 mt-1.5',
    'top-start': 'bottom-full left-0 mb-1.5',
    'top-end': 'bottom-full right-0 mb-1.5',
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 min-w-[200px] rounded-xl border border-surface-border bg-surface-card p-1.5 shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150',
            placementStyles[placement],
            className
          )}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={`divider-${index}`} className="my-1 border-t border-surface-border" />;
            }

            return (
              <button
                key={item.id}
                role="menuitem"
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer text-left',
                  item.danger
                    ? 'text-danger-500 hover:bg-danger-500/10'
                    : 'text-surface-foreground hover:bg-surface-muted',
                  item.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  {item.icon && <span className="w-3.5 h-3.5 shrink-0 text-surface-foreground-subtle">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </div>
                {item.shortcut && <Kbd size="sm" className="ml-2">{item.shortcut}</Kbd>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
