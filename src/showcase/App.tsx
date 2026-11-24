import React, { useState, useMemo } from 'react';
import { COMPONENT_REGISTRY } from './data/componentRegistry';
import { ComponentCategory } from './types';
import { SaasDashboardPage } from './samples/SaasDashboardPage';
import { ElearningDashboardPage } from './samples/ElearningDashboardPage';
import { LandingPage } from './samples/LandingPage';
import { PropsTable } from './components/PropsTable';
import { useTheme, Button, Badge, Input, Kbd } from '@/ui';
import {
  Sun,
  Moon,
  Monitor,
  Search,
  Sparkles,
  Layers,
  LayoutGrid,
  CheckCircle,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  BookOpen,
  Code2,
  DollarSign,
  GraduationCap,
  Globe,
  Sliders,
  ChevronRight,
} from 'lucide-react';

type AppViewMode = 'explorer' | 'saas' | 'elearning' | 'landing';
type ScreenSize = 'full' | 'tablet' | 'mobile';

export function ShowcaseApp() {
  const { theme, toggleTheme } = useTheme();
  const [viewMode, setViewMode] = useState<AppViewMode>('explorer');
  const [activeComponentId, setActiveComponentId] = useState('button');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [screenSize, setScreenSize] = useState<ScreenSize>('full');
  const [dualThemePreview, setDualThemePreview] = useState(false);
  const [ethiopicGlobal, setEthiopicGlobal] = useState(false);

  const categories: string[] = [
    'All',
    'Tokens & Theme',
    'Primitives',
    'Layout & Navigation',
    'Feedback & Overlays',
    'Data Display',
    'Forms & Inputs',
    'Page Sections',
  ];

  const filteredComponents = useMemo(() => {
    return COMPONENT_REGISTRY.filter((c) => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeDoc = useMemo(() => {
    return (
      COMPONENT_REGISTRY.find((c) => c.id === activeComponentId) ||
      COMPONENT_REGISTRY[0]
    );
  }, [activeComponentId]);

  const ComponentToRender = activeDoc.component;

  const screenWidthClass: Record<ScreenSize, string> = {
    full: 'w-full',
    tablet: 'max-w-[768px] mx-auto border-x border-surface-border shadow-2xl',
    mobile: 'max-w-[375px] mx-auto border-x border-surface-border shadow-2xl',
  };

  return (
    <div className={`min-h-screen flex flex-col bg-surface text-surface-foreground ${ethiopicGlobal ? 'font-sans' : ''}`}>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface-card/85 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Version */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-accent-500 flex items-center justify-center font-bold text-white shadow-md">
            AU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-tight text-surface-foreground">
                Aura UI
              </span>
              <Badge variant="primary" size="sm" className="hidden sm:inline-flex">
                React 19.2
              </Badge>
            </div>
            <span className="text-[10px] text-surface-foreground-subtle hidden sm:block">
              Tailwind CSS v4 & OKLCH Component Library
            </span>
          </div>
        </div>

        {/* View Mode Nav Switcher */}
        <nav className="flex items-center bg-surface-muted/80 p-1 rounded-xl border border-surface-border overflow-x-auto scrollbar-none">
          <button
            onClick={() => setViewMode('explorer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              viewMode === 'explorer'
                ? 'bg-surface-card text-primary-500 shadow-xs'
                : 'text-surface-foreground-muted hover:text-surface-foreground'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Components ({COMPONENT_REGISTRY.length})</span>
          </button>

          <button
            onClick={() => setViewMode('saas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              viewMode === 'saas'
                ? 'bg-surface-card text-primary-500 shadow-xs'
                : 'text-surface-foreground-muted hover:text-surface-foreground'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>SaaS Fintech (ETB)</span>
          </button>

          <button
            onClick={() => setViewMode('elearning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              viewMode === 'elearning'
                ? 'bg-surface-card text-primary-500 shadow-xs'
                : 'text-surface-foreground-muted hover:text-surface-foreground'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>E-Learning Portal</span>
          </button>

          <button
            onClick={() => setViewMode('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              viewMode === 'landing'
                ? 'bg-surface-card text-primary-500 shadow-xs'
                : 'text-surface-foreground-muted hover:text-surface-foreground'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
        </nav>

        {/* Global Toolbar: Responsive Simulators & Theme */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Responsive Viewport Buttons */}
          <div className="hidden lg:flex items-center bg-surface-muted/60 p-1 rounded-xl border border-surface-border">
            <button
              onClick={() => setScreenSize('full')}
              title="Desktop (100% Width)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                screenSize === 'full' ? 'bg-surface-card text-primary-500 shadow-xs' : 'text-surface-foreground-subtle hover:text-surface-foreground'
              }`}
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScreenSize('tablet')}
              title="Tablet (768px)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                screenSize === 'tablet' ? 'bg-surface-card text-primary-500 shadow-xs' : 'text-surface-foreground-subtle hover:text-surface-foreground'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScreenSize('mobile')}
              title="Mobile (375px)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                screenSize === 'mobile' ? 'bg-surface-card text-primary-500 shadow-xs' : 'text-surface-foreground-subtle hover:text-surface-foreground'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Ethiopic Fallback Flag Toggle */}
          <button
            onClick={() => setEthiopicGlobal(!ethiopicGlobal)}
            title="Toggle Ethiopic Typography Preview (Amharic & Afaan Oromo)"
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              ethiopicGlobal
                ? 'bg-primary-500 text-white border-primary-600'
                : 'bg-surface-muted border-surface-border text-surface-foreground-muted hover:text-surface-foreground'
            }`}
          >
            <span>🇪🇹</span>
            <span className="hidden sm:inline">Ethiopic</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark mode"
            className="p-2 rounded-xl border border-surface-border bg-surface-muted hover:bg-surface-muted/80 text-surface-foreground transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-warning-400" /> : <Moon className="w-4 h-4 text-primary-500" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'saas' && (
        <main className={`flex-1 p-6 sm:p-8 ${screenWidthClass[screenSize]} transition-all`}>
          <SaasDashboardPage />
        </main>
      )}

      {viewMode === 'elearning' && (
        <main className={`flex-1 p-6 sm:p-8 ${screenWidthClass[screenSize]} transition-all`}>
          <ElearningDashboardPage />
        </main>
      )}

      {viewMode === 'landing' && (
        <main className={`flex-1 ${screenWidthClass[screenSize]} transition-all`}>
          <LandingPage onNavigateToExplorer={() => setViewMode('explorer')} />
        </main>
      )}

      {viewMode === 'explorer' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Component Navigation Sidebar */}
          <aside className="w-72 border-r border-surface-border bg-surface-card/60 flex flex-col shrink-0 overflow-hidden">
            {/* Search Input */}
            <div className="p-3.5 border-b border-surface-border">
              <Input
                placeholder="Search 50+ components..."
                size="sm"
                leftIcon={<Search className="w-3.5 h-3.5 text-surface-foreground-subtle" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="p-2 border-b border-surface-border flex gap-1 overflow-x-auto scrollbar-none text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white font-semibold shadow-xs'
                      : 'text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Component List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredComponents.map((doc) => {
                const isActive = doc.id === activeComponentId;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveComponentId(doc.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-primary-500 text-white font-semibold shadow-xs'
                        : 'text-surface-foreground-muted hover:bg-surface-muted hover:text-surface-foreground'
                    }`}
                  >
                    <div className="flex flex-col truncate">
                      <span className="truncate">{doc.name}</span>
                      <span className={`text-[10px] ${isActive ? 'text-primary-100' : 'text-surface-foreground-subtle'}`}>
                        {doc.category}
                      </span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}

              {filteredComponents.length === 0 && (
                <div className="p-6 text-center text-xs text-surface-foreground-subtle">
                  No components match "{searchQuery}"
                </div>
              )}
            </div>
          </aside>

          {/* Right Component Documentation Viewport */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10">
            <div className={`${screenWidthClass[screenSize]} space-y-10 transition-all`}>
              {/* Component Header */}
              <div className="space-y-3 pb-6 border-b border-surface-border">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-surface-foreground tracking-tight">
                      {activeDoc.name}
                    </h1>
                    <Badge variant="primary" size="sm">
                      {activeDoc.category}
                    </Badge>
                  </div>

                  {/* Dual Theme Preview Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDualThemePreview(!dualThemePreview)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        dualThemePreview
                          ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                          : 'bg-surface-card border-surface-border text-surface-foreground-muted hover:text-surface-foreground'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>{dualThemePreview ? 'Single Theme' : 'Side-by-Side Light/Dark'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-surface-foreground-muted max-w-3xl leading-relaxed">
                  {activeDoc.description}
                </p>
              </div>

              {/* Interactive Live Canvas */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-surface-foreground uppercase tracking-wider">
                    Interactive Component Canvas
                  </h3>
                  <span className="text-[11px] text-surface-foreground-subtle">
                    Live React 19 State & Micro-Interactions
                  </span>
                </div>

                {dualThemePreview ? (
                  /* Dual Side-by-Side Preview */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Light preview forced */}
                    <div className="light rounded-3xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-sm space-y-3 text-neutral-900">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                        Light Mode Preview (OKLCH)
                      </span>
                      <div className="pt-2">
                        <ComponentToRender />
                      </div>
                    </div>

                    {/* Dark preview forced */}
                    <div className="dark rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-sm space-y-3 text-neutral-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Dark Mode Preview (OKLCH)
                      </span>
                      <div className="pt-2">
                        <ComponentToRender />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Canvas */
                  <div className="rounded-3xl border border-surface-border bg-surface-card p-6 sm:p-10 shadow-xs overflow-hidden">
                    <ComponentToRender />
                  </div>
                )}
              </section>

              {/* Props Specification Table */}
              {activeDoc.props && activeDoc.props.length > 0 && (
                <section className="space-y-4 pt-4 border-t border-surface-border">
                  <h3 className="text-xs font-semibold text-surface-foreground uppercase tracking-wider">
                    Component Props Specification
                  </h3>
                  <PropsTable props={activeDoc.props} />
                </section>
              )}

              {/* Accessibility & Keyboard Navigation */}
              {(activeDoc.wcagNotes || activeDoc.keyboardShortcuts) && (
                <section className="space-y-4 p-6 rounded-2xl bg-surface-muted/30 border border-surface-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    <h3 className="text-xs font-semibold text-surface-foreground uppercase tracking-wider">
                      Accessibility (WAI-ARIA & WCAG AA)
                    </h3>
                  </div>

                  {activeDoc.wcagNotes && (
                    <p className="text-xs text-surface-foreground-muted leading-relaxed">
                      {activeDoc.wcagNotes}
                    </p>
                  )}

                  {activeDoc.keyboardShortcuts && activeDoc.keyboardShortcuts.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-semibold text-surface-foreground-subtle uppercase tracking-wider block">
                        Keyboard Navigation:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeDoc.keyboardShortcuts.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-card border border-surface-border text-xs font-mono text-surface-foreground">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
