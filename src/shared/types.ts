export interface InvoiceData {
  clientName: string;
  clientEmail?: string;
  service: string;
  amount: number;
  currency: string;
  dueDate?: string;
  invoiceNumber?: string;
  notes?: string;
  freelancerName?: string;
  freelancerEmail?: string;
}

export interface ProposalData {
  clientName: string;
  projectTitle: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  freelancerName?: string;
}

export interface ContractData {
  clientName: string;
  projectTitle: string;
  scope: string;
  payment: string;
  timeline: string;
  freelancerName?: string;
}

export type DocumentType = 'invoice' | 'proposal' | 'contract';

export interface GenerateRequest {
  type: DocumentType;
  data: InvoiceData | ProposalData | ContractData;
}

export interface Template {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  icon: string;
}
