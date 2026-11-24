# Production-Grade Design System & Component Library (`@/ui`)
## Comprehensive Architecture & Implementation Plan

### 1. Overview & Objectives
Build a modern, accessible, high-performance, and copy-pasteable React 19.2+ component library built with Tailwind CSS v4 (`@theme` CSS-first tokens in oklch), Radix UI primitives, Motion (`motion/react`), React Hook Form + Zod, and Recharts. The library includes full light/dark mode with WCAG AA contrast, Ethiopic script typography fallback (Amharic & Afaan Oromo), a rich Storybook-style interactive Showcase application, and 3 full realistic sample pages (SaaS Dashboard, E-Learning Student Platform, Modern Landing Page).

---

### 2. Tech Stack & Verified Versions
- **React**: `^19.0.0` / React 19.2.x with React DOM
- **Vite**: `^6.0.0` + `@vitejs/plugin-react`
- **React Compiler**: `babel-plugin-react-compiler` (no manual useMemo/useCallback needed)
- **Tailwind CSS v4**: `^4.0.0` + `@tailwindcss/vite` (CSS-first, `@import "tailwindcss";`, `@theme` blocks, no `tailwind.config.js`)
- **Radix UI Primitives**: Accessible primitives for Dialog, DropdownMenu, Tabs, Tooltip, Popover, Select, Slider, Switch, Checkbox, Accordion
- **Motion**: `motion/react` (`motion` package)
- **Icons**: `lucide-react`
- **Forms & Validation**: `react-hook-form` + `zod`
- **Utility**: `clsx` + `tailwind-merge` (`cn` helper)
- **Charts**: `recharts`
- **Testing**: `vitest` + `@testing-library/react` + `@testing-library/jest-dom`

---

### 3. Folder Structure
```
c:/Users/dagme/OneDrive/Desktop/New folder/
├── docs/
│   └── PLAN.md
├── src/
│   ├── ui/
│   │   ├── tokens/
│   │   │   ├── tokens.css (oklch colors, shadows, radius, spacing)
│   │   │   ├── ThemeProvider.tsx (light/dark/system, smooth transitions)
│   │   │   └── useTheme.ts
│   │   ├── utils/
│   │   │   └── cn.ts (clsx + tailwind-merge)
│   │   ├── primitives/
│   │   │   ├── button/ (Button.tsx, Button.stories.tsx, Button.test.tsx, index.ts)
│   │   │   ├── icon-button/
│   │   │   ├── input/
│   │   │   ├── textarea/
│   │   │   ├── select/
│   │   │   ├── combobox/
│   │   │   ├── checkbox/
│   │   │   ├── radio/
│   │   │   ├── switch/
│   │   │   ├── slider/
│   │   │   ├── badge/
│   │   │   ├── avatar/
│   │   │   ├── tag/
│   │   │   ├── tooltip/
│   │   │   ├── spinner/
│   │   │   ├── skeleton/
│   │   │   ├── divider/
│   │   │   └── kbd/
│   │   ├── layout/
│   │   │   ├── navbar/
│   │   │   ├── sidebar/
│   │   │   ├── breadcrumbs/
│   │   │   ├── tabs/
│   │   │   ├── pagination/
│   │   │   ├── footer/
│   │   │   ├── container/
│   │   │   ├── grid/
│   │   │   ├── stack/
│   │   │   └── command-palette/
│   │   ├── feedback/
│   │   │   ├── modal/
│   │   │   ├── drawer/
│   │   │   ├── dropdown-menu/
│   │   │   ├── popover/
│   │   │   ├── toast/
│   │   │   ├── alert/
│   │   │   ├── confirm-dialog/
│   │   │   ├── empty-state/
│   │   │   ├── error-state/
│   │   │   └── not-found/
│   │   ├── data-display/
│   │   │   ├── card/
│   │   │   ├── stat-card/
│   │   │   ├── data-table/
│   │   │   ├── accordion/
│   │   │   ├── timeline/
│   │   │   ├── progress-bar/
│   │   │   ├── circular-progress/
│   │   │   ├── stepper/
│   │   │   ├── rating/
│   │   │   ├── calendar/
│   │   │   ├── line-chart/
│   │   │   ├── bar-chart/
│   │   │   └── donut-chart/
│   │   ├── forms/
│   │   │   ├── form-field/
│   │   │   ├── login-form/
│   │   │   ├── signup-form/
│   │   │   ├── multi-step-form/
│   │   │   ├── file-upload/
│   │   │   ├── otp-input/
│   │   │   └── search-bar/
│   │   ├── sections/
│   │   │   ├── hero/
│   │   │   ├── feature-grid/
│   │   │   ├── pricing-table/
│   │   │   ├── testimonials/
│   │   │   ├── faq/
│   │   │   ├── cta-banner/
│   │   │   ├── dashboard-shell/
│   │   │   ├── auth-layout/
│   │   │   ├── settings-layout/
│   │   │   ├── course-card/
│   │   │   └── profile-header/
│   │   └── index.ts (central re-export)
│   ├── showcase/
│   │   ├── components/ (Showcase layout, sidebar, header, code-blocks, prop tables)
│   │   ├── pages/ (Individual documentation page for EVERY component with live canvas, controls, variants, states, real-world examples, props table, code copy, a11y, light/dark dual preview)
│   │   ├── samples/
│   │   │   ├── SaasDashboardPage.tsx
│   │   │   ├── ElearningDashboardPage.tsx
│   │   │   └── LandingPage.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── styles/
│   │   └── globals.css (Tailwind v4 @theme, oklch design tokens, typography)
│   └── test/
├── scripts/
│   └── verify-showcase.ts (Ensures 100% of exported components have dedicated showcase routes)
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

### 4. Design System Tokens (Tailwind CSS v4 & OKLCH)
- **Color Palettes**:
  - Primary (Indigo / Violet blend in OKLCH)
  - Secondary (Slate / Slate-blue in OKLCH)
  - Accent (Cyan / Sky in OKLCH)
  - Success (Emerald in OKLCH)
  - Warning (Amber in OKLCH)
  - Danger (Rose / Crimson in OKLCH)
  - Neutral Scale (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
- **Radii**: `xs: 4px`, `sm: 6px`, `md: 8px`, `lg: 12px`, `xl: 16px`, `2xl: 24px`, `full: 9999px`
- **Shadows**: Soft, multi-layered diffuse shadows for light mode; subtle borders & glow for dark mode
- **Typography**:
  - UI Font: Inter, system-ui
  - Display Font: Outfit / Plus Jakarta Sans
  - Ethiopic Fallback Stack: `"Noto Sans Ethiopic", "Abyssinica SIL", "Nyala", sans-serif` for Amharic and Afaan Oromo compatibility
- **Re-theming**: Modifying 3-4 CSS variables (`--color-primary-600`, `--color-accent-500`, `--radius-md`) instantly rebrands the entire system.

---

### 5. Implementation Phases
1. **Phase 1: Project Setup, Dependencies, & Design Tokens**
   - Initialize Vite + React 19 + TypeScript + Tailwind v4 + React Compiler.
   - Configure `@theme` with oklch tokens, light/dark theme switcher, `cn()` utility.
2. **Phase 2: Core Primitives (19 components)**
   - Button, IconButton, Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, Slider, Badge, Avatar, AvatarGroup, Tag/Chip, Tooltip, Spinner, Skeleton, Divider, Kbd.
3. **Phase 3: Layout, Navigation & Overlays (18 components)**
   - Navbar, Sidebar, Breadcrumbs, Tabs, Pagination, Footer, Container/Grid/Stack, Command Palette.
   - Modal/Dialog, Drawer/Sheet, Dropdown Menu, Popover, Toast, Alert/Banner, Confirm Dialog, Empty State, Error State, 404 Page.
4. **Phase 4: Data Display & Form Systems (20 components)**
   - Card, Stat/KPI Card, Data Table, Accordion, Timeline, Progress Bar, Circular Progress, Stepper, Rating, Calendar/Date Picker, Line Chart, Bar Chart, Donut Chart.
   - Form Field, Login Form, Signup Form, Multi-step Form, File Upload, OTP Input, Search Bar.
5. **Phase 5: Page Sections (11 components)**
   - Hero, Feature Grid, Pricing Table, Testimonials, FAQ, CTA Banner, Dashboard Shell, Auth Layout, Settings Layout, Course Card & Progress Tracker, Profile Header.
6. **Phase 6: Interactive Showcase & 3 Sample Real-World Applications**
   - Showcase with dynamic route per component, interactive Storybook-style controls, side-by-side light & dark preview, states, code copy, and accessibility notes.
   - 3 Complete Production Sample Pages (SaaS Dashboard with ETB & charts, E-Learning Student Dashboard, and High-converting Landing Page).
   - Automated coverage verification script (`verify-showcase.ts`) to ensure 100% component route coverage.
   - Verification across Mobile (375px), Tablet (768px), and Desktop (1280px).
