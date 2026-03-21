import React, { useState } from 'react';
import { generateDocument, extractHTML } from '../../shared/api';
import { ProposalData } from '../../shared/types';
import DocumentPreview from '../../components/DocumentPreview';

export default function ProposalWriter() {
  const [form, setForm] = useState<ProposalData>({
    clientName: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    freelancerName: '',
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof ProposalData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!form.clientName || !form.projectTitle || !form.projectDescription) {
      setError('Client name, project title, and description are required');
      return;
    }
    setError('');
    setLoading(true);
    setPreview('');

    try {
      const result = await generateDocument('proposal', form, (chunk) => {
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
    return <DocumentPreview html={preview} onBack={() => setPreview('')} title="Proposal" />;
  }

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="glass-card p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-primary">Proposal Details</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Your Name</label>
            <input className="input-field text-sm" placeholder="John Doe" value={form.freelancerName} onChange={e => update('freelancerName', e.target.value)} />
          </div>
          <div>
            <label className="label-text">Client Name *</label>
            <input className="input-field text-sm" placeholder="Acme Corp" value={form.clientName} onChange={e => update('clientName', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label-text">Project Title *</label>
          <input className="input-field text-sm" placeholder="E-commerce Website Redesign" value={form.projectTitle} onChange={e => update('projectTitle', e.target.value)} />
        </div>
        <div>
          <label className="label-text">Project Description *</label>
          <textarea className="input-field text-sm min-h-[100px] resize-none" placeholder="Describe the project scope, goals, and requirements..." value={form.projectDescription} onChange={e => update('projectDescription', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Budget</label>
            <input className="input-field text-sm" placeholder="$5,000 - $8,000" value={form.budget} onChange={e => update('budget', e.target.value)} />
          </div>
          <div>
            <label className="label-text">Timeline</label>
            <input className="input-field text-sm" placeholder="4-6 weeks" value={form.timeline} onChange={e => update('timeline', e.target.value)} />
          </div>
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
            Generate Proposal
          </>
        )}
      </button>
    </div>
  );
}
