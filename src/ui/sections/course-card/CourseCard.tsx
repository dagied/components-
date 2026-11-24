import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Badge } from '@/ui/primitives/badge/Badge';
import { Button } from '@/ui/primitives/button/Button';
import { Rating } from '@/ui/data-display/rating/Rating';
import { ProgressBar } from '@/ui/data-display/progress-bar/ProgressBar';
import { Clock, BookOpen, User, PlayCircle, Award } from 'lucide-react';

export interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  instructor: {
    name: string;
    avatarUrl?: string;
    role?: string;
  };
  duration?: string;
  lessonsCount?: number;
  rating?: number;
  reviewCount?: number;
  price?: number;
  currency?: string;
  progress?: number; // 0 to 100. If provided, renders as enrolled/in-progress card
  isEnrolled?: boolean;
  onActionClick?: (id: string) => void;
  actionText?: string;
}

export function CourseCard({
  id,
  title,
  description,
  thumbnailUrl,
  category = 'Software Engineering',
  level = 'Intermediate',
  instructor,
  duration = '8h 30m',
  lessonsCount = 24,
  rating = 4.8,
  reviewCount = 1420,
  price,
  currency = 'ETB',
  progress,
  isEnrolled = false,
  onActionClick,
  actionText,
  className,
  ...props
}: CourseCardProps) {
  const isCompleted = progress !== undefined && progress >= 100;
  const inProgress = progress !== undefined && progress > 0 && progress < 100;

  return (
    <div
      className={cn(
        'group flex flex-col rounded-2xl border border-surface-border bg-surface-card overflow-hidden shadow-xs hover:shadow-md hover:border-primary-500/40 transition-all duration-200',
        className
      )}
      {...props}
    >
      {/* Thumbnail / Header Media */}
      <div className="relative aspect-video w-full bg-surface-muted overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-900/40 via-surface-muted to-accent-900/30 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary-500/50" />
          </div>
        )}

        {/* Level & Category Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="primary" size="sm" className="bg-primary-950/80 backdrop-blur-md border border-primary-500/30 text-primary-300">
            {category}
          </Badge>
          <Badge variant="outline" size="sm" className="bg-black/60 backdrop-blur-md text-white border-white/20">
            {level}
          </Badge>
        </div>

        {isCompleted && (
          <div className="absolute top-3 right-3">
            <Badge variant="success" size="sm" icon={<Award className="w-3.5 h-3.5" />}>
              Completed
            </Badge>
          </div>
        )}
      </div>

      {/* Course Details */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating & Review */}
          <div className="flex items-center justify-between text-xs text-surface-foreground-subtle">
            <Rating value={rating} readOnly size="sm" showText reviewCount={reviewCount} />
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base text-surface-foreground group-hover:text-primary-500 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-xs text-surface-foreground-muted line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-2 border-t border-surface-border/60">
          {instructor.avatarUrl ? (
            <img
              src={instructor.avatarUrl}
              alt={instructor.name}
              className="w-6 h-6 rounded-full object-cover border border-surface-border"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center text-[10px] font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
          )}
          <span className="text-xs font-medium text-surface-foreground-muted">
            {instructor.name}
          </span>
          <span className="text-surface-foreground-subtle text-xs">•</span>
          <span className="text-xs text-surface-foreground-subtle flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {lessonsCount} lessons
          </span>
        </div>

        {/* Progress bar if enrolled */}
        {progress !== undefined && (
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-surface-foreground-subtle">Course Progress</span>
              <span className="text-primary-500 font-bold">{progress}%</span>
            </div>
            <ProgressBar value={progress} max={100} size="sm" variant={isCompleted ? 'success' : 'primary'} />
          </div>
        )}

        {/* Footer: Price or Continue */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-surface-border/60">
          {price !== undefined && !isEnrolled ? (
            <div>
              <span className="text-[10px] text-surface-foreground-subtle uppercase tracking-wider block">
                Price
              </span>
              <span className="text-base font-extrabold font-display text-surface-foreground">
                {price === 0 ? 'Free' : `${price.toLocaleString()} ${currency}`}
              </span>
            </div>
          ) : null}

          <Button
            variant={isEnrolled ? (isCompleted ? 'outline' : 'primary') : 'primary'}
            size="sm"
            className={cn('shrink-0', (!price || isEnrolled) && 'w-full')}
            leftIcon={inProgress ? <PlayCircle className="w-4 h-4" /> : undefined}
            onClick={() => onActionClick?.(id)}
          >
            {actionText || (isCompleted ? 'Review Course' : inProgress ? 'Continue Learning' : isEnrolled ? 'Start' : 'Enroll Now')}
          </Button>
        </div>
      </div>
    </div>
  );
}
