const constants = require('../constants');
const fs = require('fs');
const fileSystem = require('../utils/fileSystem');

module.exports = function(testID) {
  return new Promise(async (resolve, reject) => {
    const filename = `${constants.REPORTS_DIR}/${testID}.json`;

    if (fs.existsSync(filename) === false) {
      return null;
    }

    try {
      resolve(await fileSystem.readJSONFile(filename));
    } catch (err) {
      reject(err);
    }
  });
}
