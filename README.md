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

### Setup Development Environment

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate icons:

   ```bash
   npm run generate-icons
   ```

### Testing

The project includes unit tests and end-to-end tests:

1. Run unit tests:

   ```bash
   npm test
   ```

2. Run tests in watch mode:

   ```bash
   npm run test:watch
   ```

3. Run end-to-end tests:

   ```bash
   npm run test:e2e
   ```

### Building

1. Create a production build:

   ```bash
   npm run pack
   ```

   This will create an `extension.zip` file ready for distribution.

### Continuous Integration

The project uses GitHub Actions for CI/CD:

- Automated tests run on pull requests
- Release workflow creates packages for new tags
- Branch protection ensures code quality

## Contributing

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes
4. Run tests:

   ```bash
   npm test
   ```

5. Create a pull request

### Branch Protection

The `master` branch is protected:

- Requires pull request reviews
- Requires passing CI checks
- No direct pushes to master

## How it Works

The extension injects a content script into laneros.com pages that:

1. Identifies sold items using their CSS class
2. Finds the parent elements of these items
3. Hides the parent elements from view

## Usage

1. Click the extension icon in your Chrome toolbar
2. The extension will automatically start filtering sold items on laneros.com marketplace pages
3. You can disable the filtering by clicking the extension icon again

## Privacy

This extension:

- Does not collect any personal data
- Does not track your browsing
- Only runs on laneros.com
- Only stores your filter preference locally

For more details, see our [Privacy Policy](PRIVACY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
