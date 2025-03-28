// Function to hide sold items
function hideSoldItems() {
  try {
    const soldItems = document.querySelectorAll("div.structItem--thread:has(.structItem-status--locked)");
    soldItems.forEach(el => {
      if (el && el.style) {
        el.style.display = 'none';
      }
    });
  } catch (error) {
    console.error('Error hiding sold items:', error);
  }
}

// Function to show all items
function showAllItems() {
  try {
    const soldItems = document.querySelectorAll("div.structItem--thread:has(.structItem-status--locked)");
    soldItems.forEach(el => {
      if (el && el.style) {
        el.style.display = '';
      }
    });
  } catch (error) {
    console.error('Error showing sold items:', error);
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'enableFilter') {
    hideSoldItems();
  } else if (request.action === 'disableFilter') {
    showAllItems();
  }
  // Send response to acknowledge receipt
  sendResponse({ success: true });
  return true; // Keep the message channel open for async response
});

// Initial state check
chrome.storage.sync.get(['filterEnabled'], function(result) {
  if (result.filterEnabled !== false) {
    // Wait for the DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hideSoldItems);
    } else {
      hideSoldItems();
    }
  }
}); 