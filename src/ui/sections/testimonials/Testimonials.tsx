import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Card } from '@/ui/data-display/card/Card';
import { Avatar } from '@/ui/primitives/avatar/Avatar';
import { Rating } from '@/ui/data-display/rating/Rating';
import { Quote } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
}

export interface TestimonialsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  items?: TestimonialItem[];
}

export function Testimonials({
  title = 'Trusted by Innovative Engineering Teams',
  subtitle = 'Discover why founders, design leads, and engineering teams build their core products on Aura UI.',
  items = [
    {
      id: '1',
      name: 'Bethlehem Tilahun',
      role: 'Founder & CEO',
      company: 'soleRebels / Garden of Coffee',
      quote:
        'Aura UI gave our e-commerce and product teams the exact speed, polish, and reliability we needed. The Ethiopic typography fallback works seamlessly for all our local customer communications.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Dawit Alemayehu',
      role: 'Head of Engineering',
      company: 'Addis Fintech Labs',
      quote:
        'The React 19 architecture is ahead of the curve. Replacing older libraries with Aura cut our bundle size in half and saved us months of custom design token work.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Almaz Ayana',
      role: 'Staff Product Designer',
      company: 'Ethio Telecom Innovation Hub',
      quote:
        'The OKLCH color scale and WCAG AA contrast make dark mode look genuinely breathtaking. Our accessibility scores jumped to 100% on day one.',
      rating: 5,
    },
  ],
  className,
  ...props
}: TestimonialsProps) {
  return (
    <div className={cn('py-12 sm:py-16 space-y-12', className)} {...props}>
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-foreground">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-surface-foreground-muted leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item) => (
          <Card key={item.id} hoverable className="p-6 sm:p-7 flex flex-col justify-between relative space-y-4">
            <Quote className="w-8 h-8 text-primary-500/20 absolute top-5 right-5 pointer-events-none" />

            <div className="space-y-3">
              {item.rating && <Rating value={item.rating} readOnly size="sm" />}
              <p className="text-xs sm:text-sm text-surface-foreground-muted leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-surface-border">
              <Avatar name={item.name} src={item.avatarUrl} size="md" />
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-surface-foreground truncate">{item.name}</span>
                <span className="text-[11px] text-surface-foreground-subtle truncate">
                  {item.role} · <span className="text-primary-500">{item.company}</span>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
