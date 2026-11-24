import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
  className,
}: OtpInputProps) {
  const [internalOtp, setInternalOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const otpArray = value !== undefined ? value.split('').slice(0, length) : internalOtp;

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1);
    const newOtp = [...otpArray];
    newOtp[index] = char;

    if (value === undefined) {
      setInternalOtp(newOtp);
    }
    onChange?.(newOtp.join(''));

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim().slice(0, length);
    if (!pastedData) return;

    const chars = pastedData.split('');
    const newOtp = [...otpArray];
    chars.forEach((c, i) => {
      newOtp[i] = c;
    });

    if (value === undefined) {
      setInternalOtp(newOtp);
    }
    onChange?.(newOtp.join(''));
    const nextIndex = Math.min(chars.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className={cn('flex items-center gap-2 sm:gap-3', className)}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otpArray[i] || ''}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            'h-12 w-10 sm:h-14 sm:w-12 text-center text-lg font-bold font-mono rounded-xl border bg-surface transition-all select-none',
            error
              ? 'border-danger-500 focus-ring ring-danger-500/30'
              : 'border-surface-border focus-ring ring-primary-500/20 focus:border-primary-500',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-muted'
          )}
        />
      ))}
    </div>
  );
}
