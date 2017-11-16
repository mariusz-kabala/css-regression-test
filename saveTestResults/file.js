const constants = require('../constants');
const fs = require('fs');
const fileSys = require('../utils/fileSystem');

module.exports = function(
  results,
  testRun,
  dir=constants.REPORTS_DIR
) {
  return new Promise(async (resolve, reject) => {
    await fileSys.mkdir(dir);

    fs.writeFile(`${dir}/${testRun}.json`, results, (err) => {
      if (err) {
        return reject(err)
      }

      resolve();
    });
  });
}
