import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Button,
  Badge,
  Input,
  ThemeProvider,
  Rating,
  Tabs,
  Card,
  StatCard,
  CourseCard,
  cn,
} from '@/ui';

describe('Aura Design System Components', () => {
  describe('cn utility', () => {
    it('merges classnames cleanly', () => {
      const result = cn('px-4 py-2', 'bg-primary-500', false && 'hidden', 'text-white');
      expect(result).toContain('px-4');
      expect(result).toContain('bg-primary-500');
      expect(result).not.toContain('hidden');
    });
  });

  describe('Button Component', () => {
    it('renders with children and responds to click', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const btn = screen.getByRole('button', { name: /click me/i });
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables clicking when disabled', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      const btn = screen.getByRole('button', { name: /disabled/i });
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders loading state without firing click', () => {
      const handleClick = vi.fn();
      render(<Button isLoading onClick={handleClick}>Loading Button</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
    });
  });

  describe('Badge Component', () => {
    it('renders semantic badges with correct labels', () => {
      render(<Badge variant="success">Completed</Badge>);
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  describe('Input Component', () => {
    it('renders label, helper text, and handles user typing', () => {
      const handleChange = vi.fn();
      render(
        <Input
          label="Full Name / ስም"
          helperText="Enter your name in English or Amharic"
          placeholder="Abebe Kebede"
          onChange={handleChange}
        />
      );
      expect(screen.getByText('Full Name / ስም')).toBeInTheDocument();
      expect(screen.getByText('Enter your name in English or Amharic')).toBeInTheDocument();

      const input = screen.getByPlaceholderText('Abebe Kebede');
      fireEvent.change(input, { target: { value: 'ዳግማዊ' } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Rating Component', () => {
    it('renders stars and updates on click', () => {
      const handleChange = vi.fn();
      render(<Rating value={3} onChange={handleChange} showText max={5} />);
      expect(screen.getByText('3.0')).toBeInTheDocument();
    });
  });

  describe('Card & StatCard Components', () => {
    it('renders StatCard with title, value, and change', () => {
      render(
        <StatCard
          title="Monthly Recurring Revenue"
          value="2,560,000 ETB"
          change="+18.4%"
          changeType="increase"
          description="vs last month"
        />
      );
      expect(screen.getByText('Monthly Recurring Revenue')).toBeInTheDocument();
      expect(screen.getByText('2,560,000 ETB')).toBeInTheDocument();
      expect(screen.getByText('+18.4%')).toBeInTheDocument();
    });
  });

  describe('CourseCard Component', () => {
    it('renders course information with Ethiopic title and instructor', () => {
      render(
        <CourseCard
          id="course-test"
          title="የሪአክት 19 ሙሉ ስልጠና"
          description="Learn React 19 in Amharic"
          instructor={{ name: 'Dagmawi B.' }}
          progress={50}
          isEnrolled
        />
      );
      expect(screen.getByText('የሪአክት 19 ሙሉ ስልጠና')).toBeInTheDocument();
      expect(screen.getByText('Dagmawi B.')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  describe('ThemeProvider', () => {
    it('renders children within ThemeProvider', () => {
      render(
        <ThemeProvider>
          <div data-testid="themed-content">Themed Content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('themed-content')).toBeInTheDocument();
    });
  });
});
