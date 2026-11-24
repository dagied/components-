import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/ui/utils/cn';
import { Search, X, ArrowRight } from 'lucide-react';
import { Kbd } from '@/ui/primitives/kbd/Kbd';

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  items,
  placeholder = 'Type a command or search...',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // If we want self-controlled or callback, handled by parent
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        selected.onSelect?.();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-surface-border bg-surface-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-surface-border">
          <Search className="w-5 h-5 text-surface-foreground-subtle shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-surface-foreground placeholder:text-surface-foreground-subtle focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-surface-foreground-subtle hover:text-surface-foreground rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Kbd size="sm" className="ml-2">ESC</Kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-surface-foreground-subtle">
              No matching commands or pages found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.onSelect?.();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer select-none transition-colors',
                    isSelected
                      ? 'bg-primary-600 text-white font-medium'
                      : 'text-surface-foreground hover:bg-surface-muted'
                  )}
                >
                  <div className="flex items-center gap-3 truncate">
                    {item.icon && (
                      <span className={cn('shrink-0 w-4 h-4', isSelected ? 'text-white' : 'text-surface-foreground-subtle')}>
                        {item.icon}
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                    {item.category && (
                      <span
                        className={cn(
                          'text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider',
                          isSelected ? 'bg-white/20 text-white' : 'bg-surface-muted text-surface-foreground-subtle'
                        )}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.shortcut && (
                      <Kbd size="sm" className={isSelected ? 'bg-white/20 text-white border-white/30' : ''}>
                        {item.shortcut}
                      </Kbd>
                    )}
                    <ArrowRight className={cn('w-3.5 h-3.5', isSelected ? 'text-white' : 'text-surface-foreground-subtle')} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer instructions */}
        <div className="px-4 py-2 border-t border-surface-border bg-surface-muted/40 flex items-center justify-between text-[11px] text-surface-foreground-subtle">
          <div className="flex items-center gap-3">
            <span><Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate</span>
            <span><Kbd size="sm">↵</Kbd> to select</span>
          </div>
          <span>Aura Quick Actions</span>
        </div>
      </div>
    </div>
  );
}
