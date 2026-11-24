import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className,
  ...props
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'w-full flex',
        isHorizontal ? 'items-center justify-between' : 'flex-col space-y-6',
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isClickable = Boolean(onStepClick);

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => isClickable && onStepClick?.(index)}
              className={cn(
                'flex items-center gap-3 select-none',
                isClickable && 'cursor-pointer'
              )}
            >
              {/* Step circle */}
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all shadow-xs',
                  isCompleted && 'bg-primary-600 text-white',
                  isActive && 'bg-surface border-2 border-primary-600 text-primary-600 ring-4 ring-primary-500/15',
                  !isCompleted && !isActive && 'border border-surface-border bg-surface-muted text-surface-foreground-subtle'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Title & description */}
              <div className="flex flex-col">
                <span
                  className={cn(
                    'text-xs font-semibold',
                    isActive ? 'text-primary-600 dark:text-primary-400' : 'text-surface-foreground'
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[11px] text-surface-foreground-subtle">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connecting line */}
            {isHorizontal && index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-3 transition-colors',
                  index < currentStep ? 'bg-primary-600' : 'bg-surface-border'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
