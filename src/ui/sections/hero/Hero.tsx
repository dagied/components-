import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Button } from '@/ui/primitives/button/Button';
import { Badge } from '@/ui/primitives/badge/Badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  metrics?: { label: string; value: string }[];
}

export function Hero({
  badge = 'Powered by React 19 & Tailwind v4',
  title = (
    <>
      Build world-class web apps <br />
      <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
        faster than ever before
      </span>
    </>
  ),
  subtitle = 'An accessible, high-performance React design system crafted with OKLCH tokens, Radix UI primitives, Motion animations, and seamless dark mode.',
  primaryCtaText = 'Explore Components',
  onPrimaryCtaClick,
  secondaryCtaText = 'View Live Demos',
  onSecondaryCtaClick,
  metrics = [
    { label: 'Production Components', value: '60+' },
    { label: 'WCAG AA Compliance', value: '100%' },
    { label: 'Ethiopian Script Support', value: 'Amharic/Oromo' },
    { label: 'TypeScript Strict', value: '100%' },
  ],
  className,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden py-16 sm:py-24 lg:py-32 flex flex-col items-center text-center',
        className
      )}
      {...props}
    >
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {badge && (
        <Badge
          variant="primary"
          size="md"
          icon={<Sparkles className="w-3.5 h-3.5" />}
          className="mb-6 cursor-default"
        >
          {badge}
        </Badge>
      )}

      <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-surface-foreground leading-tight">
        {title}
      </h1>

      <p className="max-w-2xl mt-6 text-sm sm:text-base lg:text-lg text-surface-foreground-muted leading-relaxed">
        {subtitle}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={onPrimaryCtaClick}
        >
          {primaryCtaText}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onSecondaryCtaClick}
        >
          {secondaryCtaText}
        </Button>
      </div>

      {/* Metrics Row */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 mt-16 pt-12 border-t border-surface-border w-full max-w-4xl">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-surface-foreground">
                {m.value}
              </span>
              <span className="text-xs text-surface-foreground-subtle mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
