import React from 'react';
import { templates } from '../../shared/templates';
import { DocumentType } from '../../shared/types';

const typeColors: Record<DocumentType, string> = {
  invoice: 'text-green-400 bg-green-400/10',
  proposal: 'text-blue-400 bg-blue-400/10',
  contract: 'text-amber-400 bg-amber-400/10',
};

const typeIcons: Record<DocumentType, React.ReactNode> = {
  invoice: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  proposal: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  contract: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

export default function TemplatesView() {
  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Document Templates</h2>
        <span className="text-[10px] text-text-tertiary">{templates.length} templates</span>
      </div>

      <div className="space-y-2.5">
        {templates.map(template => (
          <div
            key={template.id}
            className="glass-card p-3.5 flex items-start gap-3 hover:border-forge-border-hover transition-all duration-200 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[template.type]}`}>
              {typeIcons[template.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                  {template.name}
                </h3>
                <span className={`text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${typeColors[template.type]}`}>
                  {template.type}
                </span>
              </div>
              <p className="text-xs text-text-tertiary mt-0.5">{template.description}</p>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-text-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-1"
            >
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        ))}
      </div>

      <div className="glass-card p-4 text-center">
        <p className="text-xs text-text-tertiary">
          Select a template to auto-fill the form. Switch to the corresponding tab to customize and generate.
        </p>
      </div>
    </div>
  );
}
