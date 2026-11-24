import React from 'react';
import { cn } from '@/ui/utils/cn';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  copyright?: string;
  bottomLinks?: { label: string; href: string }[];
}

export function Footer({
  brand,
  description = 'Building world-class digital experiences for developers and modern enterprises in Africa and beyond.',
  columns = [
    {
      title: 'Product',
      links: [
        { label: 'Components', href: '#components' },
        { label: 'Documentation', href: '#docs' },
        { label: 'Figma Kit', href: '#figma' },
        { label: 'Changelog', href: '#changelog' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'E-Commerce', href: '#ecommerce' },
        { label: 'EdTech & Learning', href: '#edtech' },
        { label: 'SaaS Dashboards', href: '#saas' },
        { label: 'FinTech (ETB)', href: '#fintech' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Discord', href: '#discord' },
        { label: 'Addis Tech Hub', href: '#addis' },
        { label: 'Twitter/X', href: '#twitter' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'License', href: '#license' },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Aura Design System. Built in Addis Ababa, Ethiopia. All rights reserved.`,
  bottomLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookies', href: '#cookies' },
  ],
  className,
  ...props
}: FooterProps) {
  return (
    <footer className={cn('w-full border-t border-surface-border bg-surface-card', className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand & info */}
          <div className="lg:col-span-2 space-y-4">
            {brand || (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-bold text-white text-xs">
                  AU
                </div>
                <span className="font-display font-bold text-base tracking-tight text-surface-foreground">
                  Aura UI
                </span>
              </div>
            )}
            <p className="text-xs text-surface-foreground-muted leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h5 className="text-xs font-semibold text-surface-foreground uppercase tracking-wider">
                {col.title}
              </h5>
              <ul className="space-y-2">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-xs text-surface-foreground-muted hover:text-primary-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-foreground-subtle">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((item, i) => (
              <a key={i} href={item.href} className="hover:text-surface-foreground transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
