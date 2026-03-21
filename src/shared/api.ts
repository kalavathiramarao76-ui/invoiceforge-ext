import { DocumentType, InvoiceData, ProposalData, ContractData } from './types';

const API_URL = 'https://sai.sharedllm.com/v1/chat/completions';
const MODEL = 'gpt-oss:120b';

function buildPrompt(type: DocumentType, data: InvoiceData | ProposalData | ContractData): string {
  switch (type) {
    case 'invoice': {
      const d = data as InvoiceData;
      return `Generate a professional invoice in clean HTML format with inline CSS styling. Use a modern, clean design with green (#22c55e) accents.

Details:
- Invoice #: ${d.invoiceNumber || 'INV-' + Date.now().toString().slice(-6)}
- From: ${d.freelancerName || 'Freelancer'}${d.freelancerEmail ? ` (${d.freelancerEmail})` : ''}
- To: ${d.clientName}${d.clientEmail ? ` (${d.clientEmail})` : ''}
- Service: ${d.service}
- Amount: ${d.currency}${d.amount.toFixed(2)}
- Due Date: ${d.dueDate || 'Upon receipt'}
${d.notes ? `- Notes: ${d.notes}` : ''}

Return ONLY the HTML. Make it print-ready with proper margins. Include a table for line items.`;
    }
    case 'proposal': {
      const d = data as ProposalData;
      return `Generate a professional project proposal in clean HTML format with inline CSS styling. Use a modern design with green (#22c55e) accents.

Details:
- From: ${d.freelancerName || 'Freelancer'}
- To: ${d.clientName}
- Project: ${d.projectTitle}
- Description: ${d.projectDescription}
${d.budget ? `- Budget: ${d.budget}` : ''}
${d.timeline ? `- Timeline: ${d.timeline}` : ''}

Include sections: Executive Summary, Scope of Work, Timeline, Deliverables, Pricing, Terms.
Return ONLY the HTML.`;
    }
    case 'contract': {
      const d = data as ContractData;
      return `Generate a professional freelance contract in clean HTML format with inline CSS styling. Use a modern design with green (#22c55e) accents.

Details:
- Freelancer: ${d.freelancerName || 'Freelancer'}
- Client: ${d.clientName}
- Project: ${d.projectTitle}
- Scope: ${d.scope}
- Payment: ${d.payment}
- Timeline: ${d.timeline}

Include sections: Parties, Scope of Work, Payment Terms, Timeline, Intellectual Property, Confidentiality, Termination, Signatures.
Return ONLY the HTML.`;
    }
  }
}

export async function generateDocument(
  type: DocumentType,
  data: InvoiceData | ProposalData | ContractData,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const prompt = buildPrompt(type, data);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a professional document generator for freelancers. Generate clean, professional HTML documents with inline CSS. Always use a modern design aesthetic.'
        },
        { role: 'user', content: prompt }
      ],
      stream: !!onChunk,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  if (onChunk && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            fullText += content;
            onChunk(fullText);
          }
        } catch {}
      }
    }
    return fullText;
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content || '';
}

export function extractHTML(text: string): string {
  // Extract HTML from markdown code blocks if present
  const htmlMatch = text.match(/```html?\s*([\s\S]*?)```/);
  if (htmlMatch) return htmlMatch[1].trim();
  // If it starts with < assume it's raw HTML
  if (text.trim().startsWith('<')) return text.trim();
  return text;
}
