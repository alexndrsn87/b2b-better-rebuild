const fs = require('fs');
const image = fs.readFileSync('screenshot.png');
console.log(image.toString('base64'));
