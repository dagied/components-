import React, { useId } from 'react';
import { cn } from '@/ui/utils/cn';
import { Info, AlertCircle } from 'lucide-react';
import { Tooltip } from '@/ui/primitives/tooltip/Tooltip';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string | boolean;
  info?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required = false,
  helperText,
  error,
  info,
  id: customId,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = customId || generatedId;
  const isError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={fieldId} className="flex items-center gap-1 text-xs font-medium text-surface-foreground">
            <span>{label}</span>
            {required && <span className="text-danger-500 font-bold">*</span>}
            {info && (
              <Tooltip content={info}>
                <span className="text-surface-foreground-subtle hover:text-surface-foreground cursor-pointer inline-flex">
                  <Info className="w-3.5 h-3.5" />
                </span>
              </Tooltip>
            )}
          </label>
        </div>
      )}

      {children}

      {(errorMessage || helperText) && (
        <div className="flex items-center gap-1.5 mt-0.5">
          {isError && <AlertCircle className="w-3.5 h-3.5 text-danger-500 shrink-0" />}
          <p
            className={cn(
              'text-xs tracking-normal leading-tight',
              isError ? 'text-danger-500 font-medium' : 'text-surface-foreground-subtle'
            )}
          >
            {errorMessage || helperText}
          </p>
        </div>
      )}
    </div>
  );
}
