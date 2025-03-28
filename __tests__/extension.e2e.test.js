const puppeteer = require('puppeteer');
const path = require('path');

describe('Extension End-to-End Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${path.join(__dirname, '..')}`,
        `--load-extension=${path.join(__dirname, '..')}`
      ]
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('should load the extension popup', async () => {
    // Open the extension popup
    const targets = await browser.targets();
    const extensionTarget = targets.find(target => target.type() === 'extension');
    const extensionUrl = extensionTarget.url();
    await page.goto(extensionUrl);

    // Check if the popup elements are present
    await expect(page).toHaveSelector('#filterToggle');
    await expect(page).toHaveSelector('#toggleLabel');
  });

  it('should toggle filter state', async () => {
    // Open the extension popup
    const targets = await browser.targets();
    const extensionTarget = targets.find(target => target.type() === 'extension');
    const extensionUrl = extensionTarget.url();
    await page.goto(extensionUrl);

    // Click the toggle
    await page.click('#filterToggle');

    // Check if the label changed
    const label = await page.$eval('#toggleLabel', el => el.textContent);
    expect(label).toBe('Show All Items');
  });
}); 