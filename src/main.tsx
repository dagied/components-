import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';
import { ThemeProvider, ToastProvider } from '@/ui';
import { ShowcaseApp } from './showcase/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <ShowcaseApp />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
