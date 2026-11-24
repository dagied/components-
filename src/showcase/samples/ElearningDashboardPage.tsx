import React, { useState } from 'react';
import {
  CourseCard,
  CircularProgress,
  Badge,
  Button,
  Stepper,
  Timeline,
  Rating,
  Input,
  Modal,
} from '@/ui';
import {
  BookOpen,
  Award,
  Flame,
  Search,
  PlayCircle,
  GraduationCap,
} from 'lucide-react';

export function ElearningDashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [languageMode, setLanguageMode] = useState<'EN' | 'AM' | 'OM'>('EN');

  const categories = ['All', 'Frontend', 'Backend & Cloud', 'AI & Machine Learning', 'Cybersecurity'];

  const courses = [
    {
      id: 'course-1',
      title: languageMode === 'AM'
        ? 'የሪአክት 19 እና ቴይልዊንድ 4 ሙሉ ስልጠና (React 19 & Tailwind v4 in Amharic)'
        : languageMode === 'OM'
        ? 'Barnoota Guutuu React 19 fi Tailwind v4 Afaan Oromootiin'
        : 'Full-Stack React 19 & Tailwind CSS v4 Masterclass',
      description: 'Master server components, action hooks, OKLCH design tokens, and fluid motion animations.',
      category: 'Frontend',
      level: 'Intermediate' as const,
      instructor: {
        name: 'Dagmawi B.',
        role: 'Frontend Architect',
      },
      duration: '14h 20m',
      lessonsCount: 38,
      rating: 4.9,
      reviewCount: 840,
      progress: 68,
      isEnrolled: true,
    },
    {
      id: 'course-2',
      title: languageMode === 'AM'
        ? 'ሰው ሰራሽ አስተውሎት ለኢትዮጵያ ቋንቋዎች (AI & LLMs for Ethiopic NLP)'
        : 'Ethiopic Large Language Models & Ge’ez Script NLP',
      description: 'Fine-tuning transformers and tokenizers for Amharic, Afaan Oromo, Tigrinya, and Ge’ez corpora.',
      category: 'AI & Machine Learning',
      level: 'Advanced' as const,
      instructor: {
        name: 'Dr. Bethlehem A.',
        role: 'NLP Research Fellow',
      },
      duration: '18h 45m',
      lessonsCount: 42,
      rating: 4.95,
      reviewCount: 512,
      progress: 32,
      isEnrolled: true,
    },
    {
      id: 'course-3',
      title: 'Cloud Distributed Systems & High-Throughput Go Services',
      description: 'Designing fault-tolerant microservices, gRPC protocols, and Kafka streaming pipelines.',
      category: 'Backend & Cloud',
      level: 'Advanced' as const,
      instructor: {
        name: 'Yohannes Haile',
        role: 'Cloud Infrastructure Lead',
      },
      duration: '12h 10m',
      lessonsCount: 26,
      rating: 4.82,
      reviewCount: 630,
      price: 4500,
      currency: 'ETB',
      isEnrolled: false,
    },
    {
      id: 'course-4',
      title: 'Fintech Security, Encryption & Telebirr Payment Rails',
      description: 'Zero-trust architecture, PCI-DSS compliance, webhooks, and national banking API integrations.',
      category: 'Cybersecurity',
      level: 'Intermediate' as const,
      instructor: {
        name: 'Kalkidan Mengistu',
        role: 'SecOps Director',
      },
      duration: '9h 15m',
      lessonsCount: 20,
      rating: 4.75,
      reviewCount: 410,
      progress: 100,
      isEnrolled: true,
    },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const timelineEvents = [
    {
      id: 'event-1',
      title: 'React 19 Action Hooks Capstone Project',
      date: 'Tomorrow, 11:59 PM',
      description: 'Submit GitHub repository link with unit tests and live Vercel deployment.',
      status: 'active' as const,
    },
    {
      id: 'event-2',
      title: 'Live Mentorship Q&A with Addis Tech Leads',
      date: 'Thursday, 6:00 PM (EAT)',
      description: 'Virtual hangout via Google Meet discussing system design interviews.',
      status: 'pending' as const,
    },
    {
      id: 'event-3',
      title: 'Fintech Security Final Exam Submitted',
      date: 'Yesterday at 3:15 PM',
      description: 'Scored 98/100. Certificate generated with cryptographic verification ID.',
      status: 'completed' as const,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Student Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-950 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-accent-500/20 blur-[90px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm" className="bg-white/10 text-white border-white/20">
                <Flame className="w-3.5 h-3.5 text-warning-400 mr-1" />
                18 Day Learning Streak
              </Badge>
              <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15 text-[11px]">
                <button
                  onClick={() => setLanguageMode('EN')}
                  className={`px-2 py-0.5 rounded font-medium ${languageMode === 'EN' ? 'bg-primary-600 text-white' : 'text-neutral-300'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguageMode('AM')}
                  className={`px-2 py-0.5 rounded font-medium ${languageMode === 'AM' ? 'bg-primary-600 text-white' : 'text-neutral-300'}`}
                >
                  አማርኛ
                </button>
                <button
                  onClick={() => setLanguageMode('OM')}
                  className={`px-2 py-0.5 rounded font-medium ${languageMode === 'OM' ? 'bg-primary-600 text-white' : 'text-neutral-300'}`}
                >
                  Oromoo
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
              {languageMode === 'AM'
                ? 'እንኳን ደህና መጡ፣ ዳግማዊ! ትምህርትዎን ይቀጥሉ።'
                : languageMode === 'OM'
                ? 'Baga nagaan dhuftan, Dagmawi! Barnoota kee itti fufi.'
                : 'Welcome back, Dagmawi! Ready to code today?'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              You are 78% towards reaching your weekly goal of 10 learning hours. Keep up the high momentum!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <CircularProgress value={78} size="lg" strokeWidth={6} showValue={false} />
            <div>
              <span className="text-xl font-bold font-display text-white">7.8 / 10h</span>
              <span className="text-[11px] text-neutral-300 block">Weekly Coding Goal</span>
              <span className="text-[10px] text-accent-300 font-medium">Top 5% in Addis Ababa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-surface-border bg-surface-card flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-bold text-surface-foreground">4</span>
            <span className="text-xs text-surface-foreground-subtle block">Enrolled Courses</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-surface-border bg-surface-card flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-success-500/10 text-success-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-bold text-surface-foreground">5</span>
            <span className="text-xs text-surface-foreground-subtle block">Certificates Earned</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-surface-border bg-surface-card flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-warning-500/10 text-warning-500">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-bold text-surface-foreground">18 Days</span>
            <span className="text-xs text-surface-foreground-subtle block">Active Streak</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-surface-border bg-surface-card flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-500">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-bold text-surface-foreground">2,480</span>
            <span className="text-xs text-surface-foreground-subtle block">XP Skill Points</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Courses (Left 2 cols) & Upcoming Schedule (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-surface-foreground">
                My Courses & Catalog
              </h2>
              <p className="text-xs text-surface-foreground-muted">
                Continue learning your active modules or explore new technical paths
              </p>
            </div>

            <div className="w-full sm:w-64">
              <Input
                placeholder="Search courses..."
                size="sm"
                leftIcon={<Search className="w-3.5 h-3.5 text-surface-foreground-subtle" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-xs font-semibold'
                    : 'bg-surface-muted text-surface-foreground-muted hover:text-surface-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                {...c}
                onActionClick={() => {
                  if (c.progress === 100) {
                    setIsReviewModalOpen(true);
                  } else {
                    alert(`Opening course player: "${c.title}"`);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Sidebar / Deadlines & Stepper (1 Col) */}
        <div className="space-y-6">
          {/* Active Module Stepper */}
          <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-surface-foreground">
                Current Learning Track
              </h3>
              <Badge variant="primary" size="sm">
                Module 3 of 4
              </Badge>
            </div>

            <Stepper
              steps={[
                { id: 'step-1', title: 'Tailwind v4 @theme Tokens', description: 'Completed' },
                { id: 'step-2', title: 'Accessible Radix Overlays', description: 'Completed' },
                { id: 'step-3', title: 'Motion Micro-Animations', description: 'In Progress' },
                { id: 'step-4', title: 'Ethiopic Typography Fallback', description: 'Pending' },
              ]}
              currentStep={2}
              orientation="vertical"
            />

            <Button
              variant="primary"
              size="sm"
              className="w-full mt-2"
              leftIcon={<PlayCircle className="w-4 h-4" />}
              onClick={() => alert('Launching lesson 3.4: Fluid OKLCH micro-interactions')}
            >
              Resume Lesson 3.4
            </Button>
          </div>

          {/* Upcoming Deadlines & Milestones */}
          <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-sm text-surface-foreground">
              Upcoming Deadlines & Events
            </h3>

            <Timeline items={timelineEvents} />
          </div>
        </div>
      </div>

      {/* Review Course Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Rate & Review Finished Course"
        description="Share your feedback with the instructor and earn 50 XP community bonus."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsReviewModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Thank you for rating! 50 XP credited to your profile.');
                setIsReviewModalOpen(false);
              }}
            >
              Submit Review
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-muted/50 border border-surface-border gap-2">
            <span className="text-xs text-surface-foreground-muted">Overall Course Quality</span>
            <Rating
              value={reviewRating}
              onChange={setReviewRating}
              size="lg"
              showText
            />
          </div>
          <Input label="What was the best takeaway?" placeholder="e.g. The hands-on project and OKLCH color token explanations..." />
        </div>
      </Modal>
    </div>
  );
}
