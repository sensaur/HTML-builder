const path = require('path');
const directory = require('fs/promises');
const DIR_PATH_FROM = path.join(__dirname, 'styles')
const filePathFrom = file => path.join(__dirname, 'styles', file.name)

async function mergeStyles() {
  const filesToRead = await directory.readdir(DIR_PATH_FROM, {withFileTypes: true});
  let arr = [];
  for (let file of filesToRead) {
    if (file.isFile()) {
      const fileExtension = path.extname(path.join(__dirname, file.name)).replace(/./, "");
      if (fileExtension === 'css') {
        const styleCSSContent = await directory.readFile(filePathFrom(file), {encoding: 'utf8'});
        arr.push(styleCSSContent);
      }
    }
  }
  await directory.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), arr.join("\n"));
}

mergeStyles();
