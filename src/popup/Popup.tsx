import React, { useState } from 'react';
import { generateDocument, extractHTML } from '../shared/api';
import { InvoiceData } from '../shared/types';

type View = 'form' | 'loading' | 'preview';

export default function Popup() {
  const [view, setView] = useState<View>('form');
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];

  const handleGenerate = async () => {
    if (!clientName || !service || !amount) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setView('loading');

    try {
      const data: InvoiceData = {
        clientName,
        service,
        amount: parseFloat(amount),
        currency: currencies.find(c => c === currency) ? currency : 'USD',
      };

      const result = await generateDocument('invoice', data);
      setPreview(extractHTML(result));
      setView('preview');
    } catch (err) {
      setError('Failed to generate invoice. Please try again.');
      setView('form');
    }
  };

  const openSidePanel = () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preview);
  };

  const printInvoice = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(preview);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="w-[380px] min-h-[500px] bg-forge-bg p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary">BillCraft</h1>
            <p className="text-[10px] text-accent font-medium tracking-wider uppercase">AI-Powered</p>
          </div>
        </div>
        <button
          onClick={openSidePanel}
          className="text-[11px] text-text-secondary hover:text-accent transition-colors flex items-center gap-1"
          title="Open full workspace"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="15" y1="3" x2="15" y2="21"/>
          </svg>
          Workspace
        </button>
      </div>

      {view === 'form' && (
        <div className="flex-1 flex flex-col gap-3 animate-fade-in">
          <div className="glass-card p-4 space-y-3">
            <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-accent/15 flex items-center justify-center text-accent text-[10px] font-bold">$</span>
              Quick Invoice
            </h2>

            <div>
              <label className="label-text">Client Name</label>
              <input
                type="text"
                className="input-field text-sm"
                placeholder="Acme Corporation"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
            </div>

            <div>
              <label className="label-text">Service Description</label>
              <input
                type="text"
                className="input-field text-sm"
                placeholder="Website redesign, Logo design..."
                value={service}
                onChange={e => setService(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="label-text">Amount</label>
                <input
                  type="number"
                  className="input-field text-sm"
                  placeholder="1500.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div className="w-24">
                <label className="label-text">Currency</label>
                <select
                  className="input-field text-sm"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                >
                  {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
          </div>

          <button onClick={handleGenerate} className="btn-primary w-full flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Generate Invoice
          </button>

          <div className="glass-card p-3 mt-auto">
            <p className="text-[11px] text-text-tertiary text-center">
              Need more options? Open the{' '}
              <button onClick={openSidePanel} className="text-accent hover:underline">
                full workspace
              </button>{' '}
              for proposals, contracts & templates.
            </p>
          </div>
        </div>
      )}

      {view === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center animate-glow-pulse">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="animate-spin" style={{ animationDuration: '2s' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-text-primary">Generating Invoice</p>
            <p className="text-xs text-text-tertiary mt-1">AI is crafting your document...</p>
          </div>
          <div className="w-48 h-1 bg-forge-card rounded-full overflow-hidden">
            <div className="h-full bg-accent loading-shimmer rounded-full" />
          </div>
        </div>
      )}

      {view === 'preview' && (
        <div className="flex-1 flex flex-col gap-3 animate-fade-in">
          <div className="glass-card flex-1 overflow-hidden">
            <div className="p-2 border-b border-forge-border flex items-center justify-between">
              <span className="text-xs font-medium text-text-secondary">Invoice Preview</span>
              <div className="flex gap-1.5">
                <button onClick={copyToClipboard} className="text-[10px] text-text-tertiary hover:text-accent transition-colors px-2 py-0.5 rounded bg-forge-bg/50">
                  Copy HTML
                </button>
                <button onClick={printInvoice} className="text-[10px] text-text-tertiary hover:text-accent transition-colors px-2 py-0.5 rounded bg-forge-bg/50">
                  Print
                </button>
              </div>
            </div>
            <iframe
              srcDoc={preview}
              className="w-full h-[320px] bg-white rounded-b-xl"
              sandbox="allow-same-origin"
              title="Invoice preview"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView('form')} className="btn-secondary flex-1 text-sm">
              New Invoice
            </button>
            <button onClick={printInvoice} className="btn-primary flex-1 text-sm flex items-center justify-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
