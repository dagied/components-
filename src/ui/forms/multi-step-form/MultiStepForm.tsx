import React, { useState } from 'react';
import { cn } from '@/ui/utils/cn';
import { Stepper } from '@/ui/data-display/stepper/Stepper';
import { Input } from '@/ui/primitives/input/Input';
import { Button } from '@/ui/primitives/button/Button';
import { Card } from '@/ui/data-display/card/Card';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface MultiStepFormProps {
  onComplete?: (formData: Record<string, any>) => void;
  className?: string;
}

export function MultiStepForm({ onComplete, className }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    username: 'dawit.alemayehu',
    email: 'dawit@addistech.et',
    fullName: 'Dawit Alemayehu',
    phone: '+251 911 234 567',
    role: 'Frontend Architect',
    plan: 'Professional',
  });

  const steps = [
    { id: 'account', title: 'Account', description: 'Login credentials' },
    { id: 'profile', title: 'Profile', description: 'Personal details' },
    { id: 'review', title: 'Review', description: 'Verify & submit' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete?.(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className={cn('w-full max-w-lg p-6 sm:p-8 space-y-6', className)}>
      <Stepper steps={steps} currentStep={currentStep} />

      {isCompleted ? (
        <div className="flex flex-col items-center text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
          <div className="h-14 w-14 rounded-full bg-success-500/10 border border-success-500/20 text-success-500 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold font-display text-surface-foreground">Setup Complete!</h4>
          <p className="text-xs text-surface-foreground-muted max-w-xs leading-relaxed">
            Welcome aboard, {formData.fullName}. Your account has been provisioned and your workspace is ready.
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setIsCompleted(false);
              setCurrentStep(0);
            }}
          >
            Reset Form Demo
          </Button>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <Input
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <Input
                label="Work Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              <Input
                label="Phone Number (Ethiopia)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+251 9XX XXX XXX"
                required
              />
              <Input
                label="Professional Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-3 rounded-xl border border-surface-border bg-surface-muted/30 p-4 text-xs animate-in fade-in-50 duration-150">
              <h5 className="font-semibold text-surface-foreground mb-2">Review Your Information</h5>
              <div className="grid grid-cols-2 gap-2 text-surface-foreground-muted">
                <div>Username: <span className="font-medium text-surface-foreground">{formData.username}</span></div>
                <div>Email: <span className="font-medium text-surface-foreground">{formData.email}</span></div>
                <div>Name: <span className="font-medium text-surface-foreground">{formData.fullName}</span></div>
                <div>Phone: <span className="font-medium text-surface-foreground">{formData.phone}</span></div>
                <div>Role: <span className="font-medium text-surface-foreground">{formData.role}</span></div>
                <div>Plan: <span className="font-medium text-surface-foreground">{formData.plan}</span></div>
              </div>
            </div>
          )}

          {/* Stepper actions */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-border">
            <Button
              type="button"
              variant="outline"
              disabled={currentStep === 0}
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {currentStep === steps.length - 1 ? 'Finish & Create' : 'Next Step'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
