// BillCraft - Content Script for Upwork & Fiverr

function isUpwork(): boolean {
  return window.location.hostname.includes('upwork.com');
}

function isFiverr(): boolean {
  return window.location.hostname.includes('fiverr.com');
}

function createInvoiceButton(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.id = 'invoiceforge-btn';
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
    <span>Generate Invoice</span>
  `;
  btn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  });
  return btn;
}

function injectButton() {
  if (document.getElementById('invoiceforge-btn')) return;

  const btn = createInvoiceButton();

  if (isUpwork()) {
    // Try to inject near job/contract headers
    const targets = [
      '.air3-truncation', // contract title
      '[data-test="contractTitle"]',
      '.up-card-header',
      '.job-details-header',
    ];
    for (const sel of targets) {
      const el = document.querySelector(sel);
      if (el) {
        el.parentElement?.insertBefore(btn, el.nextSibling);
        return;
      }
    }
  }

  if (isFiverr()) {
    const targets = [
      '.order-header',
      '.manage-orders-header',
      '[class*="order"]',
    ];
    for (const sel of targets) {
      const el = document.querySelector(sel);
      if (el) {
        el.parentElement?.insertBefore(btn, el.nextSibling);
        return;
      }
    }
  }

  // Fallback: floating button
  btn.classList.add('invoiceforge-floating');
  document.body.appendChild(btn);
}

// Run on load and observe DOM changes
function init() {
  // Wait for page to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectButton, 1500));
  } else {
    setTimeout(injectButton, 1500);
  }

  // Re-inject on SPA navigation
  const observer = new MutationObserver(() => {
    if (!document.getElementById('invoiceforge-btn')) {
      setTimeout(injectButton, 500);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

init();
console.log('BillCraft content script loaded');
