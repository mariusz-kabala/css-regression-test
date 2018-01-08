const constants = require('../constants');
const fs = require('fs');
const fileSystem = require('../utils/fileSystem');

module.exports = class LogsFileReader {
  constructor() {
    this.path = `${constants.LOGS_DIR}/`;

    if (fs.existsSync(this.path) === false) {
      throw new Error(`Directory ${this.path} doesn't exists`);
    }
  }

  read() {
    return new Promise(async (resolve, reject) => {
      const logs = await fileSystem.readDir(this.path);

      resolve(logs.reduce((all, filename) => {
        const splitted = filename.split('.');

        if (splitted[splitted.length-1] === 'json') {
          splitted.splice(-1);
          all.push(splitted.join('.'));
        }

        return all;
      }, []));
    });
  }

  get(id) {
    return new Promise(async (resolve, reject) => {
      const filename = `${this.path}/${id}.json`;

      if (fs.existsSync(filename) === false) {
        return resolve(null);
      }

      try {
        resolve(await fileSystem.readJSONFile(filename));
      } catch (err) {
        reject(err);
      }
    });
  }
}
