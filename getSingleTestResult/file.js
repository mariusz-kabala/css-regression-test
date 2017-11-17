const constants = require('../constants');
const fs = require('fs');

const readJSONFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return reject(err);
    }

    try {
      const content = JSON.parse(data);
    } catch (e) {
      return reject(e);
    }

    resolve(content);
  });
});

module.exports = async function(testID) {
  const filename = `${constants.REPORTS_DIR}/${testID}.json`;

  if (fs.existsSync(filename) === false) {
    return null;
  }

  try {
    return await readJSONFile(filename);
  } catch (err) {
    return null;
  }
}
