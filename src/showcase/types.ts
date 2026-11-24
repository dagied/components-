import React from 'react';

export type ComponentCategory =
  | 'Tokens & Theme'
  | 'Primitives'
  | 'Layout & Navigation'
  | 'Feedback & Overlays'
  | 'Data Display'
  | 'Forms & Inputs'
  | 'Page Sections'
  | 'Sample Applications';

export interface PropItem {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  wcagNotes?: string;
  keyboardShortcuts?: string[];
  props?: PropItem[];
  component: React.ComponentType<any>;
}
