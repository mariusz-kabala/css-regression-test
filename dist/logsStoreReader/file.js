'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants');
var fs = require('fs');
var fileSystem = require('../utils/fileSystem');

module.exports = function () {
  function LogsFileReader() {
    _classCallCheck(this, LogsFileReader);

    this.path = constants.LOGS_DIR + '/';

    if (fs.existsSync(this.path) === false) {
      throw new Error('Directory ' + this.path + ' doesn\'t exists');
    }
  }

  _createClass(LogsFileReader, [{
    key: 'read',
    value: function read() {
      var _this = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var logs;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fileSystem.readDir(_this.path);

                case 2:
                  logs = _context.sent;


                  resolve(logs.reduce(function (all, filename) {
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
    }
  }, {
    key: 'get',
    value: function get(id) {
      var _this2 = this;

      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var filename;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  filename = _this2.path + '/' + id + '.json';

                  if (!(fs.existsSync(filename) === false)) {
                    _context2.next = 3;
                    break;
                  }

                  return _context2.abrupt('return', resolve(null));

                case 3:
                  _context2.prev = 3;
                  _context2.t0 = resolve;
                  _context2.next = 7;
                  return fileSystem.readJSONFile(filename);

                case 7:
                  _context2.t1 = _context2.sent;
                  (0, _context2.t0)(_context2.t1);
                  _context2.next = 14;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t2 = _context2['catch'](3);

                  reject(_context2.t2);

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[3, 11]]);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }]);

  return LogsFileReader;
}();