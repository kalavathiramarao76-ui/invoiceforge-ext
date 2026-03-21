import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'quick-invoice',
    name: 'Quick Invoice',
    type: 'invoice',
    description: 'Simple one-page invoice for quick billing',
    icon: 'receipt',
  },
  {
    id: 'detailed-invoice',
    name: 'Detailed Invoice',
    type: 'invoice',
    description: 'Multi-line item invoice with tax calculations',
    icon: 'description',
  },
  {
    id: 'project-proposal',
    name: 'Project Proposal',
    type: 'proposal',
    description: 'Full project proposal with scope and timeline',
    icon: 'assignment',
  },
  {
    id: 'freelance-contract',
    name: 'Freelance Contract',
    type: 'contract',
    description: 'Standard freelance service agreement',
    icon: 'gavel',
  },
  {
    id: 'nda-contract',
    name: 'NDA Agreement',
    type: 'contract',
    description: 'Non-disclosure agreement template',
    icon: 'security',
  },
  {
    id: 'retainer-proposal',
    name: 'Retainer Proposal',
    type: 'proposal',
    description: 'Monthly retainer engagement proposal',
    icon: 'autorenew',
  },
];
