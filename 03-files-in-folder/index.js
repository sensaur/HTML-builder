const path = require('path');
const directory = require('fs/promises');
const SECRET_FOLDER_PATH = path.join(__dirname, 'secret-folder')

async function filesInFolder() {
  const files = await directory.readdir(SECRET_FOLDER_PATH, {withFileTypes: true});
  // console.log(files)
  for (let file of files) {
    if (file.isFile()) {
      const fileExtension = path.extname(path.join(__dirname, file.name)).replace(/./, "");
      const fileSize = (await directory.lstat(path.join(__dirname, 'secret-folder', file.name))).size;
      console.log(file.name.split(".")[0] + " - " + fileExtension + " - " + (fileSize / 1024).toFixed(3) + 'kb');
    }
  }
}

filesInFolder();

