import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/ui/primitives/button/Button';

export interface NotFoundPageProps extends React.HTMLAttributes<HTMLDivElement> {
  onGoHome?: () => void;
  onGoBack?: () => void;
  homeUrl?: string;
  title?: string;
  description?: string;
}

export function NotFoundPage({
  onGoHome,
  onGoBack,
  homeUrl = '/',
  title = 'Page Not Found',
  description = 'Sorry, the page you are looking for does not exist, has been removed, or was moved to another location.',
  className,
  ...props
}: NotFoundPageProps) {
  return (
    <div
      className={cn(
        'min-h-[500px] w-full flex flex-col items-center justify-center text-center p-6 sm:p-12',
        className
      )}
      {...props}
    >
      {/* 404 badge */}
      <div className="relative mb-6">
        <span className="font-display text-8xl sm:text-9xl font-black text-surface-muted select-none tracking-tight">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-2xl bg-primary-600/10 border border-primary-500/20 backdrop-blur-md flex items-center justify-center text-primary-500">
            <Search className="w-8 h-8" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-foreground">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-surface-foreground-muted max-w-md mt-2 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        {onGoBack && (
          <Button
            type="button"
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={onGoBack}
          >
            Go Back
          </Button>
        )}
        <Button
          type="button"
          variant="primary"
          leftIcon={<Home className="w-4 h-4" />}
          onClick={onGoHome ? onGoHome : () => (window.location.href = homeUrl)}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
