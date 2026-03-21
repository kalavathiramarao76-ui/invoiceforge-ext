// BillCraft - Background Service Worker

// Open side panel when requested
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openSidePanel') {
    if (sender.tab?.windowId) {
      chrome.sidePanel.open({ windowId: sender.tab.windowId });
    } else {
      chrome.windows.getCurrent((win) => {
        if (win.id) chrome.sidePanel.open({ windowId: win.id });
      });
    }
    sendResponse({ success: true });
  }

  if (message.action === 'generateInvoice') {
    // Forward to side panel or handle in background
    sendResponse({ success: true });
  }

  return true;
});

// Set side panel behavior - open on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});

// Context menu for quick invoice generation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'invoiceforge-generate',
    title: 'Generate Invoice with BillCraft',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'invoiceforge-generate' && tab?.id) {
    chrome.sidePanel.open({ windowId: tab.windowId! });
  }
});

console.log('BillCraft background service worker loaded');
