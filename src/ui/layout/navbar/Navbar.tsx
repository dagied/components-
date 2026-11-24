import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
}

export function Navbar({
  brand,
  items = [],
  actions,
  sticky = true,
  className,
  ...props
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'w-full border-b border-surface-border bg-surface/90 backdrop-blur-md z-40 transition-all',
        sticky && 'sticky top-0',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <div className="shrink-0">{brand}</div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                  item.active
                    ? 'text-primary-500 bg-primary-500/10 font-semibold'
                    : 'text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted'
                )}
              >
                {item.icon && <span className="w-3.5 h-3.5">{item.icon}</span>}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {actions}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          {actions}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 text-surface-foreground-muted hover:text-surface-foreground rounded-lg hover:bg-surface-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface px-4 pt-3 pb-5 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                item.active
                  ? 'text-primary-500 bg-primary-500/10 font-semibold'
                  : 'text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted'
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
