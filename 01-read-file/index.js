const fs = require('fs')
const path = require('path')
let file = path.join(__dirname, 'text.txt')

const readableStream = fs.createReadStream(file, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));
