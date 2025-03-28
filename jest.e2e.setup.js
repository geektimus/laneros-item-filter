// Add custom matchers for Puppeteer
expect.extend({
  async toHaveSelector(page, selector) {
    const element = await page.$(selector);
    const pass = element !== null;

    return {
      pass,
      message: () =>
        `expected ${page.url()} to ${pass ? 'not ' : ''}have selector "${selector}"`
    };
  }
}); 