// Mock document
global.document = {
  querySelectorAll: jest.fn(),
  readyState: 'complete'
};

// Mock Chrome API
global.chrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn((callback) => {
        // Store the callback for testing
        global.chrome.runtime.onMessage.callback = callback;
      }),
      callback: null
    },
    sendMessage: jest.fn()
  },
  storage: {
    sync: {
      get: jest.fn((keys, callback) => {
        // Mock default values
        callback({ filterEnabled: true });
      }),
      set: jest.fn((data, callback) => {
        if (callback) callback();
      })
    }
  },
  tabs: {
    query: jest.fn((queryInfo, callback) => {
      callback([{ id: 1 }]);
    }),
    sendMessage: jest.fn()
  }
}; 