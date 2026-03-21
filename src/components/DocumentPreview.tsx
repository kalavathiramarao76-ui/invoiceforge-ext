import React from 'react';

interface Props {
  html: string;
  onBack: () => void;
  title: string;
}

export default function DocumentPreview({ html, onBack, title }: Props) {
  const copyHTML = () => navigator.clipboard.writeText(html);

  const printDoc = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.print();
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase()}-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Toolbar */}
      <div className="px-4 py-2.5 border-b border-forge-border bg-forge-surface/30 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Form
        </button>
        <div className="flex items-center gap-2">
          <button onClick={copyHTML} className="text-[10px] text-text-tertiary hover:text-accent transition-colors px-2 py-1 rounded bg-forge-card border border-forge-border">
            Copy
          </button>
          <button onClick={downloadHTML} className="text-[10px] text-text-tertiary hover:text-accent transition-colors px-2 py-1 rounded bg-forge-card border border-forge-border">
            Download
          </button>
          <button onClick={printDoc} className="text-[10px] text-forge-bg font-medium px-2 py-1 rounded bg-accent hover:bg-accent-hover transition-colors">
            Print
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 p-3">
        <div className="glass-card h-full overflow-hidden">
          <iframe
            srcDoc={html}
            className="w-full h-full bg-white rounded-xl"
            sandbox="allow-same-origin"
            title={`${title} preview`}
          />
        </div>
      </div>
    </div>
  );
}
