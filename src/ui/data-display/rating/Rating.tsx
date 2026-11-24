import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Star } from 'lucide-react';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: RatingSize;
  showText?: boolean;
  reviewCount?: number;
}

export function Rating({
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 'md',
  showText = false,
  reviewCount,
  className,
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isControlled = value !== undefined;
  const currentRating = isControlled ? value : internalValue;
  const displayRating = hoverValue !== null ? hoverValue : currentRating;

  const handleClick = (starIndex: number) => {
    if (readOnly) return;
    if (!isControlled) {
      setInternalValue(starIndex);
    }
    onChange?.(starIndex);
  };

  const sizeStyles: Record<RatingSize, string> = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5 select-none', className)} {...props}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= displayRating;
          const isHalf = !isFilled && starNumber - 0.5 <= displayRating;

          return (
            <button
              key={index}
              type="button"
              disabled={readOnly}
              onClick={() => handleClick(starNumber)}
              onMouseEnter={() => !readOnly && setHoverValue(starNumber)}
              onMouseLeave={() => !readOnly && setHoverValue(null)}
              className={cn(
                'transition-transform',
                !readOnly && 'cursor-pointer hover:scale-110 focus-ring rounded p-0.5'
              )}
            >
              <Star
                className={cn(
                  sizeStyles[size],
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-surface-border fill-transparent'
                )}
              />
            </button>
          );
        })}
      </div>

      {(showText || reviewCount !== undefined) && (
        <span className="text-xs font-medium text-surface-foreground ml-1">
          {displayRating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-surface-foreground-subtle ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
