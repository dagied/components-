import React from 'react';
import { cn } from '@/ui/utils/cn';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/ui/primitives/button/Button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  errorCode?: string | number;
  title?: string;
  message?: string;
  onRetry?: () => void;
  action?: React.ReactNode;
}

export function ErrorState({
  errorCode,
  title = 'Something went wrong',
  message = 'An unexpected error occurred while processing your request. Please try again.',
  onRetry,
  action,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-danger-500/20 bg-danger-500/5 rounded-2xl',
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-500/10 border border-danger-500/25 mb-4 text-danger-500 shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      {errorCode && (
        <span className="font-mono text-xs font-semibold text-danger-500 tracking-wider uppercase mb-1">
          Error {errorCode}
        </span>
      )}

      <h4 className="text-base font-semibold text-surface-foreground">{title}</h4>
      <p className="text-xs text-surface-foreground-muted max-w-sm mt-1.5 leading-relaxed">
        {message}
      </p>

      <div className="flex items-center gap-3 mt-6">
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
        {action}
      </div>
    </div>
  );
}
