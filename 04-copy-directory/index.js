const path = require('path');
const directory = require('fs/promises');
const DIR_PATH_TO = path.join(__dirname, 'files-copy')
const filePathTo = file => path.join(__dirname, 'files-copy', file.name)
const DIR_PATH_FROM = path.join(__dirname, 'files')
const filePathFrom = file => path.join(__dirname, 'files', file.name)

async function copyDir() {
  const directoryCopy = await directory.mkdir(DIR_PATH_TO, {recursive: true});
  const filesCopied = await directory.readdir(DIR_PATH_TO, {withFileTypes: true});
  for (let fileCopied of filesCopied) {
    await directory.unlink(filePathTo(fileCopied));
  }
  const files = await directory.readdir(DIR_PATH_FROM, {withFileTypes: true});
  for (let file of files) {
    if (file.isFile()) {
      await directory.copyFile(filePathFrom(file), filePathTo(file));
    }
  }
}

copyDir()
