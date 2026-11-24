import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/ui/primitives/input/Input';
import { Button } from '@/ui/primitives/button/Button';
import { Checkbox } from '@/ui/primitives/checkbox/Checkbox';
import { Divider } from '@/ui/primitives/divider/Divider';

export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string; rememberMe: boolean }) => Promise<void> | void;
  onForgotPassword?: () => void;
  onSocialLogin?: (provider: 'google' | 'github') => void;
  className?: string;
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSocialLogin,
  className,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await onSubmit?.({ email, password, rememberMe });
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4 w-full max-w-sm', className)}>
      {error && (
        <div className="p-3 rounded-lg border border-danger-500/20 bg-danger-500/10 text-danger-500 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Email */}
      <Input
        label="Email address"
        type="email"
        placeholder="abebe.bikila@telecom.et"
        leftIcon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <div className="space-y-1.5">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-surface-foreground-subtle hover:text-surface-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember me & Forgot Password */}
      <div className="flex items-center justify-between text-xs pt-1">
        <Checkbox
          checked={rememberMe}
          onChange={setRememberMe}
          label="Remember me"
        />
        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary-500 hover:underline font-medium cursor-pointer"
          >
            Forgot password?
          </button>
        )}
      </div>

      {/* Sign In CTA */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
      >
        Sign in to account
      </Button>

      {/* Social login buttons */}
      {onSocialLogin && (
        <>
          <Divider label="Or continue with" />
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSocialLogin('google')}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onSocialLogin('github')}
            >
              GitHub
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
