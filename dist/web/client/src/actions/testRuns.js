'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveTestRunsListFailed = exports.receiveTestRunsList = exports.requestTestRunsList = exports.RECEIVE_TEST_RUNS_LIST_FAIL = exports.RECEIVE_TEST_RUNS_LIST_SUCCESS = exports.REQUEST_TEST_RUNS_LIST = undefined;
exports.fetchTestRunsListIfNeeded = fetchTestRunsListIfNeeded;

var _api = require('../api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var REQUEST_TEST_RUNS_LIST = exports.REQUEST_TEST_RUNS_LIST = 'request-test-runs-list';
var RECEIVE_TEST_RUNS_LIST_SUCCESS = exports.RECEIVE_TEST_RUNS_LIST_SUCCESS = 'receive-test-runs-list-success';
var RECEIVE_TEST_RUNS_LIST_FAIL = exports.RECEIVE_TEST_RUNS_LIST_FAIL = 'receive-test-runs-list-fail';

var requestTestRunsList = exports.requestTestRunsList = function requestTestRunsList() {
  return {
    type: REQUEST_TEST_RUNS_LIST
  };
};

var receiveTestRunsList = exports.receiveTestRunsList = function receiveTestRunsList(testRuns) {
  return {
    type: RECEIVE_TEST_RUNS_LIST_SUCCESS,
    testRuns: testRuns
  };
};

var receiveTestRunsListFailed = exports.receiveTestRunsListFailed = function receiveTestRunsListFailed() {
  return {
    type: RECEIVE_TEST_RUNS_LIST_FAIL
  };
};

var isTestRunsListLoaded = function isTestRunsListLoaded(state) {
  return state.loaded.testRuns;
};

function fetchTestRunsListIfNeeded() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var testRuns;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(isTestRunsListLoaded(getState()) === true)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:

              dispatch(requestTestRunsList());

              _context.prev = 3;
              _context.next = 6;
              return (0, _api.fetchTestRunsList)();

            case 6:
              testRuns = _context.sent;

              dispatch(receiveTestRunsList(testRuns));
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](3);

              dispatch(receiveTestRunsListFailed(_context.t0));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}