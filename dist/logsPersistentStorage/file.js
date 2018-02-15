'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants');
var fs = require('fs');
var fileSystem = require('../utils/fileSystem');

module.exports = function () {
  function LogsFileStorage(id) {
    _classCallCheck(this, LogsFileStorage);

    this.path = constants.LOGS_DIR + '/' + id + '.json';
    this.logs = [];
    this.info = {};

    if (fs.existsSync(this.path) === true) {
      throw new Error('File ' + this.path + ' already exists');
    }
  }

  _createClass(LogsFileStorage, [{
    key: 'save',
    value: function save(data) {
      var _this = this;

      this.logs.push(data);

      fs.writeFile(this.path, JSON.stringify({
        logs: this.logs,
        info: this.info
      }), function (err) {
        if (err) {
          throw new Error('Can not write file ' + _this.path);
        }
      });
    }
  }], [{
    key: 'saveInfo',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, info) {
        var file, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = constants.LOGS_DIR + '/' + id + '.json';
                data = {};

                if (!(fs.existsSync(file) === true)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return fileSystem.readJSONFile(file);

              case 5:
                data = _context.sent;

              case 6:

                data.info = info;

                fs.writeFile(file, JSON.stringify(data), function (err) {
                  if (err) {
                    throw new Error('Can not write file ' + file);
                  }
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveInfo(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return saveInfo;
    }()
  }]);

  return LogsFileStorage;
}();