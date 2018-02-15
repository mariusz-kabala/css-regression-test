'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isScenariosListLoaded = exports.receiveScenariosListFailed = exports.requestScenariosList = exports.RECEIVE_SCENARIOS_LIST_FAIL = exports.RECEIVE_SCENARIOS_LIST_SUCCESS = exports.REQUEST_SCENARIOS_LIST = undefined;
exports.fetchScenariosListIfNeeded = fetchScenariosListIfNeeded;

var _api = require('../api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var REQUEST_SCENARIOS_LIST = exports.REQUEST_SCENARIOS_LIST = 'request-scenarios-list';
var RECEIVE_SCENARIOS_LIST_SUCCESS = exports.RECEIVE_SCENARIOS_LIST_SUCCESS = 'receive-scenarios-list-success';
var RECEIVE_SCENARIOS_LIST_FAIL = exports.RECEIVE_SCENARIOS_LIST_FAIL = 'receive-scenarios-list-fail';

var requestScenariosList = exports.requestScenariosList = function requestScenariosList() {
  return {
    type: REQUEST_SCENARIOS_LIST
  };
};

var receiveScenariosList = function receiveScenariosList(scenarios) {
  return {
    type: RECEIVE_SCENARIOS_LIST_SUCCESS,
    scenarios: scenarios
  };
};

var receiveScenariosListFailed = exports.receiveScenariosListFailed = function receiveScenariosListFailed() {
  return {
    type: RECEIVE_SCENARIOS_LIST_FAIL
  };
};

var isScenariosListLoaded = exports.isScenariosListLoaded = function isScenariosListLoaded(state) {
  return state.loaded.scenarios;
};

function fetchScenariosListIfNeeded() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var scenarios;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(isScenariosListLoaded(getState()) === true)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:

              dispatch(requestScenariosList());

              _context.prev = 3;
              _context.next = 6;
              return (0, _api.fetchScenariosList)();

            case 6:
              scenarios = _context.sent;

              dispatch(receiveScenariosList(scenarios));
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](3);

              dispatch(receiveScenariosListFailed());

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