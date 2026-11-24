import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Sparkles, Quote } from 'lucide-react';

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  brandLogo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatarUrl?: string;
  };
  children: React.ReactNode;
  footerLinks?: { label: string; href: string }[];
}

export function AuthLayout({
  brandName = 'Aura UI',
  brandLogo,
  title = 'Welcome back',
  subtitle = 'Please enter your credentials to access your account.',
  testimonial = {
    quote: 'Aura UI cut our dashboard delivery timeline by 65%. The OKLCH color design system and accessible primitives are top-notch.',
    author: 'Dagmawi B.',
    role: 'Lead Full-Stack Engineer, Addis Ababa',
  },
  children,
  footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Support & Docs', href: '#' },
  ],
  className,
  ...props
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-surface text-surface-foreground',
        className
      )}
      {...props}
    >
      {/* Decorative Showcase Panel (visible on lg+) */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-950 text-white">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/30 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-500/25 blur-[100px] rounded-full pointer-events-none" />

        {/* Top brand header */}
        <div className="relative z-10 flex items-center gap-3">
          {brandLogo || (
            <div className="h-10 w-10 rounded-xl bg-primary-500/30 border border-primary-400/40 flex items-center justify-center font-display font-bold text-white shadow-md">
              <Sparkles className="w-5 h-5 text-accent-300" />
            </div>
          )}
          <span className="font-display font-extrabold text-xl tracking-tight">{brandName}</span>
        </div>

        {/* Mid graphic or slogan */}
        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/15 text-accent-200">
            Enterprise Ready React 19 Design System
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight">
            Build modern interfaces for African & Global tech ecosystems.
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Engineered with WCAG AA compliance, Tailwind v4 OKLCH tokens, and Ethiopic script typography fallbacks.
          </p>
        </div>

        {/* Bottom Testimonial */}
        {testimonial && (
          <div className="relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
            <Quote className="w-6 h-6 text-accent-400 opacity-60" />
            <p className="text-xs italic text-neutral-200 leading-relaxed">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3 pt-1">
              {testimonial.avatarUrl ? (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.author}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold text-xs text-white">
                  {testimonial.author.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-white">{testimonial.author}</p>
                <p className="text-[11px] text-neutral-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Authentication Form Panel */}
      <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:hidden">
            {brandLogo || (
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
            )}
            <span className="font-display font-bold text-lg">{brandName}</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-8 space-y-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-surface-foreground tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-surface-foreground-muted">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 shadow-sm">
            {children}
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks && footerLinks.length > 0 && (
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-surface-border/50 text-xs text-surface-foreground-subtle">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-surface-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
