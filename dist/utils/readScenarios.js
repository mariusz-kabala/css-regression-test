'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var glob = require('glob');
var parseScenario = require('./parseScenario');
var constants = require('../constants');

var readFilesList = function readFilesList(path) {
  return new Promise(function (resolve, reject) {
    glob(path + '/**/*.js', function (err, files) {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });
};

module.exports = function () {
  var _this = this;

  var sceneriosDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.SCENARIOS_DIR;

  var result = [];

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var files;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              files = void 0;
              _context.prev = 1;
              _context.next = 4;
              return readFilesList(sceneriosDir);

            case 4:
              files = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);
              return _context.abrupt('return', reject(_context.t0));

            case 10:

              files.forEach(function (file) {
                var scenario = void 0;
                try {
                  scenario = require(file);
                } catch (e) {
                  console.error('Invalid scenario file', file, e);
                  return;
                }

                if (typeof scenario === 'function') {
                  result = result.concat(parseScenario(scenario()));
                } else if ((typeof scenario === 'undefined' ? 'undefined' : _typeof(scenario)) === 'object' && scenario !== null) {
                  result = result.concat(parseScenario(scenario));
                }
              });

              resolve(result);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 7]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};