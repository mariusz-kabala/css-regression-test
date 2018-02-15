'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var loader = require('../../../utils/loader');

module.exports = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var testID, testRunReader, testRun;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testID = req.params.id;
            testRunReader = loader.getSingleResultReader();
            testRun = void 0;
            _context.prev = 3;
            _context.next = 6;
            return testRunReader(testID);

          case 6:
            testRun = _context.sent;
            _context.next = 11;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);

          case 11:

            if (testRun === null) {
              // todo throw 404 here
            }

            res.json(testRun);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();