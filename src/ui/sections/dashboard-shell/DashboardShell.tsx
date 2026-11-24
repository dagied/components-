import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Sidebar, SidebarGroup, SidebarItem } from '@/ui/layout/sidebar/Sidebar';
import { Navbar, NavItem } from '@/ui/layout/navbar/Navbar';
import { Breadcrumbs, BreadcrumbItem } from '@/ui/layout/breadcrumbs/Breadcrumbs';

export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode;
  navItems?: NavItem[];
  sidebarGroups: SidebarGroup[];
  breadcrumbs?: BreadcrumbItem[];
  navbarActions?: React.ReactNode;
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  children?: React.ReactNode;
}

export function DashboardShell({
  brand,
  navItems = [],
  sidebarGroups,
  breadcrumbs,
  navbarActions,
  sidebarHeader,
  sidebarFooter,
  children,
  className,
  ...props
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn('min-h-screen bg-surface flex flex-col', className)} {...props}>
      {/* Top Navbar */}
      <Navbar
        brand={brand || <span className="font-display font-bold text-lg text-primary-500">Aura Console</span>}
        items={navItems}
        actions={navbarActions}
        sticky
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          groups={sidebarGroups}
          isCollapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          header={sidebarHeader}
          footer={sidebarFooter}
        />

        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-surface">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="px-6 py-3 border-b border-surface-border bg-surface-muted/30">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          <div className="flex-1 p-6 sm:p-8 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
