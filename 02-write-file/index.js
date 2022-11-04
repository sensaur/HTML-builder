const fs = require("fs")
const path = require("path")
const process = require("process")
const readLine = require('readline');
const res = fs.createWriteStream(path.join(__dirname, "text.txt"))
const {stdin, stdout, exit} = process

stdout.write(`Enter message\n`)
const rl = readLine.createInterface(stdin, stdout);

rl.on('line', (text) => {
  if (text.toString().match(/exit/i)) {
    exit();
  }
  res.write(text + "\n");
});

process.on('exit', () => {
  console.log('Bye!');
});
