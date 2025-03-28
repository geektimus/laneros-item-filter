document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('filterToggle');
  const toggleLabel = document.getElementById('toggleLabel');

  // Load saved state
  chrome.storage.sync.get(['filterEnabled'], function(result) {
    toggle.checked = result.filterEnabled !== false;
    updateToggleLabel(toggle.checked);
  });

  // Handle toggle changes
  toggle.addEventListener('change', function() {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ filterEnabled: enabled });
    updateToggleLabel(enabled);

    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: enabled ? 'enableFilter' : 'disableFilter' });
    });
  });

  function updateToggleLabel(enabled) {
    toggleLabel.textContent = enabled ? 'Hide Sold Items' : 'Show All Items';
  }
}); 