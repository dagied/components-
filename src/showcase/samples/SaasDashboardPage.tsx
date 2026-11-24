import React, { useState } from 'react';
import {
  StatCard,
  DataTable,
  Column,
  Badge,
  Button,
  Select,
  Modal,
  Input,
  LineChart,
  BarChart,
  DonutChart,
  useTheme,
} from '@/ui';
import {
  DollarSign,
  Users,
  TrendingUp,
  CreditCard,
  Download,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TX-9401',
    customer: 'Abebe Kebede',
    email: 'abebe.k@telecom.et',
    amount: 14500,
    currency: 'ETB',
    date: '2026-10-20 14:32',
    status: 'completed',
    method: 'Telebirr',
  },
  {
    id: 'TX-9402',
    customer: 'Bethlehem Tadesse',
    email: 'beth.t@fintech.et',
    amount: 32000,
    currency: 'ETB',
    date: '2026-10-20 13:10',
    status: 'completed',
    method: 'CBE Birr',
  },
  {
    id: 'TX-9403',
    customer: 'Yohannes Haile',
    email: 'yohannes@techstart.et',
    amount: 8750,
    currency: 'ETB',
    date: '2026-10-20 11:45',
    status: 'pending',
    method: 'Awash Bank',
  },
  {
    id: 'TX-9404',
    customer: 'Chaltu Gemechu',
    email: 'chaltu.g@oromia-agri.et',
    amount: 45000,
    currency: 'ETB',
    date: '2026-10-19 18:20',
    status: 'completed',
    method: 'Telebirr SuperApp',
  },
  {
    id: 'TX-9405',
    customer: 'Dawit Mekonnen',
    email: 'dawit.m@logistics.et',
    amount: 12200,
    currency: 'ETB',
    date: '2026-10-19 15:02',
    status: 'failed',
    method: 'Visa Direct',
  },
  {
    id: 'TX-9406',
    customer: 'Hiwot Assefa',
    email: 'hiwot.a@health.et',
    amount: 21500,
    currency: 'ETB',
    date: '2026-10-19 09:14',
    status: 'completed',
    method: 'BOA Chapa',
  },
  {
    id: 'TX-9407',
    customer: 'Tariku Alemu',
    email: 'tariku@creative.et',
    amount: 6800,
    currency: 'ETB',
    date: '2026-10-18 16:40',
    status: 'completed',
    method: 'Telebirr',
  },
];

const revenueData = [
  { name: 'Nov', revenue: 840, users: 310 },
  { name: 'Dec', revenue: 980, users: 380 },
  { name: 'Jan', revenue: 1120, users: 450 },
  { name: 'Feb', revenue: 1290, users: 520 },
  { name: 'Mar', revenue: 1410, users: 610 },
  { name: 'Apr', revenue: 1530, users: 700 },
  { name: 'May', revenue: 1680, users: 820 },
  { name: 'Jun', revenue: 1820, users: 950 },
  { name: 'Jul', revenue: 1950, users: 1040 },
  { name: 'Aug', revenue: 2140, users: 1180 },
  { name: 'Sep', revenue: 2310, users: 1320 },
  { name: 'Oct', revenue: 2560, users: 1480 },
];

const regionalGrowth = [
  { name: 'Addis Ababa', users: 1840 },
  { name: 'Hawassa', users: 720 },
  { name: 'Dire Dawa', users: 540 },
  { name: 'Bahir Dar', users: 490 },
  { name: 'Adama', users: 610 },
  { name: 'Mekelle', users: 380 },
];

const planBreakdown = [
  { name: 'Enterprise', value: 52, color: 'var(--color-primary-600)' },
  { name: 'Professional', value: 34, color: 'var(--color-accent-500)' },
  { name: 'Starter', value: 14, color: 'var(--color-success-500)' },
];

export function SaasDashboardPage() {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const exchangeRate = currency === 'ETB' ? 1 : 1 / 140;
  const formatAmount = (etb: number) => {
    const val = etb * exchangeRate;
    return currency === 'ETB'
      ? `${val.toLocaleString('en-US', { maximumFractionDigits: 0 })} ETB`
      : `$${val.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  const filteredTransactions = mockTransactions.filter(
    (t) =>
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Transaction>[] = [
    {
      key: 'id',
      header: 'Transaction ID',
      render: (item: Transaction) => (
        <span className="font-mono text-xs font-semibold text-primary-500">
          {item.id}
        </span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (item: Transaction) => (
        <div>
          <div className="font-medium text-surface-foreground text-xs">{item.customer}</div>
          <div className="text-[11px] text-surface-foreground-subtle">{item.email}</div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (item: Transaction) => (
        <span className="font-semibold text-surface-foreground text-xs">
          {formatAmount(item.amount)}
        </span>
      ),
    },
    {
      key: 'method',
      header: 'Payment Method',
      render: (item: Transaction) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-surface-foreground-muted">
          <CreditCard className="w-3.5 h-3.5 text-surface-foreground-subtle" />
          {item.method}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Transaction) => {
        if (item.status === 'completed') {
          return (
            <Badge variant="success" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
              Completed
            </Badge>
          );
        }
        if (item.status === 'pending') {
          return (
            <Badge variant="warning" size="sm" icon={<Clock className="w-3 h-3" />}>
              Pending
            </Badge>
          );
        }
        return (
          <Badge variant="danger" size="sm" icon={<AlertTriangle className="w-3 h-3" />}>
            Failed
          </Badge>
        );
      },
    },
    {
      key: 'date',
      header: 'Timestamp',
      render: (item: Transaction) => (
        <span className="text-[11px] text-surface-foreground-subtle">{item.date}</span>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-surface-foreground tracking-tight">
              Enterprise Billing & Metrics
            </h1>
            <Badge variant="primary" size="sm">
              Q4 FY2026
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-surface-foreground-muted mt-1">
            Real-time fintech telemetry, Telebirr & international settlement gateway.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Currency Toggle */}
          <div className="flex items-center bg-surface-muted rounded-xl p-1 border border-surface-border">
            <button
              onClick={() => setCurrency('ETB')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currency === 'ETB'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-surface-foreground-muted hover:text-surface-foreground'
              }`}
            >
              ETB (ብር)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currency === 'USD'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-surface-foreground-muted hover:text-surface-foreground'
              }`}
            >
              USD ($)
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Exporting monthly statement (CSV/PDF)...')}
          >
            Export
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsInvoiceModalOpen(true)}
          >
            New Invoice
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Monthly Recurring Revenue"
          value={formatAmount(2560000)}
          change="+18.4%"
          changeType="increase"
          description="vs. last calendar month"
          icon={<DollarSign className="w-5 h-5 text-primary-500" />}
        />
        <StatCard
          title="Active Subscriptions"
          value="4,580"
          change="+12.2%"
          changeType="increase"
          description="+490 accounts this week"
          icon={<Users className="w-5 h-5 text-accent-500" />}
        />
        <StatCard
          title="Net Churn Rate"
          value="1.18%"
          change="-0.42%"
          changeType="decrease"
          description="Industry benchmark: 3.2%"
          icon={<TrendingUp className="w-5 h-5 text-success-500" />}
        />
        <StatCard
          title="Avg Revenue Per User (ARPU)"
          value={formatAmount(558)}
          change="+5.1%"
          changeType="increase"
          description="Driven by Enterprise tier"
          icon={<ArrowUpRight className="w-5 h-5 text-warning-500" />}
        />
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Line Chart (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-base text-surface-foreground">
                Revenue Trajectory (ETB Thousand)
              </h3>
              <p className="text-xs text-surface-foreground-muted">
                Trailing 12-month automated settlement data
              </p>
            </div>
            <Badge variant="outline" size="sm">
              Audit Verified
            </Badge>
          </div>
          <div className="h-72 w-full pt-2">
            <LineChart
              data={revenueData}
              xAxisKey="name"
              series={[
                { key: 'revenue', name: 'Revenue (k ETB)', color: 'var(--color-primary-500)' },
                { key: 'users', name: 'Paid Users', color: 'var(--color-accent-500)' },
              ]}
              height={270}
            />
          </div>
        </div>

        {/* Donut Chart (1 Col) */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-surface-foreground">
              Tier Revenue Breakdown
            </h3>
            <p className="text-xs text-surface-foreground-muted mb-4">
              Contribution by customer tier
            </p>
            <div className="h-60 w-full flex items-center justify-center">
              <DonutChart data={planBreakdown} height={230} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-surface-border/60">
            {planBreakdown.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[11px] text-surface-foreground-subtle">{item.name}</span>
                <span className="text-sm font-bold text-surface-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Distribution & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Bar Chart */}
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs">
          <h3 className="font-display font-bold text-base text-surface-foreground mb-1">
            Subscribers by Ethiopian Hub
          </h3>
          <p className="text-xs text-surface-foreground-muted mb-4">
            Active verified commercial deployments
          </p>
          <div className="h-64 w-full">
            <BarChart
              data={regionalGrowth}
              xAxisKey="name"
              series={[{ key: 'users', name: 'Subscribers', color: 'var(--color-primary-600)' }]}
              height={240}
            />
          </div>
        </div>

        {/* Transactions Data Table (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-surface-foreground">
                Recent Gateway Transactions
              </h3>
              <p className="text-xs text-surface-foreground-muted">
                Real-time clearing via Telebirr, CBE Birr, Awash, and Visa
              </p>
            </div>
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search transactions..."
                size="sm"
                leftIcon={<Search className="w-3.5 h-3.5 text-surface-foreground-subtle" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            data={filteredTransactions}
            columns={columns}
            keyExtractor={(item) => item.id}
            pageSize={5}
            searchable={false}
          />
        </div>
      </div>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Generate Commercial Invoice"
        description="Issue an itemized digital invoice with Telebirr QR settlement code."
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsInvoiceModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Invoice generated successfully! Dispatched to client via SMS/Email.');
                setIsInvoiceModalOpen(false);
              }}
            >
              Generate & Send
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <Input label="Customer Full Name" placeholder="e.g. Dawit Tadesse" defaultValue="Abebe Tech Solutions" />
          <Input label="Customer Email / Phone" placeholder="e.g. dawit@domain.et or +251 91 123 4567" defaultValue="accounts@abebetech.et" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Amount (ETB)" type="number" placeholder="25000" defaultValue="45000" />
            <Select
              label="Settlement Rail"
              options={[
                { value: 'telebirr', label: 'Telebirr SuperApp' },
                { value: 'cbe', label: 'CBE Birr' },
                { value: 'awash', label: 'Awash Bank API' },
                { value: 'international', label: 'Stripe / International Visa' },
              ]}
              defaultValue="telebirr"
            />
          </div>
          <Input label="Memo / Service Description" placeholder="Q4 Enterprise Aura License" defaultValue="Annual SaaS Cloud Retainer" />
        </div>
      </Modal>
    </div>
  );
}
