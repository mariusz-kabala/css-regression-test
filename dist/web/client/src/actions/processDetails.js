'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveProcessDetailsFailed = exports.receiveProcessDetails = exports.requestProcessDetails = exports.RECEIVE_PROCESS_DETAILS_FAIL = exports.RECEIVE_PROCESS_DETAILS_SUCCESS = exports.REQUEST_PROCESS_DETAILS = undefined;
exports.fetchProcessDetailsIfNeeded = fetchProcessDetailsIfNeeded;

var _api = require('../api');

var _goToProcessDetails = require('./goToProcessDetails');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var REQUEST_PROCESS_DETAILS = exports.REQUEST_PROCESS_DETAILS = 'request-process-details';
var RECEIVE_PROCESS_DETAILS_SUCCESS = exports.RECEIVE_PROCESS_DETAILS_SUCCESS = 'receive-process-details-success';
var RECEIVE_PROCESS_DETAILS_FAIL = exports.RECEIVE_PROCESS_DETAILS_FAIL = 'receive-process-details-fail';

var requestProcessDetails = exports.requestProcessDetails = function requestProcessDetails(id) {
  return {
    type: REQUEST_PROCESS_DETAILS,
    id: id
  };
};

var receiveProcessDetails = exports.receiveProcessDetails = function receiveProcessDetails(id, details) {
  return {
    type: RECEIVE_PROCESS_DETAILS_SUCCESS,
    id: id,
    details: details
  };
};

var receiveProcessDetailsFailed = exports.receiveProcessDetailsFailed = function receiveProcessDetailsFailed(id) {
  return {
    type: RECEIVE_PROCESS_DETAILS_FAIL
  };
};

function fetchProcessDetailsIfNeeded(id) {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(requestProcessDetails(id));
              dispatch((0, _goToProcessDetails.goToProcessDetails)(id));

              _context.prev = 2;
              _context.next = 5;
              return (0, _api.fetchProcessDetails)(id);

            case 5:
              data = _context.sent;

              dispatch(receiveProcessDetails(id, data));
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](2);

              dispatch(receiveProcessDetailsFailed());

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[2, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}