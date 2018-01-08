const constants = require('../constants');
const fs = require('fs');
const fileSystem = require('../utils/fileSystem');

module.exports = class LogsFileStorage {
  constructor(id) {
    this.path = `${constants.LOGS_DIR}/${id}.json`;
    this.logs = [];
    this.info = {};

    if (fs.existsSync(this.path) === true) {
      throw new Error(`File ${this.path} already exists`);
    }
  }

  save(data) {
    this.logs.push(data);

    fs.writeFile(this.path, JSON.stringify({
      logs: this.logs,
      info: this.info
    }), err => {
      if (err) {
        throw new Error(`Can not write file ${this.path}`);
      }
    });
  }

  static async saveInfo(id, info) {
    const file = `${constants.LOGS_DIR}/${id}.json`;
    let data = {};

    if (fs.existsSync(file) === true) {
      data = await fileSystem.readJSONFile(file);
    }

    data.info = info;

    fs.writeFile(file, JSON.stringify(data), err => {
      if (err) {
        throw new Error(`Can not write file ${file}`);
      }
    });
  }
}
