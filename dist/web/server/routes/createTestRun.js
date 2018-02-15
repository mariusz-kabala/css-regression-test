'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _ = require('lodash');
var generateCookieCommand = require('../../../commands/generateCookie');
var FileStorage = require('../../../logsPersistentStorage/file');
var runCommand = require('../../../commands/run');
var Logger = require('../lib/logger');
var pm = require('../lib/processesManager');

module.exports = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var url, testName, threshold, cookie, id, storage, logger, cookies;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _.get(req, 'body.url');
            testName = _.get(req, 'body.testName', Date.now());
            threshold = _.get(req, 'body.threshold');
            cookie = _.get(req, 'body.generateCookie', true);
            id = pm.add({
              url: url,
              testName: testName,
              threshold: threshold,
              cookie: cookie
            });
            storage = new FileStorage(id);
            logger = new Logger(req.io, id, storage);
            cookies = [];


            res.json({ started: true });

            if (!(cookie === true)) {
              _context.next = 21;
              break;
            }

            _context.prev = 10;
            _context.next = 13;
            return generateCookieCommand({
              url: url,
              logger: logger
            });

          case 13:
            cookies = _context.sent;
            _context.next = 21;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](10);

            console.log(_context.t0);
            logger.error('Command GENERATE COOKIE failed', _context.t0);
            return _context.abrupt('return');

          case 21:

            pm.remove(id);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();