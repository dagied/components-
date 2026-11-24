import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Button } from '@/ui/primitives/button/Button';
import { Badge } from '@/ui/primitives/badge/Badge';
import { Card } from '@/ui/data-display/card/Card';
import { Check } from 'lucide-react';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceMonthlyUSD: number;
  priceAnnualUSD: number;
  priceMonthlyETB: number;
  priceAnnualETB: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  onSelectTier?: (tier: PricingTier, cycle: 'monthly' | 'annual', currency: 'USD' | 'ETB') => void;
}

export function PricingTable({
  title = 'Predictable, Transparent Pricing',
  subtitle = 'Choose a plan tailored to your team scale. Switch between Ethiopian Birr (ETB) and USD anytime.',
  tiers = [
    {
      id: 'starter',
      name: 'Starter Developer',
      description: 'Ideal for freelance developers, solo makers, and side projects.',
      priceMonthlyUSD: 0,
      priceAnnualUSD: 0,
      priceMonthlyETB: 0,
      priceAnnualETB: 0,
      features: [
        'All 60+ UI Components',
        'Tailwind CSS v4 Tokens',
        'Community Discord Access',
        'Free Lifetime Updates',
      ],
      ctaText: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Professional Team',
      description: 'Perfect for fast-growing startups and digital agency teams.',
      priceMonthlyUSD: 29,
      priceAnnualUSD: 24,
      priceMonthlyETB: 3500,
      priceAnnualETB: 2800,
      popular: true,
      features: [
        'Everything in Starter',
        'Figma Design System Kit',
        'Priority Technical Support',
        'Commercial SaaS License',
        'Recharts Dashboard Templates',
        'Ethiopic Localization Pack',
      ],
      ctaText: 'Start 14-Day Free Trial',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Organization',
      description: 'For banks, telecom enterprises, and large engineering teams.',
      priceMonthlyUSD: 99,
      priceAnnualUSD: 79,
      priceMonthlyETB: 12000,
      priceAnnualETB: 9500,
      features: [
        'Everything in Professional',
        'Unlimited Team Seats',
        'Custom Design Token Theming',
        'Dedicated Solutions Architect',
        'Custom Security Audit Report',
        '99.9% Uptime SLA',
      ],
      ctaText: 'Contact Enterprise Sales',
    },
  ],
  onSelectTier,
  className,
  ...props
}: PricingTableProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('ETB');

  return (
    <div className={cn('py-12 sm:py-16 space-y-12', className)} {...props}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-foreground">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-surface-foreground-muted leading-relaxed">
          {subtitle}
        </p>

        {/* Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Monthly / Annual Toggle */}
          <div className="flex items-center p-1 bg-surface-muted rounded-xl border border-surface-border text-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer',
                billingCycle === 'monthly'
                  ? 'bg-surface-card text-surface-foreground shadow-xs font-semibold'
                  : 'text-surface-foreground-muted hover:text-surface-foreground'
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer',
                billingCycle === 'annual'
                  ? 'bg-surface-card text-surface-foreground shadow-xs font-semibold'
                  : 'text-surface-foreground-muted hover:text-surface-foreground'
              )}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-success-500/15 text-success-500 font-bold">
                Save 20%
              </span>
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center p-1 bg-surface-muted rounded-xl border border-surface-border text-xs">
            <button
              type="button"
              onClick={() => setCurrency('ETB')}
              className={cn(
                'px-2.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer',
                currency === 'ETB'
                  ? 'bg-surface-card text-primary-500 shadow-xs'
                  : 'text-surface-foreground-muted hover:text-surface-foreground'
              )}
            >
              ETB (ብር)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={cn(
                'px-2.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer',
                currency === 'USD'
                  ? 'bg-surface-card text-primary-500 shadow-xs'
                  : 'text-surface-foreground-muted hover:text-surface-foreground'
              )}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {tiers.map((tier) => {
          const isAnnual = billingCycle === 'annual';
          const price =
            currency === 'USD'
              ? isAnnual
                ? tier.priceAnnualUSD
                : tier.priceMonthlyUSD
              : isAnnual
              ? tier.priceAnnualETB
              : tier.priceMonthlyETB;

          return (
            <Card
              key={tier.id}
              className={cn(
                'p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-200',
                tier.popular
                  ? 'border-primary-500/50 shadow-xl shadow-primary-500/10 ring-1 ring-primary-500/30'
                  : 'border-surface-border'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" size="sm" className="shadow-md">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-surface-foreground">{tier.name}</h3>
                  <p className="text-xs text-surface-foreground-muted leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-display text-surface-foreground">
                    {currency === 'USD' ? `$${price}` : `${price.toLocaleString()} ETB`}
                  </span>
                  <span className="text-xs text-surface-foreground-subtle">
                    {price === 0 ? '' : '/month'}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-2 border-t border-surface-border">
                  <span className="text-xs font-semibold text-surface-foreground">Included features:</span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-surface-foreground-muted">
                        <Check className="w-4 h-4 text-primary-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant={tier.popular ? 'primary' : 'outline'}
                  fullWidth
                  size="md"
                  onClick={() => onSelectTier?.(tier, billingCycle, currency)}
                >
                  {tier.ctaText}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
