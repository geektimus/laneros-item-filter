# Laneros Item Filter Chrome Extension

This Chrome extension helps you filter out sold items on laneros.com marketplace by hiding them from view.

## Features

- Automatically hides sold items from the marketplace listings
- Works on laneros.com marketplace pages
- Easy to enable/disable through the extension popup

## Installation

### Development Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

### Production Installation

1. Download the latest release from the [Releases](https://github.com/yourusername/laneros-item-filter/releases) page
2. Extract the downloaded zip file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the extracted directory

## Development

The extension consists of the following main components:

- `manifest.json`: Extension configuration file
- `popup.html`: Extension popup interface
- `popup.js`: Popup logic
- `content.js`: Script that runs on laneros.com pages
- `styles.css`: Extension styles
- `icons/`: Directory containing extension icons (16x16, 48x48, and 128x128 pixels)

### Required Icons

You'll need to add three icon files to the `icons/` directory:

- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

These icons will be used in the Chrome toolbar and extension management page.

### Building the Extension

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate icons:

   ```bash
   npm run generate-icons
   ```

3. Pack the extension:

   ```bash
   npm run pack
   ```

This will create an `extension.zip` file containing the packed extension.

### Publishing to Chrome Web Store

1. Create a Chrome Web Store Developer account at https://chrome.google.com/webstore/devconsole
2. Pay the one-time registration fee
3. Click "New Item" and upload the `extension.zip` file
4. Fill in the required information:
   - Detailed description
   - Screenshots
   - Privacy policy
   - Category (Productivity)
5. Submit for review

Note: The review process typically takes a few business days.

## How it Works

The extension injects a content script into laneros.com pages that:

1. Identifies sold items using their CSS class
2. Finds the parent elements of these items
3. Hides the parent elements from view

## Usage

1. Click the extension icon in your Chrome toolbar
2. The extension will automatically start filtering sold items on laneros.com marketplace pages
3. You can disable the filtering by clicking the extension icon again

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 