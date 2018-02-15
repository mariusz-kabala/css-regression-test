'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var constants = require('../constants');
var fileSystem = require('../utils/fileSystem');

module.exports = function () {
  var _this = this;

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var testRuns;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fileSystem.readDir(constants.REPORTS_DIR);

            case 2:
              testRuns = _context.sent;


              resolve(testRuns.reduce(function (all, filename) {
                var splitted = filename.split('.');

                if (splitted[splitted.length - 1] === 'json') {
                  splitted.splice(-1);
                  all.push(splitted.join('.'));
                }

                return all;
              }, []));

            case 4:
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
};