import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-surface-border bg-neutral-950 text-neutral-100 shadow-sm text-xs font-mono">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/60">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success-400" />
              <span className="text-success-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed scrollbar-thin">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
