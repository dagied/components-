import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Accordion } from '@/ui/data-display/accordion/Accordion';
import { Search } from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category?: string;
}

export interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

export function FAQ({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about integrating Aura UI into your new or existing frontend projects.',
  items = [
    {
      id: 'faq-1',
      question: 'Is Aura UI completely compatible with React 19 and React Compiler?',
      answer:
        'Yes! Aura UI is built specifically for React 19.2+. It adheres to all modern conventions: no forwardRef boilerplate, native form Actions support, and automatic optimization with babel-plugin-react-compiler without manual useMemo or useCallback.',
      category: 'React 19',
    },
    {
      id: 'faq-2',
      question: 'How does Tailwind CSS v4 CSS-first configuration work?',
      answer:
        'Tailwind v4 removes tailwind.config.js entirely. All custom colors, radius, shadows, and typography tokens are declared directly in src/styles/globals.css inside the @theme block using OKLCH color functions.',
      category: 'Theming',
    },
    {
      id: 'faq-3',
      question: 'How do I customize the brand colors or rebrand the entire library?',
      answer:
        'Changing just 3 CSS variables (--color-primary-500, --color-accent-500, and --radius-md) instantly transforms every button, badge, chart, and input across the entire application.',
      category: 'Theming',
    },
    {
      id: 'faq-4',
      question: 'How does Ethiopic script (Amharic & Afaan Oromo) fallback render?',
      answer:
        'Aura UI includes Noto Sans Ethiopic, Abyssinica SIL, and Nyala in its default sans-serif font stack. Amharic and Afaan Oromo text render with perfect vertical alignment, correct diacritics, and optimal line-height.',
      category: 'Localization',
    },
    {
      id: 'faq-5',
      question: 'Can I copy individual components into my existing Next.js or Vite projects?',
      answer:
        'Absolutely! Every component is structured in its own self-contained folder with explicit TypeScript interfaces, zero unnecessary dependencies, and composable sub-elements.',
      category: 'General',
    },
  ],
  className,
  ...props
}: FAQProps) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      (typeof item.answer === 'string' && item.answer.toLowerCase().includes(search.toLowerCase()))
  );

  const accordionItems = filteredItems.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <div className={cn('py-12 sm:py-16 max-w-3xl mx-auto space-y-8', className)} {...props}>
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-foreground">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-surface-foreground-muted leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-foreground-subtle" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter questions..."
          className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm rounded-xl border border-surface-border bg-surface text-surface-foreground placeholder:text-surface-foreground-subtle focus-ring"
        />
      </div>

      {/* Accordion FAQ */}
      {accordionItems.length > 0 ? (
        <Accordion items={accordionItems} allowMultiple defaultExpanded={['faq-1']} />
      ) : (
        <div className="text-center py-8 text-xs text-surface-foreground-subtle">
          No questions matching your query.
        </div>
      )}
    </div>
  );
}
