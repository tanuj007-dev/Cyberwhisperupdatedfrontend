const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'app/Component/assets');
// const publicDir = path.join(__dirname, 'public'); 

function getCollisions(dir) {
    if (!fs.existsSync(dir)) return {};
    const files = fs.readdirSync(dir);
    const map = {};
    files.forEach(f => {
        const ext = path.extname(f).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const base = path.parse(f).name;
            if (!map[base]) map[base] = [];
            map[base].push(f);
        }
    });

    const collisions = {};
    for (const base in map) {
        if (map[base].length > 1) {
            collisions[base] = map[base];
        }
    }
    return collisions;
}

const c1 = getCollisions(assetDir);
// const c2 = getCollisions(publicDir);

console.log(JSON.stringify({ assets: c1 }, null, 2));
