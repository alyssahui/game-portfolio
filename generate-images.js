const fs = require('fs');
const path = require('path');

const picturesDir = path.join(__dirname, 'pictures');
const outputFile = path.join(__dirname, 'images.json');

fs.readdir(picturesDir, (err, files) => {
    if (err) {
        console.error('Error reading pictures directory:', err);
        return;
    }

    const images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.heic'].includes(ext);
    });

    fs.writeFile(outputFile, JSON.stringify(images, null, 2), err => {
        if (err) {
            console.error('Error writing images.json:', err);
        } else {
            console.log('Successfully generated images.json with', images.length, 'images.');
        }
    });
});
