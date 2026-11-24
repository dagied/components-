import React, { useState, Activity } from 'react';
import { cn } from '@/ui/utils/cn';

export type TabsVariant = 'line' | 'pills' | 'enclosed';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (tabId: string) => void;
  variant?: TabsVariant;
  fullWidth?: boolean;
  preserveState?: boolean;
  className?: string;
}

export function Tabs({
  tabs,
  value,
  defaultValue,
  onChange,
  variant = 'line',
  fullWidth = false,
  preserveState = true,
  className,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultValue || tabs[0]?.id || '');
  const activeTabId = value !== undefined ? value : internalTab;

  const handleTabClick = (tabId: string) => {
    if (value === undefined) {
      setInternalTab(tabId);
    }
    onChange?.(tabId);
  };

  const variantStyles: Record<TabsVariant, { list: string; tab: (isActive: boolean) => string }> = {
    line: {
      list: 'border-b border-surface-border gap-6',
      tab: (isActive) =>
        cn(
          'pb-3 pt-1 text-xs font-medium border-b-2 transition-colors -mb-[1px]',
          isActive
            ? 'border-primary-500 text-primary-500 font-semibold'
            : 'border-transparent text-surface-foreground-muted hover:text-surface-foreground hover:border-surface-border'
        ),
    },
    pills: {
      list: 'p-1 bg-surface-muted rounded-xl gap-1',
      tab: (isActive) =>
        cn(
          'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
          isActive
            ? 'bg-surface-card text-surface-foreground shadow-xs font-semibold'
            : 'text-surface-foreground-muted hover:text-surface-foreground'
        ),
    },
    enclosed: {
      list: 'border-b border-surface-border gap-1',
      tab: (isActive) =>
        cn(
          'px-4 py-2 text-xs font-medium rounded-t-lg border-t border-l border-r transition-colors -mb-[1px]',
          isActive
            ? 'border-surface-border bg-surface-card text-surface-foreground font-semibold'
            : 'border-transparent text-surface-foreground-muted hover:bg-surface-muted/50'
        ),
    },
  };

  return (
    <div className={cn('w-full flex flex-col', className)}>
      {/* Tabs Header List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn('flex items-center overflow-x-auto no-scrollbar select-none', variantStyles[variant].list)}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              className={cn(
                'flex items-center gap-2 cursor-pointer focus-ring shrink-0',
                variantStyles[variant].tab(isActive),
                fullWidth && 'flex-1 justify-center',
                tab.disabled && 'opacity-40 cursor-not-allowed hover:text-surface-foreground-muted'
              )}
            >
              {tab.icon && <span className="w-3.5 h-3.5 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span className="shrink-0">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      {/* Panels with React 19.2 <Activity> state preservation */}
      <div className="pt-4">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          if (!tab.content) return null;

          if (preserveState && typeof Activity !== 'undefined') {
            return (
              <Activity key={tab.id} mode={isActive ? 'visible' : 'hidden'}>
                <div
                  role="tabpanel"
                  id={`panel-${tab.id}`}
                  aria-labelledby={`tab-${tab.id}`}
                  className={cn(!isActive && 'hidden')}
                >
                  {tab.content}
                </div>
              </Activity>
            );
          }

          if (!isActive) return null;

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              className="animate-in fade-in-50 duration-150"
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
