# Aura UI

Aura UI is a reusable React component library and interactive design-system showcase for building modern web applications. It provides reusable UI primitives, layout components, forms, feedback elements, data displays, and complete page sections that can be adapted in any React project.

## Features

- Reusable components organized for copy-paste or project-level reuse
- React 19, TypeScript, Vite, and Tailwind CSS v4
- Light and dark themes with OKLCH design tokens
- Accessible Radix UI primitives
- Responsive desktop, tablet, and mobile previews
- Amharic and Afaan Oromo typography support
- Interactive component documentation and examples
- Real-world SaaS, e-learning, and landing-page samples

## Component Categories

- **Primitives:** buttons, inputs, badges, avatars, switches, sliders, tooltips, and more
- **Layout:** navbar, sidebar, tabs, breadcrumbs, pagination, footer, container, and grid helpers
- **Feedback:** dialogs, drawers, popovers, alerts, toasts, and empty/error states
- **Data display:** cards, tables, charts, timelines, progress indicators, calendars, and steppers
- **Forms:** form fields, login and signup forms, multi-step forms, file uploads, OTP, and search
- **Page sections:** heroes, pricing, testimonials, FAQs, dashboards, course cards, and profile headers

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Verify Showcase Coverage

```bash
npm run verify-showcase
```

## Using Components

Components are exported from the central UI module:

```tsx
import { Button, Card, Input } from "@/ui";
```

To start a component:

```tsx
import { Button } from "@/ui";

export function Example() {
  return (
    <Button variant="primary" size="md">
      Get started
    </Button>
  );
}
```

## Project Structure

```text
src/
  ui/         Reusable design-system components
  showcase/   Interactive documentation and sample applications
  styles/     Global Tailwind CSS and theme tokens
  test/       Component tests
docs/         Project planning and implementation documentation
scripts/      Showcase verification utilities
```

## Interactive Showcase

The showcase includes:

- Component search and category filtering
- Live component previews
- Light and dark mode
- 375px mobile and 768px tablet viewport previews
- Component examples and prop documentation
- Three complete sample pages

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |
| `npm test` | Run the Vitest test suite |
| `npm run verify-showcase` | Verify component showcase coverage |
