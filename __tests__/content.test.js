describe('Content Script', () => {
  let document;

  beforeEach(() => {
    // Mock DOM elements
    document = {
      querySelectorAll: jest.fn(),
      readyState: 'complete'
    };
    global.document = document;
  });

  describe('hideSoldItems', () => {
    it('should hide elements with locked status', () => {
      const mockElement = {
        style: {}
      };
      document.querySelectorAll.mockReturnValue([mockElement]);

      // Import and run the function
      const { hideSoldItems } = require('../content');
      hideSoldItems();

      expect(document.querySelectorAll).toHaveBeenCalledWith(
        'div.structItem--thread:has(.structItem-status--locked)'
      );
      expect(mockElement.style.display).toBe('none');
    });

    it('should handle empty results', () => {
      document.querySelectorAll.mockReturnValue([]);

      const { hideSoldItems } = require('../content');
      hideSoldItems();

      expect(document.querySelectorAll).toHaveBeenCalled();
    });
  });

  describe('showAllItems', () => {
    it('should show elements with locked status', () => {
      const mockElement = {
        style: { display: 'none' }
      };
      document.querySelectorAll.mockReturnValue([mockElement]);

      const { showAllItems } = require('../content');
      showAllItems();

      expect(mockElement.style.display).toBe('');
    });
  });
}); 