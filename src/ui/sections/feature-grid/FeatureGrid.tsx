import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Card } from '@/ui/data-display/card/Card';
import { ArrowRight, Layers, ShieldCheck, Zap, Globe, Cpu, Palette } from 'lucide-react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  linkText?: string;
  href?: string;
}

export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({
  badge = 'Architecture & Design',
  title = 'Engineered for Modern Engineering Teams',
  subtitle = 'Every component is built from the ground up with accessibility, theme flexibility, and modern React 19 standards.',
  features = [
    {
      id: 'react19',
      title: 'React 19.2 Native',
      description: 'Zero forwardRef boilerplate, native form Actions, Activity state preservation, and React Compiler ready.',
      icon: <Cpu className="w-5 h-5 text-primary-500" />,
    },
    {
      id: 'tailwind4',
      title: 'Tailwind CSS v4 & OKLCH',
      description: 'CSS-first @theme block with perceptually uniform OKLCH colors for vibrant light & dark modes.',
      icon: <Palette className="w-5 h-5 text-accent-500" />,
    },
    {
      id: 'radix',
      title: 'Radix UI Primitives',
      description: 'Battle-tested WAI-ARIA accessible primitives for dialogs, dropdowns, tooltips, and tabs.',
      icon: <ShieldCheck className="w-5 h-5 text-success-500" />,
    },
    {
      id: 'motion',
      title: 'Micro-Interactions & Motion',
      description: 'Silky smooth 150-250ms transitions respecting prefers-reduced-motion preferences.',
      icon: <Zap className="w-5 h-5 text-warning-500" />,
    },
    {
      id: 'i18n',
      title: 'Ethiopic & Global i18n',
      description: 'Native fallback typography supporting Noto Sans Ethiopic for Amharic and Afaan Oromo.',
      icon: <Globe className="w-5 h-5 text-primary-500" />,
    },
    {
      id: 'composable',
      title: 'Composable Component APIs',
      description: 'No giant prop lists. Compose subcomponents like Card.Header, Card.Body, and Card.Footer naturally.',
      icon: <Layers className="w-5 h-5 text-accent-500" />,
    },
  ],
  columns = 3,
  className,
  ...props
}: FeatureGridProps) {
  const colStyles = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('py-12 sm:py-16 space-y-12', className)} {...props}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        {badge && (
          <span className="text-xs font-semibold text-primary-500 uppercase tracking-wider">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-foreground">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-surface-foreground-muted leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className={cn('grid gap-6', colStyles[columns])}>
        {features.map((item) => (
          <Card key={item.id} hoverable className="p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted border border-surface-border">
                {item.icon}
              </div>
              <h4 className="text-sm font-semibold text-surface-foreground">{item.title}</h4>
              <p className="text-xs text-surface-foreground-muted leading-relaxed">
                {item.description}
              </p>
            </div>
            {item.linkText && (
              <a
                href={item.href || '#'}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:underline pt-2"
              >
                <span>{item.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
