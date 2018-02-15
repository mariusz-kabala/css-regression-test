'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fileSys = require('../utils/fileSystem');
var fs = require('fs');

module.exports = function (_ref) {
  var _this = this;

  var name = _ref.name,
      screenshotsDir = _ref.screenshotsDir,
      targetDir = _ref.targetDir;

  if (name === 'last') {
    name = fileSys.getTheNewestFile(screenshotsDir);
  }

  var dirToUse = screenshotsDir + '/' + name;

  return new Promise(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(fs.existsSync(dirToUse) === false)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', reject('Test run with name ' + name + ' not found'));

            case 2:
              if (!(fs.existsSync(targetDir) === true)) {
                _context.next = 11;
                break;
              }

              _context.prev = 3;
              _context.next = 6;
              return fileSys.removeDir(targetDir);

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', reject(_context.t0));

            case 11:
              _context.prev = 11;
              _context.next = 14;
              return fileSys.copy(dirToUse, targetDir);

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t1 = _context['catch'](11);
              return _context.abrupt('return', reject(_context.t1));

            case 19:

              resolve();

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 8], [11, 16]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};