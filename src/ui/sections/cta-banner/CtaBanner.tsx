import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Button } from '@/ui/primitives/button/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface CtaBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export function CtaBanner({
  title = 'Ready to build your next web application?',
  subtitle = 'Copy modern, accessible React 19 components into your dashboard, portfolio, e-learning portal, or SaaS product today.',
  primaryActionText = 'Get Started Now',
  onPrimaryAction,
  secondaryActionText = 'Explore Documentation',
  onSecondaryAction,
  className,
  ...props
}: CtaBannerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-950 border border-primary-500/30 text-white shadow-2xl',
        className
      )}
      {...props}
    >
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/25 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-accent-400" />
          <span>Production Ready Design System</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onPrimaryAction}
            className="bg-white text-primary-950 hover:bg-neutral-100 active:bg-neutral-200 border-none shadow-lg"
          >
            {primaryActionText}
          </Button>

          {secondaryActionText && (
            <Button
              variant="outline"
              size="lg"
              onClick={onSecondaryAction}
              className="text-white border-white/30 hover:bg-white/10"
            >
              {secondaryActionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
