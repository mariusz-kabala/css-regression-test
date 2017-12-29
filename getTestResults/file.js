const constants = require('../constants');
const fileSystem = require('../utils/fileSystem');

module.exports = function() {
  return new Promise(async (resolve, reject) => {
    const testRuns = await fileSystem.readDir(constants.REPORTS_DIR);

    resolve(testRuns.reduce((all, filename) => {
      const splitted = filename.split('.');

      if (splitted[splitted.length-1] === 'json') {
        splitted.splice(-1);
        all.push(splitted.join('.'));
      }

      return all;
    }, []));
  });
}
