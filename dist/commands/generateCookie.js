'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var defaultConfig = require('../default');
var getDriver = require('../utils/getDriver');
var Driver = getDriver();

module.exports = function (_ref) {
  var _this = this;

  var url = _ref.url,
      logger = _ref.logger;

  return new Promise(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var cookie, page;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cookie = defaultConfig.getCookie();
              _context.prev = 1;

              driver = new Driver({
                scenario: cookie,
                logger: logger,
                defaultConfig: defaultConfig,
                url: url
              });
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context['catch'](1);
              return _context.abrupt('return', reject(_context.t0));

            case 8:
              _context.next = 10;
              return driver.init();

            case 10:
              _context.next = 12;
              return driver.execute();

            case 12:
              page = _context.sent;
              _context.t1 = resolve;
              _context.next = 16;
              return page.cookies();

            case 16:
              _context.t2 = _context.sent;
              (0, _context.t1)(_context.t2);
              _context.next = 20;
              return driver.close();

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 5]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};