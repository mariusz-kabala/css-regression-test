'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var constants = require('../constants');
var fs = require('fs');
var fileSys = require('../utils/fileSystem');

module.exports = function (results, testRun) {
  var _this = this;

  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants.REPORTS_DIR;

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fileSys.mkdir(dir);

            case 2:

              fs.writeFile(dir + '/' + testRun + '.html', results, function (err) {
                if (err) {
                  return reject(err);
                }

                resolve();
              });

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};