import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: PopoverPlacement;
  className?: string;
}

export function Popover({
  trigger,
  content,
  placement = 'bottom',
  className,
}: PopoverProps) {
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

  const placementStyles: Record<PopoverPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-72 rounded-xl border border-surface-border bg-surface-card p-4 shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150',
            placementStyles[placement],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
