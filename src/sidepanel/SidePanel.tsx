import React, { useState } from 'react';
import InvoiceCreator from './views/InvoiceCreator';
import ProposalWriter from './views/ProposalWriter';
import ContractGenerator from './views/ContractGenerator';
import TemplatesView from './views/TemplatesView';

type Tab = 'invoice' | 'proposal' | 'contract' | 'templates';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'invoice',
    label: 'Invoice',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'proposal',
    label: 'Proposal',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    id: 'contract',
    label: 'Contract',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
];

export default function SidePanel() {
  const [activeTab, setActiveTab] = useState<Tab>('invoice');

  return (
    <div className="h-screen flex flex-col bg-forge-bg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-forge-border bg-forge-surface/50 backdrop-blur-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-primary">BillCraft</h1>
            <p className="text-[10px] text-text-tertiary">Full Workspace</p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-forge-border bg-forge-surface/30">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-accent border-accent bg-accent/5'
                : 'text-text-tertiary border-transparent hover:text-text-secondary hover:bg-forge-card/30'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'invoice' && <InvoiceCreator />}
        {activeTab === 'proposal' && <ProposalWriter />}
        {activeTab === 'contract' && <ContractGenerator />}
        {activeTab === 'templates' && <TemplatesView />}
      </div>
    </div>
  );
}
