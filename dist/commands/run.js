'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');
var readScenarios = require('../utils/readScenarios');
var Driver = require('../drivers/puppeteer');
var defaultConfig = require('../default');
var constants = require('../constants');

var makeWorkingDir = function makeWorkingDir(testName, screenshotsDir, logger) {
  return new Promise(function (resolve, reject) {
    var subdir = typeof testName === 'undefined' ? Date.now() : testName;
    var dir = screenshotsDir + '/' + subdir;

    if (fs.existsSync(dir) === true) {
      return reject('Test dir ' + dir + ' already exists please use different name');
    }

    fs.mkdir(dir, function (err) {
      if (err) {
        reject(err);
      }
      logger.info('Working dir ' + dir + ' has been created');
      resolve(dir);
    });
  });
};

module.exports = function (_ref) {
  var _this = this;

  var testName = _ref.testName,
      url = _ref.url,
      screenshotsDir = _ref.screenshotsDir,
      logger = _ref.logger,
      reporter = _ref.reporter,
      cookies = _ref.cookies;

  var reportTool = require('../utils/report')(reporter);

  return new Promise(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var scenarios, workingDir, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, scenario, driver;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return readScenarios(constants.SCENARIOS_DIR);

            case 2:
              scenarios = _context.sent;
              workingDir = void 0;
              _context.prev = 4;
              _context.next = 7;
              return makeWorkingDir(testName, screenshotsDir, logger);

            case 7:
              workingDir = _context.sent;
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](4);

              logger.error(_context.t0);
              return _context.abrupt('return', reject());

            case 14:

              reportTool.startReport(scenarios.length);

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 18;
              _iterator = scenarios[Symbol.iterator]();

            case 20:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 36;
                break;
              }

              scenario = _step.value;

              logger.info('Executing scenario ' + scenario.name);
              driver = new Driver({
                scenario: scenario,
                workingDir: workingDir,
                logger: logger,
                defaultConfig: defaultConfig,
                url: url
              });
              _context.next = 26;
              return driver.init();

            case 26:
              _context.next = 28;
              return driver.setCookies(cookies);

            case 28:
              _context.next = 30;
              return driver.execute();

            case 30:
              _context.next = 32;
              return driver.close();

            case 32:

              reportTool.reportProgress();

            case 33:
              _iteratorNormalCompletion = true;
              _context.next = 20;
              break;

            case 36:
              _context.next = 42;
              break;

            case 38:
              _context.prev = 38;
              _context.t1 = _context['catch'](18);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 42:
              _context.prev = 42;
              _context.prev = 43;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 45:
              _context.prev = 45;

              if (!_didIteratorError) {
                _context.next = 48;
                break;
              }

              throw _iteratorError;

            case 48:
              return _context.finish(45);

            case 49:
              return _context.finish(42);

            case 50:

              resolve();

            case 51:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[4, 10], [18, 38, 42, 50], [43,, 45, 49]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};