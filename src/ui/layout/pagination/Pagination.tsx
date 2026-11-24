import React from 'react';
import { cn } from '@/ui/utils/cn';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showSummary?: boolean;
  totalItems?: number;
  pageSize?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showSummary = false,
  totalItems,
  pageSize = 10,
  className,
  ...props
}: PaginationProps) {
  const generatePagination = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'dots', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [1, 'dots', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }

    return [];
  };

  const pages = generatePagination();

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || totalPages * pageSize);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-col sm:flex-row items-center justify-between gap-3 text-xs', className)}
      {...props}
    >
      {showSummary && totalItems !== undefined && (
        <span className="text-surface-foreground-muted">
          Showing <span className="font-semibold text-surface-foreground">{startItem}</span> to{' '}
          <span className="font-semibold text-surface-foreground">{endItem}</span> of{' '}
          <span className="font-semibold text-surface-foreground">{totalItems}</span> results
        </span>
      )}

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-surface text-surface-foreground hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-ring"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page items */}
        {pages.map((page, index) => {
          if (page === 'dots') {
            return (
              <span key={`dots-${index}`} className="flex h-8 w-8 items-center justify-center text-surface-foreground-subtle">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors focus-ring cursor-pointer',
                isActive
                  ? 'bg-primary-600 text-white font-semibold shadow-xs'
                  : 'border border-surface-border bg-surface text-surface-foreground hover:bg-surface-muted'
              )}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-surface text-surface-foreground hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-ring"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
