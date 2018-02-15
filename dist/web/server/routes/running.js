'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pm = require('../lib/processesManager');
var LogsReader = require('../../../logsStoreReader/file');

module.exports = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, info, logsReader, logs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            info = void 0;


            if (pm.has(id) === true) {
              info = pm.get('id');
            }

            logsReader = new LogsReader();
            _context.next = 6;
            return logsReader.get(id);

          case 6:
            logs = _context.sent;


            if (typeof info !== 'undefined') {
              logs['info'] = info;
            }

            res.json(logs);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();