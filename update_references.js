const fs = require('fs');
const path = require('path');

const dirsToScan = [
    path.join(__dirname, 'app'),
    path.join(__dirname, 'components'),
    path.join(__dirname, 'contexts'),
    path.join(__dirname, 'data'),
    path.join(__dirname, 'lib')
];

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

let modifiedFiles = 0;

console.log('Starting reference update...');

dirsToScan.forEach(d => {
    walkDir(d, (filePath) => {
        const ext = path.extname(filePath);
        // Only process code/text files
        if (!['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md'].includes(ext)) return;

        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Replace extensions
            // Order: .jpeg before .jpg to avoid partial match issues if using greedy regex (though literal match is fine)
            content = content.replace(/\.jpeg/gi, '.webp');
            content = content.replace(/\.png/gi, '.webp');
            content = content.replace(/\.jpg/gi, '.webp');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated references in: ${filePath}`);
                modifiedFiles++;
            }
        } catch (err) {
            console.error(`Error processing ${filePath}:`, err);
        }
    });
});

console.log(`Finished updating references. Modified ${modifiedFiles} files.`);
