const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'app/Component/assets');
// Also check public if needed, but user didn't specify. I'll stick to assets for now based on 'replace whole application images' and finding many in assets.
// Actually, public folder is also a common place. grep search just showed files in app... 
// checking file listing... 'public' has children.
// "replace whole application images" implies ALL images.
// I should probably check public as well.

const dirsToScan = [
    path.join(__dirname, 'app/Component/assets'),
    path.join(__dirname, 'public')
];

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const imagesToConvert = [];

dirsToScan.forEach(d => {
    walkDir(d, (filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            imagesToConvert.push(filePath);
        }
    });
});

(async () => {
    console.log(`Found ${imagesToConvert.length} images to convert.`);
    for (const filePath of imagesToConvert) {
        const ext = path.extname(filePath);
        const webpPath = filePath.replace(new RegExp(ext + '$', 'i'), '.webp');

        // Skip if webp already exists (optional, but good for idempotency)
        if (fs.existsSync(webpPath)) {
            // console.log(`Skipping (already exists): ${webpPath}`);
            // actually, might want to overwrite to ensure consistency? 
            // Let's overwrite.
        }

        try {
            await sharp(filePath)
                .webp({ quality: 80 })
                .toFile(webpPath);
            console.log(`Converted: ${filePath} -> ${webpPath}`);
        } catch (err) {
            console.error(`Failed to convert ${filePath}:`, err);
        }
    }
    console.log('Conversion complete.');
})();
