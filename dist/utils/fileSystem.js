'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var rimraf = require('rimraf');
var copydir = require('copy-dir');

module.exports = {
  getTheNewestFile: function getTheNewestFile(dir) {
    var files = fs.readdirSync(dir);

    ['.DS_Store'].forEach(function (fileToIgnore) {
      var fileIndex = files.indexOf(fileToIgnore);

      if (fileIndex > -1) {
        files.splice(fileIndex, 1);
      }
    });

    return _.maxBy(files, function (f) {
      var fullpath = path.join(dir, f);

      return fs.statSync(fullpath).ctime;
    });
  },
  removeDir: function removeDir(dir) {
    return new Promise(function (resolve, reject) {
      rimraf(dir, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },
  copy: function copy(from, to) {
    return new Promise(function (resolve, reject) {
      copydir(from, to, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },
  mkdir: function mkdir(dirPath) {
    return new Promise(function (resolve, reject) {
      if (fs.existsSync(dirPath) === true) {
        return resolve(dirPath);
      }

      fs.mkdir(dirPath, function (err) {
        if (err) {
          reject(err);
        }

        resolve(dirPath);
      });
    });
  },
  readDir: function readDir(dir) {
    return new Promise(function (resolve, reject) {
      fs.readdir(dir, function (err, items) {
        if (err) {
          return reject(err);
        }

        resolve(items);
      });
    });
  },
  readJSONFile: function readJSONFile(filePath) {
    return new Promise(function (resolve, reject) {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          return reject(err);
        }

        try {
          var content = JSON.parse(data);
          resolve(content);
        } catch (e) {
          return reject(e);
        }
      });
    });
  }
};