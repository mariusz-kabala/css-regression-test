const fileSys = require('../utils/fileSystem');
const fs = require('fs');

module.exports = function({name, screenshotsDir, targetDir}) {
  if (name === 'last') {
    name = fileSys.getTheNewestFile(screenshotsDir);
  }

  const dirToUse = `${screenshotsDir}/${name}`;

  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(dirToUse) === false) {
      return reject(`Test run with name ${name} not found`);
    }

    if (fs.existsSync(targetDir) === true) {
      try {
        await fileSys.removeDir(targetDir);
      } catch (e) {
        return reject(e);
      }
    }

    try {
      await fileSys.copy(dirToUse, targetDir);
    } catch (e) {
      return reject(e);
    }

    resolve();
  });
}
