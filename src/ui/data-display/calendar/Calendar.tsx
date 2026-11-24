import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  className,
  ...props
}: CalendarProps) {
  const [internalDate, setInternalDate] = useState<Date>(defaultValue || new Date());
  const selectedDate = value !== undefined ? value : internalDate;

  const [viewDate, setViewDate] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const nextDate = new Date(currentYear, currentMonth, day);
    if (value === undefined) {
      setInternalDate(nextDate);
    }
    onChange?.(nextDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  return (
    <div
      className={cn(
        'w-64 p-3.5 rounded-2xl border border-surface-border bg-surface-card shadow-sm select-none',
        className
      )}
      {...props}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold text-surface-foreground">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="p-1 rounded-md text-surface-foreground-subtle hover:text-surface-foreground hover:bg-surface-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-1 rounded-md text-surface-foreground-subtle hover:text-surface-foreground hover:bg-surface-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {daysOfWeek.map((d) => (
          <span key={d} className="text-[11px] font-medium text-surface-foreground-subtle">
            {d}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleSelectDay(day)}
              className={cn(
                'h-7 w-7 mx-auto rounded-lg text-xs font-medium flex items-center justify-center transition-colors cursor-pointer',
                selected
                  ? 'bg-primary-600 text-white font-semibold shadow-xs'
                  : today
                  ? 'border border-primary-500/50 text-primary-500 font-semibold hover:bg-primary-500/10'
                  : 'text-surface-foreground hover:bg-surface-muted'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
