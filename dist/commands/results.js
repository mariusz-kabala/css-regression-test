'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');
var fileSys = require('../utils/fileSystem');
var glob = require('glob');
var path = require('path');
var compareImages = require('resemblejs/compareImages');

function saveDiffImage(_ref) {
  var _this = this;

  var diffDir = _ref.diffDir,
      testRun = _ref.testRun,
      data = _ref.data,
      fileName = _ref.fileName;

  var pathToSave = diffDir + '/' + testRun;

  return new Promise(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fileSys.mkdir(pathToSave);

            case 2:

              fs.writeFile(pathToSave + '/' + fileName, data.getBuffer(), function () {
                resolve();
              });

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

module.exports = function (_ref3) {
  var _this2 = this;

  var screenshotsDir = _ref3.screenshotsDir,
      targetDir = _ref3.targetDir,
      diffDir = _ref3.diffDir,
      testRun = _ref3.testRun,
      logger = _ref3.logger,
      reportTool = _ref3.reportTool,
      threshold = _ref3.threshold,
      formatter = _ref3.formatter,
      showOnlyFail = _ref3.showOnlyFail;

  var passResult = function passResult(result) {
    return showOnlyFail === true && result.status === false || showOnlyFail === false;
  };

  if (testRun === 'last') {
    testRun = fileSys.getTheNewestFile(screenshotsDir);
  }

  screenshotsDir = screenshotsDir + '/' + testRun;

  return new Promise(function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(fs.existsSync(screenshotsDir) === false)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', reject('Screenshots dir ' + screenshotsDir + ' doesn\'t exist'));

            case 2:
              if (!(fs.existsSync(targetDir) === false)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt('return', reject('Target dir ' + targetDir + ' doesn\'t exist'));

            case 4:

              glob(targetDir + '/*.png', function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, files) {
                  var results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, fileName, testFile, testName, testNameArr, data, result;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!err) {
                            _context2.next = 2;
                            break;
                          }

                          return _context2.abrupt('return', reject(err));

                        case 2:
                          results = [];


                          reportTool.startReport(files.length);

                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context2.prev = 7;
                          _iterator = files[Symbol.iterator]();

                        case 9:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 31;
                            break;
                          }

                          file = _step.value;
                          fileName = path.basename(file);
                          testFile = screenshotsDir + '/' + fileName;
                          testName = new Buffer(fileName.slice(0, -4), 'base64').toString();
                          testNameArr = testName.split('-');

                          if (!(fs.existsSync(testFile) === false)) {
                            _context2.next = 18;
                            break;
                          }

                          logger.error('Test file ' + testFile + ' doesn\'t exists skipping');
                          return _context2.abrupt('continue', 28);

                        case 18:
                          _context2.next = 20;
                          return compareImages(fs.readFileSync(file), fs.readFileSync(testFile));

                        case 20:
                          data = _context2.sent;
                          result = _extends({}, data, {
                            scenario: testNameArr[0],
                            testName: testNameArr[2],
                            url: testNameArr[1],
                            viewport: testNameArr[3] + 'x' + testNameArr[4],
                            fileName: fileName
                          });


                          result.status = data.rawMisMatchPercentage > threshold ? false : true;

                          if (typeof formatter === 'function') {
                            reportTool.reportProgress(passResult(result) ? formatter(result) : undefined);
                          } else {
                            reportTool.reportProgress(passResult(result) ? result : undefined);
                          }

                          results.push(result);

                          if (!(result.status === false)) {
                            _context2.next = 28;
                            break;
                          }

                          _context2.next = 28;
                          return saveDiffImage({
                            diffDir: diffDir,
                            testRun: testRun,
                            data: data,
                            fileName: fileName
                          });

                        case 28:
                          _iteratorNormalCompletion = true;
                          _context2.next = 9;
                          break;

                        case 31:
                          _context2.next = 37;
                          break;

                        case 33:
                          _context2.prev = 33;
                          _context2.t0 = _context2['catch'](7);
                          _didIteratorError = true;
                          _iteratorError = _context2.t0;

                        case 37:
                          _context2.prev = 37;
                          _context2.prev = 38;

                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }

                        case 40:
                          _context2.prev = 40;

                          if (!_didIteratorError) {
                            _context2.next = 43;
                            break;
                          }

                          throw _iteratorError;

                        case 43:
                          return _context2.finish(40);

                        case 44:
                          return _context2.finish(37);

                        case 45:

                          resolve({ results: results, testRun: testRun });

                        case 46:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this2, [[7, 33, 37, 45], [38,, 40, 44]]);
                }));

                return function (_x5, _x6) {
                  return _ref5.apply(this, arguments);
                };
              }());

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    return function (_x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }());
};