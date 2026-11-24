import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
  ...props
}: AccordionProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpanded((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpanded((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('divide-y divide-surface-border rounded-xl border border-surface-border bg-surface-card overflow-hidden', className)} {...props}>
      {items.map((item) => {
        const isExpanded = expanded.includes(item.id);
        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && toggleItem(item.id)}
              aria-expanded={isExpanded}
              className={cn(
                'w-full flex items-center justify-between p-4 text-xs sm:text-sm font-medium text-surface-foreground hover:bg-surface-muted/50 transition-colors text-left cursor-pointer focus-ring',
                item.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
              )}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-surface-foreground-subtle transition-transform duration-200 shrink-0 ml-3',
                  isExpanded && 'rotate-180'
                )}
              />
            </button>

            {isExpanded && (
              <div
                role="region"
                className="px-4 pb-4 pt-1 text-xs text-surface-foreground-muted leading-relaxed border-t border-surface-border/50 bg-surface-muted/20 animate-in fade-in-0 duration-150"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
