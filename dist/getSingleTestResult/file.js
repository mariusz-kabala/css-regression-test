'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var constants = require('../constants');
var fs = require('fs');
var fileSystem = require('../utils/fileSystem');

module.exports = function (testID) {
  var _this = this;

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var filename;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filename = constants.REPORTS_DIR + '/' + testID + '.json';

              if (!(fs.existsSync(filename) === false)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', null);

            case 3:
              _context.prev = 3;
              _context.t0 = resolve;
              _context.next = 7;
              return fileSystem.readJSONFile(filename);

            case 7:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1);
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t2 = _context['catch'](3);

              reject(_context.t2);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};