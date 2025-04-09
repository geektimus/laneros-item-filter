// Import the module
const contentModule = require('../content');

describe('Content Script', () => {
  let mockElement;
  let consoleErrorSpy;

  beforeEach(() => {
    // Create a mock element
    mockElement = {
      style: {}
    };

    // Mock document.querySelectorAll
    document.querySelectorAll = jest.fn(() => [mockElement]);

    // Spy on console.error
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Clear module cache to ensure fresh imports
    jest.resetModules();
  });

  afterEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  describe('hideSoldItems', () => {
    it('should hide elements with locked status', () => {
      contentModule.hideSoldItems();

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
      expect(mockElement.style.display).toBe('none');
    });

    it('should handle empty results', () => {
      // Override the mock for this test
      document.querySelectorAll.mockReturnValueOnce([]);
      
      contentModule.hideSoldItems();

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
    });

    it('should handle errors and log them', () => {
      // Make querySelectorAll throw an error
      document.querySelectorAll.mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      contentModule.hideSoldItems();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error hiding sold items:',
        expect.any(Error)
      );
    });
  });

  describe('showAllItems', () => {
    it('should show elements with locked status', () => {
      mockElement.style.display = 'none';
      
      contentModule.showAllItems();

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
      expect(mockElement.style.display).toBe('');
    });

    it('should handle errors and log them', () => {
      // Make querySelectorAll throw an error
      document.querySelectorAll.mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      contentModule.showAllItems();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error showing sold items:',
        expect.any(Error)
      );
    });
  });

  describe('Message Listener', () => {
    it('should handle enableFilter message', () => {
      const sendResponse = jest.fn();
      
      // Get the stored callback from our mock
      const messageCallback = chrome.runtime.onMessage.callback;
      messageCallback({ action: 'enableFilter' }, {}, sendResponse);

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
      expect(sendResponse).toHaveBeenCalledWith({ success: true });
    });

    it('should handle disableFilter message', () => {
      const sendResponse = jest.fn();
      
      // Get the stored callback from our mock
      const messageCallback = chrome.runtime.onMessage.callback;
      messageCallback({ action: 'disableFilter' }, {}, sendResponse);

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
      expect(sendResponse).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('Initial State', () => {
    beforeEach(() => {
      // Reset the storage mock before each test
      chrome.storage.sync.get = jest.fn((keys, callback) => {
        callback({ filterEnabled: true });
      });
    });

    it('should check initial state and hide items if enabled', () => {
      // Re-require the module to trigger initial state check
      jest.resetModules();
      require('../content');

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
    });

    it('should not hide items if filter is disabled', () => {
      // Override the mock for this test
      chrome.storage.sync.get = jest.fn((keys, callback) => {
        callback({ filterEnabled: false });
      });

      // Re-require the module to trigger initial state check
      jest.resetModules();
      require('../content');

      expect(document.querySelectorAll).not.toHaveBeenCalled();
    });

    it('should handle loading state', () => {
      // Mock document.readyState as loading and addEventListener
      Object.defineProperty(document, 'readyState', {
        get: () => 'loading',
        configurable: true
      });
      document.addEventListener = jest.fn();

      // Re-require the module to trigger initial state check
      jest.resetModules();
      require('../content');

      expect(document.addEventListener).toHaveBeenCalledWith(
        'DOMContentLoaded',
        expect.any(Function)
      );

      // Call the DOMContentLoaded handler
      const handler = document.addEventListener.mock.calls[0][1];
      handler();

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItemContainer-group.js-threadList div.structItem--thread:has(.structItem-status--locked)'
      );
    });
  });
}); 