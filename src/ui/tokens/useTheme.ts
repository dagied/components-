import { use } from 'react';
import { ThemeContext, type ThemeContextType } from './ThemeProvider';

/**
 * Custom hook to access theme state and toggle actions using the React 19 `use()` hook.
 */
export function useTheme(): ThemeContextType {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
