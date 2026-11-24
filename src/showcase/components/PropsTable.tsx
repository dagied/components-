import React from 'react';
import { PropItem } from '../types';

export function PropsTable({ props }: { props: PropItem[] }) {
  if (!props || props.length === 0) {
    return (
      <p className="text-xs text-surface-foreground-subtle italic">
        Inherits standard HTML attributes without additional custom props.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-surface-border bg-surface-muted/40 text-[11px] font-semibold text-surface-foreground-subtle uppercase tracking-wider">
              <th className="p-3.5">Prop Name</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Default</th>
              <th className="p-3.5">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {props.map((p) => (
              <tr key={p.name} className="hover:bg-surface-muted/30 transition-colors">
                <td className="p-3.5 font-mono text-primary-500 font-semibold">
                  {p.name}
                  {p.required && <span className="text-danger-500 ml-1 font-bold">*</span>}
                </td>
                <td className="p-3.5 font-mono text-[11px] text-surface-foreground-muted">
                  <span className="px-1.5 py-0.5 rounded bg-surface-muted border border-surface-border">
                    {p.type}
                  </span>
                </td>
                <td className="p-3.5 font-mono text-[11px] text-surface-foreground-subtle">
                  {p.defaultValue || '—'}
                </td>
                <td className="p-3.5 text-surface-foreground-muted leading-relaxed">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
