const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rimraf = require('rimraf');
const copydir = require('copy-dir')

module.exports = {
  getTheNewestFile(dir) {
    const files = fs.readdirSync(dir);

    ['.DS_Store'].forEach(fileToIgnore => {
      const fileIndex = files.indexOf(fileToIgnore);

      if (fileIndex > -1) {
        files.splice(fileIndex, 1);
      }
    });

    return _.maxBy(files, function (f) {
      const fullpath = path.join(dir, f);

      return fs.statSync(fullpath).ctime;
    });
  },
  removeDir(dir) {
    return new Promise((resolve, reject) => {
      rimraf(dir, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },
  copy(from, to) {
    return new Promise((resolve, reject) => {
      copydir(from, to, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },
  mkdir(dirPath) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(dirPath) === true) {
        return resolve(dirPath);
      }

      fs.mkdir(dirPath, (err) => {
        if (err) {
          reject(err);
        }

        resolve(dirPath);
      });
    });
  }
}
