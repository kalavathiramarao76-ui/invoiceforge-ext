import React, { useState } from 'react';
import { generateDocument, extractHTML } from '../../shared/api';
import { InvoiceData } from '../../shared/types';
import DocumentPreview from '../../components/DocumentPreview';

export default function InvoiceCreator() {
  const [form, setForm] = useState<InvoiceData>({
    clientName: '',
    clientEmail: '',
    service: '',
    amount: 0,
    currency: 'USD',
    dueDate: '',
    invoiceNumber: '',
    notes: '',
    freelancerName: '',
    freelancerEmail: '',
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'JPY', 'CHF'];

  const update = (field: keyof InvoiceData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!form.clientName || !form.service || !form.amount) {
      setError('Client name, service, and amount are required');
      return;
    }
    setError('');
    setLoading(true);
    setPreview('');

    try {
      const result = await generateDocument('invoice', form, (chunk) => {
        setPreview(extractHTML(chunk));
      });
      setPreview(extractHTML(result));
    } catch {
      setError('Failed to generate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (preview && !loading) {
    return <DocumentPreview html={preview} onBack={() => setPreview('')} title="Invoice" />;
  }

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="glass-card p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-primary">Your Details</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Your Name</label>
            <input className="input-field text-sm" placeholder="John Doe" value={form.freelancerName} onChange={e => update('freelancerName', e.target.value)} />
          </div>
          <div>
            <label className="label-text">Your Email</label>
            <input className="input-field text-sm" placeholder="john@example.com" value={form.freelancerEmail} onChange={e => update('freelancerEmail', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-card p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-primary">Client Details</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Client Name *</label>
            <input className="input-field text-sm" placeholder="Acme Corp" value={form.clientName} onChange={e => update('clientName', e.target.value)} />
          </div>
          <div>
            <label className="label-text">Client Email</label>
            <input className="input-field text-sm" placeholder="client@acme.com" value={form.clientEmail} onChange={e => update('clientEmail', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-card p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-primary">Invoice Details</h2>
        <div>
          <label className="label-text">Invoice Number</label>
          <input className="input-field text-sm" placeholder="INV-001 (auto-generated if empty)" value={form.invoiceNumber} onChange={e => update('invoiceNumber', e.target.value)} />
        </div>
        <div>
          <label className="label-text">Service Description *</label>
          <textarea className="input-field text-sm min-h-[60px] resize-none" placeholder="Website redesign, 5 pages responsive..." value={form.service} onChange={e => update('service', e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label-text">Amount *</label>
            <input type="number" className="input-field text-sm" placeholder="1500" value={form.amount || ''} onChange={e => update('amount', parseFloat(e.target.value) || 0)} />
          </div>
          <div>
            <label className="label-text">Currency</label>
            <select className="input-field text-sm" value={form.currency} onChange={e => update('currency', e.target.value)}>
              {currencies.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-text">Due Date</label>
            <input type="date" className="input-field text-sm" value={form.dueDate} onChange={e => update('dueDate', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label-text">Notes</label>
          <textarea className="input-field text-sm min-h-[50px] resize-none" placeholder="Payment terms, bank details..." value={form.notes} onChange={e => update('notes', e.target.value)} />
        </div>
      </div>

      {error && <p className="text-red-400 text-xs px-1">{error}</p>}

      <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-forge-bg/30 border-t-forge-bg rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Generate Invoice
          </>
        )}
      </button>
    </div>
  );
}
