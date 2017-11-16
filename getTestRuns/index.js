const constants = require('../constants');
const fs = require('fs');

const readDir = dir => new Promise((resolve, reject) => {
  fs.readDir(dir, (err, items) => {
    if (err) {
      return reject(err)
    }

    resolve(items)
  });
});

module.exports = function() {
  return new Promise(async (resolve, reject) => {
    const screenshots = await readDir(constants.SCREENSHOTS_DIR);
    const diffs = await readDir(constants.DIFF_DIR);
  })
}
