'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var constants = require('../constants');
var fs = require('fs');
var fileSys = require('../utils/fileSystem');

var getImage = function getImage(path) {
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(path) === false) {
      reject('file not found');
    }

    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};

function saveDiffImage() {}

function getDiffImage(testID, imageID) {
  return getImage(constants.DIFF_DIR + '/' + testID + '/' + imageID);
}

function saveTestImage() {}

function getTestImage(testID, imageID) {
  return getImage(constants.SCREENSHOTS_DIR + '/' + testID + '/' + imageID);
}

function saveTargetImage() {}

function getTargetImage(imageID) {
  return getImage(constants.TARGETS_DIR + '/' + imageID);
}

function getAllTargetImages() {
  var _this = this;

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var files, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fileSys.readDir(constants.TARGETS_DIR);

            case 2:
              files = _context.sent;
              result = {};


              files.map(function (file) {
                var fileName = file.split('.');

                if (fileName.length === 2 && fileName[1] === 'png') {
                  var dsc = String(Buffer.from(fileName[0], 'base64')).split('-');
                  var scenario = dsc[0];
                  var testName = dsc[2];
                  var url = dsc[1];
                  var res = dsc[3] + 'x' + dsc[4];

                  if (typeof result[scenario] === 'undefined') {
                    result[scenario] = {}; // scenario name
                  }

                  if (typeof result[scenario][testName] === 'undefined') {
                    result[scenario][testName] = []; // test name
                  }

                  result[scenario][testName].push({
                    url: url,
                    res: res,
                    file: file
                  });
                }
              });

              resolve(result);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = {
  saveDiffImage: saveDiffImage,
  getDiffImage: getDiffImage,
  saveTestImage: saveTestImage,
  getTestImage: getTestImage,
  saveTargetImage: saveTargetImage,
  getTargetImage: getTargetImage,
  getAllTargetImages: getAllTargetImages
};