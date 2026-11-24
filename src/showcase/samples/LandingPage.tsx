import React, { useState } from 'react';
import {
  Hero,
  FeatureGrid,
  PricingTable,
  Testimonials,
  FAQ,
  CtaBanner,
  Footer,
  Badge,
  Button,
} from '@/ui';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';

export function LandingPage({
  onNavigateToExplorer,
}: {
  onNavigateToExplorer?: () => void;
}) {

  const testimonialsList = [
    {
      id: '1',
      name: 'Dagmawi B.',
      role: 'Principal Frontend Architect',
      company: 'Addis Tech Hub',
      quote: 'Aura UI gives us the speed of modern primitives with the elegance of OKLCH colors and seamless support for Ethiopian script typography.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Bethlehem Tadesse',
      role: 'Head of Product',
      company: 'Fintech Ethiopia',
      quote: 'Integrating the pre-built Telebirr payment widgets and transaction data tables saved our engineering team 3 weeks of custom dev time.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Samuel Kiprono',
      role: 'CTO & Co-founder',
      company: 'Rift Valley Innovations',
      quote: 'The design aesthetic is clean, fast, and remarkably responsive across Android phones and 4K desktop screens. Best React 19 UI kit available.',
      rating: 5,
    },
  ];

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Is Aura Design System fully compatible with React 19 and React Compiler?',
      answer: 'Yes! Aura UI is built specifically for React 19.2+. It adopts ref-as-prop, form Actions, zero forwardRef overhead, and passes automatic memoization with babel-plugin-react-compiler without manual useMemo/useCallback bloat.',
    },
    {
      id: 'faq-2',
      question: 'How does Tailwind CSS v4 OKLCH token styling work?',
      answer: 'We use Tailwind v4 CSS-first @theme specifications. Rather than a complex tailwind.config.js, all colors are defined with perceptually uniform OKLCH values in globals.css. Swapping 3 CSS variables instantly rebrands your whole app.',
    },
    {
      id: 'faq-3',
      question: 'What Ethiopic typography fallback is supported?',
      answer: 'Aura UI includes native fallback typography for Noto Sans Ethiopic, Abyssinica SIL, and Nyala. This guarantees flawless readability for Ge’ez, Amharic, Afaan Oromo, and Tigrinya across all devices without font clipping.',
    },
    {
      id: 'faq-4',
      question: 'Can I copy and paste individual components into existing apps?',
      answer: 'Absolutely. Every component is completely modular, self-contained, and copy-pasteable. Dependencies are clearly defined (Radix UI primitives and Motion).',
    },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <Hero
        badge="Aura UI v1.0 • React 19.2 + Tailwind CSS v4"
        title={
          <>
            Build stunning web apps <br />
            <span className="bg-gradient-to-r from-primary-500 via-accent-400 to-primary-600 bg-clip-text text-transparent">
              with uncompromised precision
            </span>
          </>
        }
        subtitle="A production-grade React 19 component library engineered with OKLCH design tokens, Radix UI primitives, Motion animations, WCAG AA compliance, and native Ethiopic typography."
        primaryCtaText="Explore Component Library"
        onPrimaryCtaClick={onNavigateToExplorer}
        secondaryCtaText="View GitHub Repo"
        onSecondaryCtaClick={() => window.open('https://github.com', '_blank')}
        metrics={[
          { label: 'Production Components', value: '60+' },
          { label: 'WCAG AA Compliance', value: '100%' },
          { label: 'Ethiopic Typography', value: 'Amharic/Oromo' },
          { label: 'Zero Config Build', value: 'Vite 6' },
        ]}
      />

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureGrid />
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingTable />
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials
          items={testimonialsList}
          title="Loved by engineering leads across Africa and worldwide"
          subtitle="Discover how software organizations ship 3x faster with Aura Design System."
        />
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQ
          items={faqItems}
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about adopting Aura UI in your organization."
        />
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaBanner
          title="Ready to build your next world-class web application?"
          subtitle="Explore the interactive component canvas, test dark mode in real-time, and copy clean TypeScript code directly into your project."
          primaryActionText="Open Component Explorer"
          onPrimaryAction={onNavigateToExplorer}
          secondaryActionText="Read Documentation"
          onSecondaryAction={onNavigateToExplorer}
        />
      </div>

      {/* Footer */}
      <Footer
        description="Production-grade, accessible React 19 component library crafted for modern global digital platforms."
      />
    </div>
  );
}
