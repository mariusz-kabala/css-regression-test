'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToRunningProcessDetails = exports.receiveCurrentlyRunningProcessesFail = exports.receiveCurrentlyRunningProcessesSuccess = exports.requestCurrentlyRunningProcesses = exports.toggleCurrentlyRunningProcesses = exports.closeCurrentlyRunningProcessesTooltip = exports.openCurrentlyRunningProcessesTooltip = exports.GO_TO_RUNNING_PROCESS_DETAILS = exports.RECEIVE_CURRENTLY_RUNNING_PROCESSES_FAIL = exports.RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS = exports.REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST = exports.TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = exports.CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = exports.OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = undefined;
exports.fetchCurrentlyRunningProcessesIfNeeded = fetchCurrentlyRunningProcessesIfNeeded;
exports.goToRunningProcessDetailsIfNeeded = goToRunningProcessDetailsIfNeeded;

var _api = require('../api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = exports.OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = 'open-currently-running-processes-tooltip';
var CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = exports.CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = 'close-currently-running-processes-tooltip';
var TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = exports.TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = 'toggle-currently-running-processes-tooltip';
var REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST = exports.REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST = 'request-currently-running-processes';
var RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS = exports.RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS = 'receive-currently-running-processes-success';
var RECEIVE_CURRENTLY_RUNNING_PROCESSES_FAIL = exports.RECEIVE_CURRENTLY_RUNNING_PROCESSES_FAIL = 'receive-currently-running-processes-fail';
var GO_TO_RUNNING_PROCESS_DETAILS = exports.GO_TO_RUNNING_PROCESS_DETAILS = 'go-to-running-process-details';

var openCurrentlyRunningProcessesTooltip = exports.openCurrentlyRunningProcessesTooltip = function openCurrentlyRunningProcessesTooltip() {
  return {
    type: OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP
  };
};

var closeCurrentlyRunningProcessesTooltip = exports.closeCurrentlyRunningProcessesTooltip = function closeCurrentlyRunningProcessesTooltip() {
  return {
    type: CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP
  };
};

var toggleCurrentlyRunningProcesses = exports.toggleCurrentlyRunningProcesses = function toggleCurrentlyRunningProcesses() {
  return {
    type: TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP
  };
};

var requestCurrentlyRunningProcesses = exports.requestCurrentlyRunningProcesses = function requestCurrentlyRunningProcesses() {
  return {
    type: REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST
  };
};

var receiveCurrentlyRunningProcessesSuccess = exports.receiveCurrentlyRunningProcessesSuccess = function receiveCurrentlyRunningProcessesSuccess(data) {
  return {
    type: RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS,
    data: data
  };
};

var receiveCurrentlyRunningProcessesFail = exports.receiveCurrentlyRunningProcessesFail = function receiveCurrentlyRunningProcessesFail() {
  return {
    type: RECEIVE_CURRENTLY_RUNNING_PROCESSES_FAIL
  };
};

var goToRunningProcessDetails = exports.goToRunningProcessDetails = function goToRunningProcessDetails(id) {
  return {
    type: GO_TO_RUNNING_PROCESS_DETAILS,
    id: id
  };
};

function fetchCurrentlyRunningProcessesIfNeeded() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(requestCurrentlyRunningProcesses());

              _context.prev = 1;
              _context.next = 4;
              return (0, _api.fetchCurrentlyRunningProcesses)();

            case 4:
              data = _context.sent;

              dispatch(receiveCurrentlyRunningProcessesSuccess(data));
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              dispatch(receiveCurrentlyRunningProcessesFail(_context.t0));

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function goToRunningProcessDetailsIfNeeded(id, history) {
  return function (dispatch, getState) {
    goToRunningProcessDetails(id);

    history.push('/processes/' + id);
  };
}