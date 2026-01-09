const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetDir = path.join(__dirname, 'app/Component/assets');

const collisions = [
    "images.jpg", "images.png",
    "images (1).jpg", "images (1).png",
    "images (2).jpg", "images (2).png"
];

(async () => {
    for (const file of collisions) {
        const inputPath = path.join(assetDir, file);
        const outputPath = path.join(assetDir, file + '.webp'); // e.g. images.jpg.webp

        try {
            if (fs.existsSync(inputPath)) {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Created: ${outputPath}`);
            } else {
                console.error(`Missing input: ${inputPath}`);
            }
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
})();
