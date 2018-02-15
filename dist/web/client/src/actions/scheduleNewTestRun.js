'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeNewTestRunPopup = exports.openNewTestRunPopup = exports.scheduleNewTestRun = exports.CLOSE_NEW_TEST_RUN_POPUP = exports.OPEN_NEW_TEST_RUN_POPUP = exports.SCHEDULE_NEW_TEST_RUN = undefined;
exports.scheduleNewTestRunIfNeeded = scheduleNewTestRunIfNeeded;

var _api = require('../api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SCHEDULE_NEW_TEST_RUN = exports.SCHEDULE_NEW_TEST_RUN = 'schedule-new-test-run';
var OPEN_NEW_TEST_RUN_POPUP = exports.OPEN_NEW_TEST_RUN_POPUP = 'open-new-test-run-popup';
var CLOSE_NEW_TEST_RUN_POPUP = exports.CLOSE_NEW_TEST_RUN_POPUP = 'close-new-test-run-popup';

var scheduleNewTestRun = exports.scheduleNewTestRun = function scheduleNewTestRun() {
  return {
    type: SCHEDULE_NEW_TEST_RUN
  };
};

var openNewTestRunPopup = exports.openNewTestRunPopup = function openNewTestRunPopup() {
  return {
    type: OPEN_NEW_TEST_RUN_POPUP
  };
};

var closeNewTestRunPopup = exports.closeNewTestRunPopup = function closeNewTestRunPopup() {
  return {
    type: CLOSE_NEW_TEST_RUN_POPUP
  };
};

function scheduleNewTestRunIfNeeded(testData) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _api.createNewTestRun)(testData);

            case 2:
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
}