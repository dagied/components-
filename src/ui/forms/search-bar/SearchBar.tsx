import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';
import { Search, X, Clock, ArrowRight } from 'lucide-react';

export interface SearchSuggestion {
  id: string;
  title: string;
  category?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  onSearch?: (query: string) => void;
  onSelectSuggestion?: (item: SearchSuggestion) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search courses, components, docs...',
  suggestions = [],
  recentSearches = ['ETB Payment Gateway', 'Ethiopian University Portal', 'React 19 Hooks'],
  onSearch,
  onSelectSuggestion,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-md', className)}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-surface-foreground-subtle pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-9 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface text-surface-foreground placeholder:text-surface-foreground-subtle focus-ring transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 p-0.5 text-surface-foreground-subtle hover:text-surface-foreground rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute z-50 w-full top-full mt-1.5 rounded-xl border border-surface-border bg-surface-card p-2 shadow-xl backdrop-blur-md animate-in fade-in-50 zoom-in-95 duration-150 space-y-2">
          {query ? (
            filteredSuggestions.length > 0 ? (
              <div className="space-y-1">
                <span className="px-2 text-[10px] font-semibold text-surface-foreground-subtle uppercase tracking-wider">
                  Suggestions
                </span>
                {filteredSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectSuggestion?.(item);
                      setQuery(item.title);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-surface-muted cursor-pointer transition-colors"
                  >
                    <span className="text-surface-foreground font-medium">{item.title}</span>
                    {item.category && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-muted text-surface-foreground-subtle">
                        {item.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-surface-foreground-subtle">
                No matching suggestions found.
              </div>
            )
          ) : (
            recentSearches.length > 0 && (
              <div className="space-y-1">
                <span className="px-2 text-[10px] font-semibold text-surface-foreground-subtle uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Recent Searches
                </span>
                {recentSearches.map((term, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setQuery(term);
                      onSearch?.(term);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-surface-muted cursor-pointer text-surface-foreground-muted hover:text-surface-foreground transition-colors"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3 h-3 text-surface-foreground-subtle" />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
