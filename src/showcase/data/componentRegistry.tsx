import React, { useState } from 'react';
import { ComponentDoc } from '../types';
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  Combobox,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Badge,
  Avatar,
  AvatarGroup,
  Tag,
  Tooltip,
  Spinner,
  Skeleton,
  Divider,
  Kbd,
  Navbar,
  Sidebar,
  Breadcrumbs,
  Tabs,
  Pagination,
  Footer,
  Container,
  Grid,
  Stack,
  CommandPalette,
  Modal,
  Drawer,
  DropdownMenu,
  Popover,
  ToastProvider,
  useToast,
  Alert,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  NotFoundPage,
  Card,
  StatCard,
  DataTable,
  Accordion,
  Timeline,
  ProgressBar,
  CircularProgress,
  Stepper,
  Rating,
  Calendar,
  LineChart,
  BarChart,
  DonutChart,
  FormField,
  LoginForm,
  SignupForm,
  MultiStepForm,
  FileUpload,
  OtpInput,
  SearchBar,
  Hero,
  FeatureGrid,
  PricingTable,
  Testimonials,
  FAQ,
  CtaBanner,
  DashboardShell,
  AuthLayout,
  SettingsLayout,
  CourseCard,
  ProfileHeader,
  useTheme,
} from '@/ui';
import {
  Sparkles,
  Heart,
  Search,
  Bell,
  Settings,
  User,
  Plus,
  ArrowRight,
  ShieldCheck,
  Check,
  Globe,
  Sliders,
  DollarSign,
  TrendingUp,
  Folder,
  Layers,
  FileText,
  Mail,
  Lock,
} from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

// ==========================================
// 1. TOKENS & THEME DEMOS
// ==========================================

function TokensDemo() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-surface-muted/40 border border-surface-border flex items-center justify-between">
        <div>
          <h4 className="font-display font-bold text-sm text-surface-foreground">Active Theme: {theme.toUpperCase()}</h4>
          <p className="text-xs text-surface-foreground-muted">Tailwind CSS v4 CSS-first tokens using perceptually uniform OKLCH.</p>
        </div>
        <Button variant="primary" size="sm" onClick={toggleTheme}>Toggle Mode</Button>
      </div>

      <div>
        <h5 className="text-xs font-semibold text-surface-foreground-subtle mb-3 uppercase tracking-wider">OKLCH Brand Swatches</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {[
            { label: 'Primary 500', color: 'bg-primary-500' },
            { label: 'Primary 600', color: 'bg-primary-600' },
            { label: 'Accent 500', color: 'bg-accent-500' },
            { label: 'Success 500', color: 'bg-success-500' },
            { label: 'Warning 500', color: 'bg-warning-500' },
            { label: 'Danger 500', color: 'bg-danger-500' },
          ].map((c) => (
            <div key={c.label} className="p-3 rounded-xl border border-surface-border bg-surface-card space-y-2">
              <div className={`h-12 w-full rounded-lg ${c.color} shadow-xs`} />
              <span className="text-[11px] font-mono font-medium text-surface-foreground block">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EthiopicTypographyDemo() {
  const [scriptMode, setScriptMode] = useState<'both' | 'amharic' | 'oromo'>('both');
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button variant={scriptMode === 'both' ? 'primary' : 'outline'} size="sm" onClick={() => setScriptMode('both')}>
          All Scripts
        </Button>
        <Button variant={scriptMode === 'amharic' ? 'primary' : 'outline'} size="sm" onClick={() => setScriptMode('amharic')}>
          Amharic (አማርኛ)
        </Button>
        <Button variant={scriptMode === 'oromo' ? 'primary' : 'outline'} size="sm" onClick={() => setScriptMode('oromo')}>
          Afaan Oromoo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(scriptMode === 'both' || scriptMode === 'amharic') && (
          <div className="p-6 rounded-2xl border border-surface-border bg-surface-card space-y-3">
            <Badge variant="primary" size="sm">አማርኛ • Amharic</Badge>
            <h3 className="text-xl font-bold font-display text-surface-foreground">የኦራ ዲዛይን ሲስተም ለዘመናዊ የዌብ መተግበሪያዎች</h3>
            <p className="text-xs text-surface-foreground-muted leading-relaxed">
              ይህ ኮምፖነንት በኖቶ ሳንስ ኢትዮፒክ (Noto Sans Ethiopic) ቅርጸ-ቁምፊ የተደገፈ ሲሆን በሁሉም ስክሪኖች ላይ ያለ ምንም መዛባት በግልጽ እንዲነበብ ተደርጎ የተሰራ ነው።
            </p>
          </div>
        )}
        {(scriptMode === 'both' || scriptMode === 'oromo') && (
          <div className="p-6 rounded-2xl border border-surface-border bg-surface-card space-y-3">
            <Badge variant="outline" size="sm">Afaan Oromoo</Badge>
            <h3 className="text-xl font-bold font-display text-surface-foreground">Sirna Diizaayinii Aura Ammayyaawaa</h3>
            <p className="text-xs text-surface-foreground-muted leading-relaxed">
              Sirni diizaayinii kun teeknooloojii ammayyaa React 19 fi Tailwind CSS v4 irratti kan ijaarame yoo ta'u, afaanota hundaaf mijataa dha.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. PRIMITIVE DEMOS
// ==========================================

function ButtonDemo() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 p-3 bg-surface-muted/40 rounded-xl border border-surface-border text-xs">
        <span className="font-semibold text-surface-foreground">Controls:</span>
        <div className="flex gap-1">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-2.5 py-1 rounded-md font-medium uppercase ${size === s ? 'bg-primary-600 text-white' : 'bg-surface-card text-surface-foreground'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setLoading(!loading)}
          className={`px-2.5 py-1 rounded-md font-medium ${loading ? 'bg-warning-500 text-white' : 'bg-surface-card text-surface-foreground'}`}
        >
          {loading ? 'Stop Loading' : 'Test Loading'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size={size} isLoading={loading}>Primary Button</Button>
        <Button variant="secondary" size={size} isLoading={loading}>Secondary</Button>
        <Button variant="outline" size={size} isLoading={loading}>Outline</Button>
        <Button variant="ghost" size={size} isLoading={loading}>Ghost</Button>
        <Button variant="danger" size={size} isLoading={loading}>Danger</Button>
        <Button variant="primary" size={size} rightIcon={<ArrowRight className="w-4 h-4" />}>
          With Icon
        </Button>
        <Button variant="primary" size={size} disabled>Disabled</Button>
      </div>

      <CodeBlock code={`<Button variant="primary" size="${size}" ${loading ? 'isLoading ' : ''}rightIcon={<ArrowRight />}>Explore Aura UI</Button>`} />
    </div>
  );
}

function IconButtonDemo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <IconButton icon={<Search className="w-4 h-4" />} variant="primary" size="sm" aria-label="Search" />
        <IconButton icon={<Bell className="w-4 h-4" />} variant="primary" size="md" aria-label="Notifications" />
        <IconButton icon={<Settings className="w-4 h-4" />} variant="secondary" size="md" aria-label="Settings" />
        <IconButton icon={<Heart className="w-4 h-4" />} variant="outline" size="md" aria-label="Favorite" />
        <IconButton icon={<User className="w-5 h-5" />} variant="ghost" size="lg" aria-label="Profile" />
      </div>
      <CodeBlock code={`<IconButton icon={<Bell className="w-4 h-4" />} variant="primary" size="md" aria-label="Notifications" />`} />
    </div>
  );
}

function InputDemo() {
  const [val, setVal] = useState('Dagmawi B.');
  const [hasError, setHasError] = useState(false);
  return (
    <div className="space-y-6 max-w-md">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setHasError(!hasError)}>
          {hasError ? 'Clear Error' : 'Simulate Validation Error'}
        </Button>
      </div>
      <Input
        label="Full Name / ስም"
        placeholder="Enter your full name..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        leftIcon={<User className="w-4 h-4 text-surface-foreground-subtle" />}
        error={hasError ? 'Please enter a valid legal name in English or Amharic.' : undefined}
        helperText="Used for certification and official tax invoices."
      />
      <CodeBlock code={`<Input\n  label="Full Name / ስም"\n  leftIcon={<User />}\n  placeholder="Enter your full name..."\n/>`} />
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <Textarea
        label="Project Specification / መግለጫ"
        placeholder="Describe the architectural goals or component needs..."
        rows={4}
        helperText="Supports Markdown & Ethiopic scripts."
      />
    </div>
  );
}

function SelectDemo() {
  const [city, setCity] = useState('addis');
  return (
    <div className="space-y-4 max-w-xs">
      <Select
        label="Ethiopian Operational Hub"
        value={city}
        onChange={setCity}
        options={[
          { value: 'addis', label: 'Addis Ababa (አዲስ አበባ)' },
          { value: 'hawassa', label: 'Hawassa (ሐዋሳ)' },
          { value: 'diredawa', label: 'Dire Dawa (ድሬዳዋ)' },
          { value: 'adama', label: 'Adama (አዳማ)' },
          { value: 'bahirdar', label: 'Bahir Dar (ባሕር ዳር)' },
        ]}
      />
    </div>
  );
}

function ComboboxDemo() {
  const [selected, setSelected] = useState('react');
  return (
    <div className="space-y-4 max-w-xs">
      <Combobox
        label="Primary Technical Framework"
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'react', label: 'React 19.2 + Compiler' },
          { value: 'tailwind', label: 'Tailwind CSS v4 OKLCH' },
          { value: 'radix', label: 'Radix Accessible Primitives' },
          { value: 'motion', label: 'Motion Micro-Animations' },
          { value: 'go', label: 'Go High-Throughput gRPC' },
        ]}
      />
    </div>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="space-y-4">
      <Checkbox
        label="Enable WCAG AA high-contrast OKLCH luminance"
        description="Guarantees 4.5:1 text-to-background contrast across light & dark themes."
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
}

function RadioDemo() {
  const [selected, setSelected] = useState('monthly');
  return (
    <div className="space-y-4">
      <RadioGroup
        label="Billing Frequency"
        value={selected}
        onChange={setSelected}
      >
        <Radio value="monthly" label="Monthly Billing" description="Standard billing, cancel anytime." />
        <Radio value="annual" label="Annual Billing (Save 20%)" description="Billed annually with enterprise SLA." />
      </RadioGroup>
    </div>
  );
}

function SwitchDemo() {
  const [active, setActive] = useState(true);
  return (
    <div className="space-y-4">
      <Switch
        label="Ethiopic Font Fallback Optimization"
        description="Preload Noto Sans Ethiopic and Abyssinica SIL web fonts."
        checked={active}
        onChange={setActive}
      />
    </div>
  );
}

function SliderDemo() {
  const [val, setVal] = useState(65);
  return (
    <div className="space-y-4 max-w-sm">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-surface-foreground-muted">OKLCH Chroma Level</span>
        <span className="text-primary-500 font-bold">{val}%</span>
      </div>
      <Slider value={val} min={0} max={100} step={1} onChange={setVal} />
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge variant="primary" size="md">Primary</Badge>
        <Badge variant="secondary" size="md">Secondary</Badge>
        <Badge variant="success" size="md">Live Online</Badge>
        <Badge variant="warning" size="md">Review Needed</Badge>
        <Badge variant="danger" size="md">Critical Alert</Badge>
        <Badge variant="outline" size="md">v1.0.0 Stable</Badge>
      </div>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name="Dagmawi B." size="xs" status="online" />
        <Avatar name="Bethlehem T." size="sm" status="online" />
        <Avatar name="Abebe Kebede" size="md" status="away" />
        <Avatar name="Yohannes H." size="lg" status="busy" />
        <Avatar name="Hiwot Assefa" size="xl" status="online" />
      </div>

      <div className="pt-2">
        <span className="text-xs font-semibold text-surface-foreground-subtle block mb-2">Avatar Group:</span>
        <AvatarGroup max={4}>
          <Avatar name="Dagmawi B." />
          <Avatar name="Bethlehem T." />
          <Avatar name="Samuel K." />
          <Avatar name="Chaltu G." />
          <Avatar name="Dawit M." />
          <Avatar name="Almaz A." />
        </AvatarGroup>
      </div>
    </div>
  );
}

function TagDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="primary">React 19</Tag>
      <Tag variant="default">Tailwind CSS v4</Tag>
      <Tag variant="outline" onRemove={() => alert('Removed tag')}>Ethiopic</Tag>
      <Tag variant="primary" icon={<Sparkles className="w-3 h-3" />}>OKLCH</Tag>
    </div>
  );
}

function TooltipDemo() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Tooltip content="WCAG AA Compliant OKLCH color token system">
        <Button variant="outline" size="sm">Hover to reveal tooltip</Button>
      </Tooltip>
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" variant="primary" />
      <Spinner size="md" variant="primary" />
      <Spinner size="lg" variant="primary" />
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className="space-y-3 max-w-sm">
      <Skeleton variant="rectangular" className="h-32 w-full rounded-2xl" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
  );
}

function DividerDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <p className="text-xs text-surface-foreground-muted">Content above horizontal separator</p>
      <Divider label="OR WITH MEMO" />
      <p className="text-xs text-surface-foreground-muted">Content below horizontal separator</p>
    </div>
  );
}

function KbdDemo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-surface-foreground-muted">Quick Search Command:</span>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  );
}

// ==========================================
// 3. LAYOUT & NAVIGATION DEMOS
// ==========================================

function NavbarDemo() {
  return (
    <div className="rounded-2xl border border-surface-border overflow-hidden">
      <Navbar
        brand={<span className="font-display font-bold text-base text-primary-500">Aura UI</span>}
        items={[
          { label: 'Documentation', href: '#', active: true },
          { label: 'Components', href: '#' },
          { label: 'Figma Tokens', href: '#' },
        ]}
        actions={<Button variant="primary" size="sm">Sign In</Button>}
        sticky={false}
      />
    </div>
  );
}

function SidebarDemo() {
  return (
    <div className="h-64 border border-surface-border rounded-2xl overflow-hidden flex">
      <Sidebar
        groups={[
          {
            title: 'General',
            items: [
              { id: '1', label: 'Overview', icon: <Layers className="w-4 h-4" />, active: true },
              { id: '2', label: 'Transactions', icon: <DollarSign className="w-4 h-4" /> },
              { id: '3', label: 'Customers', icon: <User className="w-4 h-4" /> },
            ],
          },
        ]}
        collapsible={false}
      />
      <div className="flex-1 p-6 bg-surface-muted/20 flex items-center justify-center text-xs text-surface-foreground-subtle">
        Main workspace viewport
      </div>
    </div>
  );
}

function BreadcrumbsDemo() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Aura Design System', href: '#' },
        { label: 'Primitives', href: '#' },
        { label: 'Interactive Button' },
      ]}
    />
  );
}

function TabsDemo() {
  return (
    <Tabs
      tabs={[
        { id: 'overview', label: 'Architecture Overview', content: <p className="text-xs text-surface-foreground-muted p-4">Clean React 19 server & client components with OKLCH theme primitives.</p> },
        { id: 'props', label: 'TypeScript Interfaces', content: <p className="text-xs text-surface-foreground-muted p-4">100% strict type definitions with JSDoc documentation.</p> },
        { id: 'a11y', label: 'WCAG Accessibility', content: <p className="text-xs text-surface-foreground-muted p-4">WAI-ARIA roles, focus outlines, and screen reader announcements verified.</p> },
      ]}
    />
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      currentPage={page}
      totalPages={8}
      onPageChange={setPage}
      totalItems={40}
      pageSize={5}
      showSummary
    />
  );
}

function FooterDemo() {
  return (
    <div className="rounded-2xl border border-surface-border overflow-hidden">
      <Footer description="World-class accessible design system built for modern African & global developers." />
    </div>
  );
}

function ContainerGridStackDemo() {
  return (
    <div className="space-y-4">
      <Grid cols={3} gap="md">
        <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 text-center text-xs font-semibold text-primary-500">
          Grid Item 1
        </div>
        <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 text-center text-xs font-semibold text-accent-500">
          Grid Item 2
        </div>
        <div className="p-4 rounded-xl bg-success-500/10 border border-success-500/20 text-center text-xs font-semibold text-success-500">
          Grid Item 3
        </div>
      </Grid>
    </div>
  );
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
        Open Command Palette (⌘K)
      </Button>
      <CommandPalette
        isOpen={open}
        onClose={() => setOpen(false)}
        items={[
          { id: '1', label: 'Open SaaS Analytics', category: 'Navigation', onSelect: () => alert('Opening SaaS') },
          { id: '2', label: 'Switch to Dark Mode', category: 'Preferences', onSelect: () => alert('Mode switched') },
          { id: '3', label: 'Export Audit Log (PDF)', category: 'Actions', onSelect: () => alert('Exporting log') },
        ]}
      />
    </div>
  );
}

// ==========================================
// 4. FEEDBACK & OVERLAYS DEMOS
// ==========================================

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="primary" size="sm" onClick={() => setOpen(true)}>Launch Dialog Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Interactive System Confirmation"
        description="Verify changes before synchronizing your OKLCH tokens to production."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save & Deploy</Button>
          </div>
        }
      >
        <p className="text-xs text-surface-foreground-muted leading-relaxed">
          The modal features focus trapping, Escape key listener, backdrop blur, and smooth entrance animation.
        </p>
      </Modal>
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Slide Open Drawer</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Quick Settings Drawer"
      >
        <div className="space-y-4 pt-2">
          <Input label="Workspace Title" defaultValue="Addis Fintech HQ" />
          <Select
            label="Default Currency"
            defaultValue="etb"
            options={[
              { value: 'etb', label: 'Ethiopian Birr (ETB)' },
              { value: 'usd', label: 'US Dollar (USD)' },
            ]}
          />
        </div>
      </Drawer>
    </div>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline" size="sm">Account Actions ▾</Button>}
      items={[
        { id: '1', label: 'Profile Settings', icon: <User className="w-3.5 h-3.5" />, onClick: () => alert('Profile') },
        { id: '2', label: 'Security & 2FA', icon: <Lock className="w-3.5 h-3.5" />, onClick: () => alert('Security') },
        { id: '3', label: 'Sign Out', danger: true, onClick: () => alert('Signed out') },
      ]}
    />
  );
}

function PopoverDemo() {
  return (
    <Popover
      trigger={<Button variant="outline" size="sm">Open Popover</Button>}
      content={
        <div className="p-3 max-w-xs space-y-1">
          <h5 className="font-semibold text-xs text-surface-foreground">Lightweight Popover</h5>
          <p className="text-[11px] text-surface-foreground-muted">Positioned automatically relative to the trigger button.</p>
        </div>
      }
    />
  );
}

function ToastDemoInner() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={() => toast({ title: 'Invoice Sent', description: 'Settlement SMS dispatched via Telebirr.', variant: 'success' })}
      >
        Success Toast
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => toast({ title: 'Connection Timeout', description: 'Could not reach national switch.', variant: 'danger' })}
      >
        Danger Toast
      </Button>
    </div>
  );
}

function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoInner />
    </ToastProvider>
  );
}

function AlertDemo() {
  return (
    <div className="space-y-3">
      <Alert
        variant="info"
        title="React 19.2 Native Engine"
      >
        Ref-as-prop is enabled everywhere. No forwardRef wrappers are necessary.
      </Alert>
      <Alert
        variant="success"
        title="WCAG AA Contrast Verified"
      >
        Every OKLCH token pair has been audited for optimal readability.
      </Alert>
    </div>
  );
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>Delete Deployment</Button>
      <ConfirmDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          alert('Deployment decommissioned.');
          setOpen(false);
        }}
        title="Decommission Production Service?"
        message="This action is irreversible and will immediately terminate active Telebirr webhooks."
        confirmText="Confirm Decommission"
        variant="danger"
      />
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <EmptyState
      title="No Transaction Records"
      description="You haven't initiated any settlements on this gateway account yet."
      action={<Button variant="primary" size="sm">Create First Transaction</Button>}
    />
  );
}

function ErrorStateDemo() {
  return (
    <ErrorState
      title="Failed to Load Banking Gateway"
      message="The upstream settlement provider returned HTTP 503 (Temporary Maintenance)."
      onRetry={() => alert('Retrying connection...')}
    />
  );
}

function NotFoundDemo() {
  return (
    <div className="rounded-2xl border border-surface-border overflow-hidden">
      <NotFoundPage />
    </div>
  );
}

// ==========================================
// 5. DATA DISPLAY DEMOS
// ==========================================

function CardDemo() {
  return (
    <Card hoverable className="p-6 max-w-sm space-y-3">
      <h4 className="font-display font-bold text-base text-surface-foreground">Composable Card Architecture</h4>
      <p className="text-xs text-surface-foreground-muted leading-relaxed">
        Featuring subtle borders, ambient diffuse shadows, and smooth hover micro-elevation.
      </p>
      <Button variant="primary" size="sm">Card Action</Button>
    </Card>
  );
}

function StatCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatCard
        title="Monthly Active Accounts"
        value="14,250"
        change="+22.4%"
        changeType="increase"
        icon={<TrendingUp className="w-5 h-5 text-success-500" />}
      />
      <StatCard
        title="Settlement Inflows"
        value="4,820,000 ETB"
        change="+18.1%"
        changeType="increase"
        icon={<DollarSign className="w-5 h-5 text-primary-500" />}
      />
    </div>
  );
}

function DataTableDemo() {
  const sampleData = [
    { id: '1', name: 'Abebe Kebede', role: 'Engineering Lead', location: 'Addis Ababa' },
    { id: '2', name: 'Chaltu Gemechu', role: 'Security Architect', location: 'Adama' },
    { id: '3', name: 'Yohannes Haile', role: 'Data Scientist', location: 'Hawassa' },
  ];
  return (
    <DataTable
      data={sampleData}
      keyExtractor={(item) => item.id}
      columns={[
        { key: 'name', header: 'Team Member', render: (i) => <span className="font-semibold">{i.name}</span> },
        { key: 'role', header: 'Specialization' },
        { key: 'location', header: 'Ethiopian Hub' },
      ]}
      searchable
    />
  );
}

function AccordionDemo() {
  return (
    <Accordion
      items={[
        { id: '1', title: 'What is OKLCH and why use it?', content: 'OKLCH is a modern perceptual color space that guarantees uniform brightness and predictable contrast across all hues.' },
        { id: '2', title: 'How does Ethiopic font fallback work?', content: 'We fall back to Noto Sans Ethiopic and Abyssinica SIL, ensuring flawless rendering for Amharic and Afaan Oromo.' },
      ]}
    />
  );
}

function TimelineDemo() {
  return (
    <Timeline
      items={[
        { id: '1', title: 'React 19 Core Released', date: 'Oct 2024', status: 'completed' },
        { id: '2', title: 'Aura UI 1.0 Design System Completed', date: 'Present', status: 'active' },
        { id: '3', title: 'Enterprise Bank Integrations', date: 'Next Month', status: 'pending' },
      ]}
    />
  );
}

function ProgressBarDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <ProgressBar value={72} variant="primary" showValue />
      <ProgressBar value={95} variant="success" showValue />
      <ProgressBar value={40} variant="warning" showValue />
    </div>
  );
}

function CircularProgressDemo() {
  return (
    <div className="flex items-center gap-6">
      <CircularProgress value={85} size="sm" variant="primary" />
      <CircularProgress value={65} size="md" variant="primary" />
      <CircularProgress value={92} size="lg" variant="success" />
    </div>
  );
}

function StepperDemo() {
  return (
    <Stepper
      steps={[
        { id: '1', title: 'Account Info' },
        { id: '2', title: 'Security 2FA' },
        { id: '3', title: 'Confirmation' },
      ]}
      currentStep={1}
    />
  );
}

function RatingDemo() {
  const [val, setVal] = useState(4.5);
  return (
    <div className="space-y-2">
      <Rating value={val} onChange={setVal} showText size="lg" />
    </div>
  );
}

function CalendarDemo() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="flex flex-col items-center">
      <Calendar value={date} onChange={setDate} />
    </div>
  );
}

function ChartsDemo() {
  const chartData = [
    { month: 'May', value: 420 },
    { month: 'Jun', value: 680 },
    { month: 'Jul', value: 910 },
    { month: 'Aug', value: 1240 },
    { month: 'Sep', value: 1580 },
  ];
  return (
    <div className="space-y-6">
      <div className="h-64 rounded-2xl border border-surface-border bg-surface-card p-4">
        <h5 className="font-semibold text-xs mb-3 text-surface-foreground">Growth Trajectory Line Chart</h5>
        <LineChart data={chartData} xAxisKey="month" series={[{ key: 'value', name: 'Users', color: 'var(--color-primary-500)' }]} height={200} />
      </div>
    </div>
  );
}

// ==========================================
// 6. FORMS & INPUTS DEMOS
// ==========================================

function FormFieldDemo() {
  return (
    <div className="max-w-md">
      <FormField label="Email Address" helperText="We will never share your personal email." required>
        <Input placeholder="name@domain.et" leftIcon={<Mail className="w-4 h-4" />} />
      </FormField>
    </div>
  );
}

function LoginFormDemo() {
  return (
    <div className="max-w-md p-6 rounded-2xl border border-surface-border bg-surface-card shadow-xs">
      <LoginForm onSubmit={(data) => alert(`Logged in: ${data.email}`)} />
    </div>
  );
}

function SignupFormDemo() {
  return (
    <div className="max-w-md p-6 rounded-2xl border border-surface-border bg-surface-card shadow-xs">
      <SignupForm onSubmit={(data) => alert(`Signed up: ${data.email}`)} />
    </div>
  );
}

function MultiStepFormDemo() {
  return (
    <div className="max-w-lg p-6 rounded-2xl border border-surface-border bg-surface-card shadow-xs">
      <MultiStepForm onComplete={(data) => alert('Multi-step registration complete!')} />
    </div>
  );
}

function FileUploadDemo() {
  return (
    <div className="max-w-md">
      <FileUpload onFilesSelected={(files: File[]) => alert(`Selected ${files.length} file(s)`)} />
    </div>
  );
}

function OtpInputDemo() {
  const [code, setCode] = useState('');
  return (
    <div className="space-y-4 max-w-xs">
      <OtpInput length={6} value={code} onChange={setCode} />
      <span className="text-xs text-surface-foreground-subtle block text-center font-mono">Value: {code || '______'}</span>
    </div>
  );
}

function SearchBarDemo() {
  return (
    <div className="max-w-md">
      <SearchBar
        placeholder="Search design tokens, primitives, components..."
        onSearch={(q) => alert(`Searching: ${q}`)}
      />
    </div>
  );
}

// ==========================================
// 7. PAGE SECTIONS DEMOS
// ==========================================

function HeroDemo() {
  return (
    <div className="rounded-2xl border border-surface-border overflow-hidden bg-surface">
      <Hero />
    </div>
  );
}

function FeatureGridDemo() {
  return (
    <div className="p-4">
      <FeatureGrid />
    </div>
  );
}

function PricingTableDemo() {
  return (
    <div className="p-4">
      <PricingTable />
    </div>
  );
}

function TestimonialsDemo() {
  return (
    <div className="p-4">
      <Testimonials />
    </div>
  );
}

function FAQDemo() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <FAQ />
    </div>
  );
}

function CtaBannerDemo() {
  return (
    <div className="p-4">
      <CtaBanner />
    </div>
  );
}

function DashboardShellDemo() {
  return (
    <div className="rounded-2xl border border-surface-border overflow-hidden h-96">
      <DashboardShell
        sidebarGroups={[
          {
            title: 'Platform',
            items: [
              { id: '1', label: 'Dashboard', icon: <Layers className="w-4 h-4" />, active: true },
              { id: '2', label: 'Transactions', icon: <DollarSign className="w-4 h-4" /> },
            ],
          },
        ]}
      >
        <div className="p-4 bg-surface-card rounded-xl border border-surface-border">
          <h4 className="font-bold text-sm">Dashboard Workspace</h4>
          <p className="text-xs text-surface-foreground-muted">Content renders inside DashboardShell scrollable viewport.</p>
        </div>
      </DashboardShell>
    </div>
  );
}

function AuthLayoutDemo() {
  return (
    <div className="rounded-2xl border border-surface-border overflow-hidden max-h-[480px] overflow-y-auto">
      <AuthLayout title="Enterprise Sign In">
        <LoginForm onSubmit={() => {}} />
      </AuthLayout>
    </div>
  );
}

function SettingsLayoutDemo() {
  const [activeNav, setActiveNav] = useState('profile');
  return (
    <div className="p-6 rounded-2xl border border-surface-border bg-surface-card">
      <SettingsLayout
        navItems={[
          { id: 'profile', label: 'Profile Details', icon: <User className="w-4 h-4" /> },
          { id: 'security', label: 'Security & 2FA', icon: <Lock className="w-4 h-4" /> },
          { id: 'billing', label: 'Billing & Telebirr', icon: <DollarSign className="w-4 h-4" /> },
        ]}
        activeId={activeNav}
        onSelectNav={setActiveNav}
      >
        <div className="space-y-4">
          <Input label="Display Name" defaultValue="Dagmawi B." />
          <Input label="Contact Email" defaultValue="dagm@aura.et" />
          <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </SettingsLayout>
    </div>
  );
}

function CourseCardDemo() {
  return (
    <div className="max-w-sm">
      <CourseCard
        id="c-demo"
        title="Full-Stack React 19 & Tailwind CSS v4 in Amharic"
        description="Master modern web app design with OKLCH colors, Radix UI primitives, and Motion."
        instructor={{ name: 'Dagmawi B.' }}
        progress={72}
        isEnrolled
      />
    </div>
  );
}

function ProfileHeaderDemo() {
  return (
    <ProfileHeader
      name="Dagmawi B."
      handle="@dagm"
      role="Principal Frontend Architect & UI Engineer"
      bio="Crafting production-grade React 19 design systems and web apps with OKLCH color spaces and Ethiopic digital experiences."
      location="Addis Ababa, Ethiopia"
    />
  );
}

// ==========================================
// REGISTRY EXPORT
// ==========================================

export const COMPONENT_REGISTRY: ComponentDoc[] = [
  // 1. Tokens & Theme
  {
    id: 'tokens',
    name: 'Tokens & OKLCH Theme',
    category: 'Tokens & Theme',
    description: 'CSS-first design tokens built with perceptually uniform OKLCH color scales and WCAG AA contrast.',
    component: TokensDemo,
    props: [
      { name: 'theme', type: "'light' | 'dark' | 'system'", description: 'Current active theme state.' },
      { name: 'toggleTheme', type: '() => void', description: 'Toggles between light and dark themes.' },
    ],
  },
  {
    id: 'ethiopic-typography',
    name: 'Ethiopic Script & Typography',
    category: 'Tokens & Theme',
    description: 'Native fallback typography supporting Noto Sans Ethiopic and Abyssinica SIL for Amharic and Afaan Oromo.',
    component: EthiopicTypographyDemo,
  },

  // 2. Primitives
  {
    id: 'button',
    name: 'Button',
    category: 'Primitives',
    description: 'Interactive button with multiple variants, sizes, icon slots, and animated loading state.',
    component: ButtonDemo,
    wcagNotes: 'Complies with WAI-ARIA button role, Enter/Space key actuation, and focus outline.',
    keyboardShortcuts: ['Tab: Focus', 'Enter/Space: Actuate'],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", defaultValue: "'primary'", description: 'Visual appearance variant.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Button size dimensions.' },
      { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Displays an animated spinner.' },
      { name: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before text.' },
      { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after text.' },
    ],
  },
  {
    id: 'icon-button',
    name: 'IconButton',
    category: 'Primitives',
    description: 'Icon-only button requiring explicit aria-label for accessibility.',
    component: IconButtonDemo,
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Primitives',
    description: 'Form input field supporting labels, hints, validation errors, and icon attachments.',
    component: InputDemo,
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Primitives',
    description: 'Multi-line text input with auto-resize and validation states.',
    component: TextareaDemo,
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Primitives',
    description: 'Custom accessible dropdown selection built on Radix UI Select primitive.',
    component: SelectDemo,
  },
  {
    id: 'combobox',
    name: 'Combobox',
    category: 'Primitives',
    description: 'Searchable auto-complete combobox with keyboard arrow navigation.',
    component: ComboboxDemo,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Primitives',
    description: 'Accessible checkbox with custom checkmark, indeterminate state, and description.',
    component: CheckboxDemo,
  },
  {
    id: 'radio',
    name: 'Radio & RadioGroup',
    category: 'Primitives',
    description: 'Accessible single-select radio button lists.',
    component: RadioDemo,
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Primitives',
    description: 'Smooth toggle switch for binary options built on Radix UI Switch.',
    component: SwitchDemo,
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Primitives',
    description: 'Continuous range slider with keyboard navigation and step control.',
    component: SliderDemo,
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Primitives',
    description: 'Status badge and tag indicator with semantic colors.',
    component: BadgeDemo,
  },
  {
    id: 'avatar',
    name: 'Avatar & AvatarGroup',
    category: 'Primitives',
    description: 'User avatar with image fallback initials and online presence indicator.',
    component: AvatarDemo,
  },
  {
    id: 'tag',
    name: 'Tag / Chip',
    category: 'Primitives',
    description: 'Interactive removable tags and category chips.',
    component: TagDemo,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Primitives',
    description: 'Contextual hover tooltip built with Radix UI Tooltip.',
    component: TooltipDemo,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'Primitives',
    description: 'Animated SVG activity spinner for loading indicators.',
    component: SpinnerDemo,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Primitives',
    description: 'Animated pulsing placeholder for asynchronous content loading.',
    component: SkeletonDemo,
  },
  {
    id: 'divider',
    name: 'Divider',
    category: 'Primitives',
    description: 'Horizontal or vertical line separator with optional label text.',
    component: DividerDemo,
  },
  {
    id: 'kbd',
    name: 'Kbd',
    category: 'Primitives',
    description: 'Keyboard shortcut key indicator for desktop command palettes.',
    component: KbdDemo,
  },

  // 3. Layout & Navigation
  {
    id: 'navbar',
    name: 'Navbar',
    category: 'Layout & Navigation',
    description: 'Top navigation bar with mobile hamburger drawer and responsive links.',
    component: NavbarDemo,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Layout & Navigation',
    description: 'Collapsible application sidebar with grouped navigation items.',
    component: SidebarDemo,
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Layout & Navigation',
    description: 'Hierarchical navigation breadcrumb trail.',
    component: BreadcrumbsDemo,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Layout & Navigation',
    description: 'Radix UI powered accessible tabbed interfaces.',
    component: TabsDemo,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Layout & Navigation',
    description: 'Page selector with first/last controls and total item count.',
    component: PaginationDemo,
  },
  {
    id: 'footer',
    name: 'Footer',
    category: 'Layout & Navigation',
    description: 'Multi-column application and website footer with legal links.',
    component: FooterDemo,
  },
  {
    id: 'container',
    name: 'Container / Grid / Stack',
    category: 'Layout & Navigation',
    description: 'Core layout primitives for flexible grids, vertical stacks, and responsive containers.',
    component: ContainerGridStackDemo,
  },
  {
    id: 'command-palette',
    name: 'Command Palette',
    category: 'Layout & Navigation',
    description: 'Keyboard-first modal launcher for actions and page search.',
    component: CommandPaletteDemo,
  },

  // 4. Feedback & Overlays
  {
    id: 'modal',
    name: 'Modal / Dialog',
    category: 'Feedback & Overlays',
    description: 'Accessible modal dialog with focus trap and backdrop blur.',
    component: ModalDemo,
  },
  {
    id: 'drawer',
    name: 'Drawer / Sheet',
    category: 'Feedback & Overlays',
    description: 'Slide-out side panel for settings and mobile menus.',
    component: DrawerDemo,
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Feedback & Overlays',
    description: 'Radix UI accessible popup dropdown menu.',
    component: DropdownMenuDemo,
  },
  {
    id: 'popover',
    name: 'Popover',
    category: 'Feedback & Overlays',
    description: 'Floating popover card for rich interactive content.',
    component: PopoverDemo,
  },
  {
    id: 'toast',
    name: 'Toast Notifications',
    category: 'Feedback & Overlays',
    description: 'Dismissible toast alert notifications with hook API.',
    component: ToastDemo,
  },
  {
    id: 'alert',
    name: 'Alert Banner',
    category: 'Feedback & Overlays',
    description: 'Inline notification banner for errors, warnings, and success messages.',
    component: AlertDemo,
  },
  {
    id: 'confirm-dialog',
    name: 'Confirm Dialog',
    category: 'Feedback & Overlays',
    description: 'Two-step confirmation modal for destructive operations.',
    component: ConfirmDialogDemo,
  },
  {
    id: 'empty-state',
    name: 'Empty State',
    category: 'Feedback & Overlays',
    description: 'Helpful fallback graphic and message when data lists are empty.',
    component: EmptyStateDemo,
  },
  {
    id: 'error-state',
    name: 'Error State',
    category: 'Feedback & Overlays',
    description: 'User-friendly error presentation with retry action trigger.',
    component: ErrorStateDemo,
  },
  {
    id: 'not-found',
    name: 'Not Found (404)',
    category: 'Feedback & Overlays',
    description: 'Complete 404 error page layout with search and home navigation.',
    component: NotFoundDemo,
  },

  // 5. Data Display
  {
    id: 'card',
    name: 'Card',
    category: 'Data Display',
    description: 'Versatile content container with hover elevation.',
    component: CardDemo,
  },
  {
    id: 'stat-card',
    name: 'Stat / KPI Card',
    category: 'Data Display',
    description: 'Metric card with trending indicator and percentage changes.',
    component: StatCardDemo,
  },
  {
    id: 'data-table',
    name: 'Data Table',
    category: 'Data Display',
    description: 'Feature-rich table with live search, sorting, and pagination.',
    component: DataTableDemo,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Data Display',
    description: 'Expandable/collapsible content panels built with Radix UI Accordion.',
    component: AccordionDemo,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    category: 'Data Display',
    description: 'Vertical chronological activity or milestone timeline.',
    component: TimelineDemo,
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    category: 'Data Display',
    description: 'Linear horizontal progress bar with percentage indicator.',
    component: ProgressBarDemo,
  },
  {
    id: 'circular-progress',
    name: 'Circular Progress',
    category: 'Data Display',
    description: 'Radial circular progress gauge with stroke-dash animations.',
    component: CircularProgressDemo,
  },
  {
    id: 'stepper',
    name: 'Stepper',
    category: 'Data Display',
    description: 'Multi-step milestone progress indicator for onboarding and checkouts.',
    component: StepperDemo,
  },
  {
    id: 'rating',
    name: 'Rating',
    category: 'Data Display',
    description: 'Star rating component with read-only and interactive input modes.',
    component: RatingDemo,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    category: 'Data Display',
    description: 'Interactive monthly date picker calendar.',
    component: CalendarDemo,
  },
  {
    id: 'charts',
    name: 'Charts (Line, Bar, Donut)',
    category: 'Data Display',
    description: 'High-performance interactive data visualizations using Recharts.',
    component: ChartsDemo,
  },

  // 6. Forms & Inputs
  {
    id: 'form-field',
    name: 'FormField',
    category: 'Forms & Inputs',
    description: 'Accessible wrapper with label, error message, and hint.',
    component: FormFieldDemo,
  },
  {
    id: 'login-form',
    name: 'Login Form',
    category: 'Forms & Inputs',
    description: 'Ready-to-use authentication form with validation.',
    component: LoginFormDemo,
  },
  {
    id: 'signup-form',
    name: 'Signup Form',
    category: 'Forms & Inputs',
    description: 'User registration form with password strength indicator.',
    component: SignupFormDemo,
  },
  {
    id: 'multi-step-form',
    name: 'Multi-Step Form',
    category: 'Forms & Inputs',
    description: 'Structured multi-step wizard for complex onboarding flows.',
    component: MultiStepFormDemo,
  },
  {
    id: 'file-upload',
    name: 'File Upload',
    category: 'Forms & Inputs',
    description: 'Drag-and-drop file upload zone with file preview.',
    component: FileUploadDemo,
  },
  {
    id: 'otp-input',
    name: 'OTP Input',
    category: 'Forms & Inputs',
    description: 'Six-digit one-time password code input with auto-advance.',
    component: OtpInputDemo,
  },
  {
    id: 'search-bar',
    name: 'Search Bar',
    category: 'Forms & Inputs',
    description: 'Real-time search bar with clear button and shortcut trigger.',
    component: SearchBarDemo,
  },

  // 7. Page Sections
  {
    id: 'hero',
    name: 'Hero Section',
    category: 'Page Sections',
    description: 'Marketing hero section with glowing mesh gradient and metric counters.',
    component: HeroDemo,
  },
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    category: 'Page Sections',
    description: 'Modern feature showcase grid with icon cards.',
    component: FeatureGridDemo,
  },
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    category: 'Page Sections',
    description: 'Three-tier pricing table with ETB and USD switcher.',
    component: PricingTableDemo,
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    category: 'Page Sections',
    description: 'Social proof testimonial grid with verified client cards.',
    component: TestimonialsDemo,
  },
  {
    id: 'faq',
    name: 'FAQ Accordion',
    category: 'Page Sections',
    description: 'Frequently asked questions accordion with smooth transitions.',
    component: FAQDemo,
  },
  {
    id: 'cta-banner',
    name: 'CTA Banner',
    category: 'Page Sections',
    description: 'High-conversion call to action banner with diffuse gradient blur.',
    component: CtaBannerDemo,
  },
  {
    id: 'dashboard-shell',
    name: 'Dashboard Shell',
    category: 'Page Sections',
    description: 'Responsive console shell with sidebar, topbar, and breadcrumb workspace.',
    component: DashboardShellDemo,
  },
  {
    id: 'auth-layout',
    name: 'Auth Layout',
    category: 'Page Sections',
    description: 'Split-screen authentication layout with branding showcase panel.',
    component: AuthLayoutDemo,
  },
  {
    id: 'settings-layout',
    name: 'Settings Layout',
    category: 'Page Sections',
    description: 'Multi-tab settings layout for profile, security, and billing.',
    component: SettingsLayoutDemo,
  },
  {
    id: 'course-card',
    name: 'Course Card',
    category: 'Page Sections',
    description: 'E-learning course card with progress, rating, and enrollment action.',
    component: CourseCardDemo,
  },
  {
    id: 'profile-header',
    name: 'Profile Header',
    category: 'Page Sections',
    description: 'User profile header with cover banner, avatar, bio, and stats.',
    component: ProfileHeaderDemo,
  },
];
