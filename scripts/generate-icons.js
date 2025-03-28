const sharp = require('sharp');
const path = require('path');

const sizes = [16, 48, 128];
const svgPath = path.join(__dirname, '../icons/icon.svg');

async function generateIcons() {
  for (const size of sizes) {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../icons/icon${size}.png`));
    console.log(`Generated ${size}x${size} icon`);
  }
}

generateIcons().catch(console.error); 