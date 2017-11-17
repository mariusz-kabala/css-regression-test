const constants = require('../constants');
const fs = require('fs');

const readDir = dir => new Promise((resolve, reject) => {
  fs.readdir(dir, (err, items) => {
    if (err) {
      return reject(err)
    }

    resolve(items)
  });
});

module.exports = function() {
  return new Promise(async (resolve, reject) => {
    const testRuns = await readDir(constants.REPORTS_DIR);

    resolve(testRuns.reduce((all, filename) => {
      const splitted = filename.split('.');

      if (splitted[splitted.length-1] === 'json') {
        splitted.splice(-1);
        all.push(splitted.join('.'));
      }

      return all;
    }, []));
  })
}
