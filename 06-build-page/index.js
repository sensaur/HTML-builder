const path = require('path');
const directory = require('fs/promises');
const DIR_PATH_FROM = path.join(__dirname, 'assets');
const DIR_PATH_TO = path.join(__dirname, 'project-dist', 'assets');

async function bundleHTML() {
  const projectDist = await directory.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
  let template = await directory.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf8'});
  const componentNames = template.match(/{{[A-Za-z]+}}/g);
  // console.log(componentNames)
  const components = await directory.readdir(path.join(__dirname, 'components'), {withFileTypes: false});
  // console.log(components)
  for (let i = 0; i < components.length; i++) {
    for (let j = 0; j < componentNames.length; j++)
      if (componentNames[j].replace(/{|}/g, "") === components[i].replace(/.html/g, "")) {
        const content = await directory.readFile(path.join(__dirname, 'components', components[i]), {encoding: 'utf8'});
        template = template.replace(componentNames[j], content);
      }
  }
  await directory.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}

async function mergeStyles() {
  const files = await directory.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
  let arr = [];
  for (let file of files) {
    if (file.isFile()) {
      const fileExtension = path.extname(path.join(__dirname, file.name)).replace(/./, "");
      if (fileExtension === 'css') {
        const content = await directory.readFile(path.join(__dirname, 'styles', file.name), {encoding: 'utf8'});
        arr.push(content);
      }

    }
  }
  await directory.writeFile(path.join(__dirname, 'project-dist', 'style.css'), arr.join("\n"));
}

async function copyAssets(from, to) {
  const folderCopy = await directory.mkdir(to, {recursive: true});
  const filesCopied = await directory.readdir(to, {withFileTypes: true});
  const files = await directory.readdir(from, {withFileTypes: true});
  for (let file of files) {
    if (file.isFile()) {
      await directory.copyFile(path.join(from, file.name), path.join(to, file.name));

    } else {
      const newPath = path.join(from, file.name);
      const newDest = path.join(to, file.name);
      await copyAssets(newPath, newDest);
    }
  }
}

bundleHTML();
mergeStyles();
copyAssets(DIR_PATH_FROM, DIR_PATH_TO);
