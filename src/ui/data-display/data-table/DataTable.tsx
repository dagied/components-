import React, { useState, useMemo } from 'react';
import { cn } from '@/ui/utils/cn';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { Pagination } from '@/ui/layout/pagination/Pagination';
import { Skeleton } from '@/ui/primitives/skeleton/Skeleton';
import { EmptyState } from '@/ui/feedback/empty-state/EmptyState';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  selectedKeys?: Set<string | number>;
  onSelectionChange?: (selectedKeys: Set<string | number>) => void;
  isLoading?: boolean;
  emptyText?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchKeys,
  pagination = true,
  pageSize = 5,
  selectable = false,
  selectedKeys = new Set(),
  onSelectionChange,
  isLoading = false,
  emptyText = 'No data available',
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filteredData = useMemo(() => {
    if (!query) return data;
    const lowerQuery = query.toLowerCase();
    return data.filter((item) => {
      if (searchKeys && searchKeys.length > 0) {
        return searchKeys.some((k) => String(item[k] ?? '').toLowerCase().includes(lowerQuery));
      }
      return Object.values(item).some((v) => String(v ?? '').toLowerCase().includes(lowerQuery));
    });
  }, [data, query, searchKeys]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      const compare = valA > valB ? 1 : -1;
      return sortOrder === 'asc' ? compare : -compare;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return;
    if (e.target.checked) {
      const allKeys = new Set(data.map(keyExtractor));
      onSelectionChange(allKeys);
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectRow = (key: string | number) => {
    if (!onSelectionChange) return;
    const next = new Set(selectedKeys);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectionChange(next);
  };

  const isAllSelected = data.length > 0 && selectedKeys.size === data.length;
  const isPartiallySelected = selectedKeys.size > 0 && selectedKeys.size < data.length;

  return (
    <div className={cn('flex flex-col gap-3 w-full', className)}>
      {/* Search Header */}
      {searchable && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-foreground-subtle" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-surface-border bg-surface text-xs text-surface-foreground placeholder:text-surface-foreground-subtle focus-ring"
            />
          </div>
          {selectable && selectedKeys.size > 0 && (
            <span className="text-xs font-medium text-primary-500">
              {selectedKeys.size} row(s) selected
            </span>
          )}
        </div>
      )}

      {/* Table container */}
      <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-surface-border bg-surface-muted/50 text-surface-foreground-subtle font-semibold uppercase tracking-wider text-[11px]">
                {selectable && (
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isPartiallySelected;
                      }}
                      onChange={handleSelectAll}
                      className="rounded border-surface-border cursor-pointer accent-primary-600"
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={cn(
                      'p-3.5',
                      col.sortable && 'cursor-pointer select-none hover:text-surface-foreground transition-colors',
                      col.className
                    )}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-surface-foreground-subtle">
                          {sortKey === col.key ? (
                            sortOrder === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-primary-500" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-primary-500" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-border">
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse">
                    {selectable && (
                      <td className="p-3.5 text-center">
                        <Skeleton variant="rectangular" className="h-4 w-4 mx-auto rounded" />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="p-3.5">
                        <Skeleton variant="text" className="h-4 w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center">
                    <EmptyState title="No records found" description={emptyText} />
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => {
                  const key = keyExtractor(row);
                  const isSelected = selectedKeys.has(key);
                  return (
                    <tr
                      key={key}
                      className={cn(
                        'transition-colors hover:bg-surface-muted/50',
                        isSelected && 'bg-primary-500/5'
                      )}
                    >
                      {selectable && (
                        <td className="p-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(key)}
                            className="rounded border-surface-border cursor-pointer accent-primary-600"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className={cn('p-3.5 text-surface-foreground', col.className)}>
                          {col.render ? col.render(row, idx) : String(row[col.key] ?? '')}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      {pagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showSummary
          totalItems={sortedData.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
