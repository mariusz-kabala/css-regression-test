const constants = require('../constants');
const fs = require('fs');

const readJSONFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return reject(err);
    }

    try {
      const content = JSON.parse(data);
      resolve(content);
    } catch (e) {
      return reject(e);
    }
  });
});

module.exports = function(testID) {
  return new Promise(async (resolve, reject) => {
    const filename = `${constants.REPORTS_DIR}/${testID}.json`;

    if (fs.existsSync(filename) === false) {
      return null;
    }

    try {
      resolve(await readJSONFile(filename));
    } catch (err) {
      reject(err);
    }
  });
}
