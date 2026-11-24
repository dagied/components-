import React from 'react';
import { cn } from '@/ui/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  groups: SidebarGroup[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  collapsible?: boolean;
}

export function Sidebar({
  header,
  footer,
  groups,
  isCollapsed = false,
  onToggleCollapse,
  collapsible = true,
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-surface-card border-r border-surface-border transition-all duration-300 ease-in-out shrink-0 select-none z-30',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
      {...props}
    >
      {/* Header */}
      {header && (
        <div className="h-16 flex items-center px-4 border-b border-surface-border overflow-hidden shrink-0">
          {header}
        </div>
      )}

      {/* Collapse Toggle Button */}
      {collapsible && onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-surface-border bg-surface-card text-surface-foreground shadow-sm hover:bg-surface-muted transition-colors z-40 focus-ring cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Groups and Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {group.title && !isCollapsed && (
              <h4 className="px-3 text-[11px] font-semibold text-surface-foreground-subtle tracking-wider uppercase mb-2">
                {group.title}
              </h4>
            )}
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left',
                  item.active
                    ? 'bg-primary-600 text-white shadow-xs font-semibold'
                    : 'text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted',
                  isCollapsed && 'justify-center px-0'
                )}
              >
                <span className={cn('shrink-0 w-4 h-4 flex items-center justify-center', item.active ? 'text-white' : 'text-surface-foreground-subtle')}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!isCollapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div className="p-3 border-t border-surface-border shrink-0 overflow-hidden">
          {footer}
        </div>
      )}
    </aside>
  );
}
