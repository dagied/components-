import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { User, Mail, Lock } from 'lucide-react';
import { Input } from '@/ui/primitives/input/Input';
import { Button } from '@/ui/primitives/button/Button';
import { Checkbox } from '@/ui/primitives/checkbox/Checkbox';
import { ProgressBar } from '@/ui/data-display/progress-bar/ProgressBar';

export interface SignupFormProps {
  onSubmit?: (data: { name: string; email: string; password: string }) => Promise<void> | void;
  className?: string;
}

export function SignupForm({ onSubmit, className }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = calculateStrength(password);
  const getStrengthLabel = () => {
    if (strength <= 25) return { label: 'Weak', variant: 'danger' as const };
    if (strength <= 50) return { label: 'Fair', variant: 'warning' as const };
    if (strength <= 75) return { label: 'Good', variant: 'accent' as const };
    return { label: 'Strong', variant: 'success' as const };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service to continue.');
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await onSubmit?.({ name, email, password });
    } catch (err: any) {
      setError(err?.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthInfo = getStrengthLabel();

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4 w-full max-w-sm', className)}>
      {error && (
        <div className="p-3 rounded-lg border border-danger-500/20 bg-danger-500/10 text-danger-500 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Full Name */}
      <Input
        label="Full name"
        placeholder="Bethlehem Tilahun"
        leftIcon={<User className="w-4 h-4" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Email */}
      <Input
        label="Email address"
        type="email"
        placeholder="bethlehem@solerebels.com"
        leftIcon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <div className="space-y-2">
        <Input
          label="Create password"
          type="password"
          placeholder="At least 8 characters"
          leftIcon={<Lock className="w-4 h-4" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password.length > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-surface-foreground-subtle">Strength:</span>
              <span className="font-semibold text-surface-foreground">{strengthInfo.label}</span>
            </div>
            <ProgressBar value={strength} variant={strengthInfo.variant} size="sm" />
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <Input
        label="Confirm password"
        type="password"
        placeholder="Re-enter password"
        leftIcon={<Lock className="w-4 h-4" />}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {/* Terms Checkbox */}
      <Checkbox
        checked={agreeTerms}
        onChange={setAgreeTerms}
        label="I agree to the Terms of Service & Privacy Policy"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
      >
        Create free account
      </Button>
    </form>
  );
}
