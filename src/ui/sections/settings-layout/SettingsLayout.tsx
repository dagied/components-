import React from 'react';
import { cn } from '@/ui/utils/cn';

export interface SettingsNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  description?: string;
}

export interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  navItems: SettingsNavItem[];
  activeId: string;
  onSelectNav: (id: string) => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsLayout({
  title = 'Account Settings',
  description = 'Manage your profile, preferences, security settings, and notifications.',
  navItems,
  activeId,
  onSelectNav,
  actions,
  children,
  className,
  ...props
}: SettingsLayoutProps) {
  return (
    <div className={cn('max-w-6xl mx-auto space-y-8', className)} {...props}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <h1 className="text-2xl font-display font-bold text-surface-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-surface-foreground-muted mt-1">
            {description}
          </p>
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Column */}
        <aside className="md:col-span-1">
          {/* Mobile horizontal pill scroll */}
          <div className="flex md:hidden gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {navItems.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer',
                    active
                      ? 'bg-primary-500 text-white font-semibold'
                      : 'bg-surface-muted text-surface-foreground-muted hover:text-surface-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop vertical navigation */}
          <nav className="hidden md:flex flex-col gap-1">
            {navItems.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer',
                    active
                      ? 'bg-primary-500/10 text-primary-500 font-semibold border-l-2 border-primary-500 pl-3'
                      : 'text-surface-foreground-muted hover:bg-surface-muted hover:text-surface-foreground'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon && (
                      <span className={active ? 'text-primary-500' : 'text-surface-foreground-subtle'}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-muted text-surface-foreground-subtle">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Column */}
        <main className="md:col-span-3 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
