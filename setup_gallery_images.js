const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'app', 'Component', 'assets', 'gallery');
const destDir = path.join(__dirname, 'public', 'gallery');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Read files from source directory
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Error reading source directory:', err);
        return;
    }

    // Filter for image files
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp|heic)$/i.test(file));

    console.log(`Found ${imageFiles.length} images.`);

    const movedFiles = [];

    imageFiles.forEach((file, index) => {
        const ext = path.extname(file);
        const newFileName = `gallery-${index + 1}${ext}`;
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, newFileName);

        fs.copyFileSync(sourcePath, destPath);
        movedFiles.push({
            original: file,
            new: newFileName,
            path: `/gallery/${newFileName}`
        });
    });

    console.log('Images copied successfully.');
    console.log(JSON.stringify(movedFiles, null, 2));
});
