const constants = require('../constants');
const fs = require('fs');

module.exports = class LogsFileStorage {
  constructor(id) {
    this.path = `${constants.LOGS_DIR}/${id}.json`;
    this.logs = [];

    if (fs.existsSync(this.path) === true) {
      throw new Error(`File ${this.path} already exists`);
    }
  }

  save(data) {
    this.logs.push(data);

    fs.writeFile(this.path, JSON.stringify(this.logs), err => {
      if (err) {
        throw new Error(`Can not write file ${this.path}`);
      }
    });
  }
}
