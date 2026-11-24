import React, { useState, useRef } from 'react';
import { cn } from '@/ui/utils/cn';
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react';
import { ProgressBar } from '@/ui/data-display/progress-bar/ProgressBar';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export interface FileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  accept = 'image/*,application/pdf',
  maxSizeMB = 10,
  multiple = true,
  onFilesSelected,
  className,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileList, setFileList] = useState<UploadedFileItem[]>([
    {
      id: 'demo-1',
      name: 'addis-fintech-report-2026.pdf',
      size: 2450000,
      progress: 100,
      status: 'completed',
    },
    {
      id: 'demo-2',
      name: 'ethiopian-telecom-license.png',
      size: 1180000,
      progress: 68,
      status: 'uploading',
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    onFilesSelected?.(fileArray);

    const newItems: UploadedFileItem[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      progress: 100,
      status: 'completed',
    }));

    setFileList((prev) => [...prev, ...newItems]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const removeFile = (id: string) => {
    setFileList((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={cn('space-y-4 w-full', className)}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center select-none',
          isDragOver
            ? 'border-primary-500 bg-primary-500/10 scale-[1.01]'
            : 'border-surface-border bg-surface-card hover:border-neutral-400 dark:hover:border-neutral-600'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="h-12 w-12 rounded-xl bg-surface-muted flex items-center justify-center text-primary-500 mb-3 border border-surface-border shadow-xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <h4 className="text-xs sm:text-sm font-semibold text-surface-foreground">
          Click or drag files to upload
        </h4>
        <p className="text-xs text-surface-foreground-muted mt-1">
          Supports PDF, PNG, JPG, and CSV up to {maxSizeMB}MB
        </p>
      </div>

      {/* File list preview */}
      {fileList.length > 0 && (
        <div className="space-y-2">
          {fileList.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 rounded-xl border border-surface-border bg-surface-card text-xs gap-3"
            >
              <div className="flex items-center gap-2.5 truncate flex-1">
                <FileText className="w-4 h-4 text-surface-foreground-subtle shrink-0" />
                <div className="truncate flex-1">
                  <span className="font-medium text-surface-foreground truncate block">{file.name}</span>
                  <div className="flex items-center gap-2 text-[11px] text-surface-foreground-subtle mt-0.5">
                    <span>{formatFileSize(file.size)}</span>
                    {file.status === 'uploading' && (
                      <span className="text-primary-500 font-medium">Uploading ({file.progress}%)</span>
                    )}
                    {file.status === 'completed' && (
                      <span className="text-success-500 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </div>
                  {file.status === 'uploading' && (
                    <ProgressBar value={file.progress} size="sm" className="mt-1" />
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
                className="p-1 rounded-md text-surface-foreground-subtle hover:text-surface-foreground hover:bg-surface-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
