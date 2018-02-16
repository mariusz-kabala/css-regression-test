'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveTestDetailsFailed = exports.receiveTestDetails = exports.requestTestDetails = exports.RECEIVE_TEST_DETAILS_FAIL = exports.RECEIVE_TEST_DETAILS_SUCCESS = exports.REQUEST_TEST_DETAILS = undefined;
exports.fetchTestDetailsIfNeeded = fetchTestDetailsIfNeeded;

var _api = require('../api');

var _goToTest = require('./goToTest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var REQUEST_TEST_DETAILS = exports.REQUEST_TEST_DETAILS = 'request-test-details';
var RECEIVE_TEST_DETAILS_SUCCESS = exports.RECEIVE_TEST_DETAILS_SUCCESS = 'receive-test-details-success';
var RECEIVE_TEST_DETAILS_FAIL = exports.RECEIVE_TEST_DETAILS_FAIL = 'receive-test-details-fail';

var requestTestDetails = exports.requestTestDetails = function requestTestDetails(testID) {
  return {
    type: REQUEST_TEST_DETAILS,
    testID: testID
  };
};

var receiveTestDetails = exports.receiveTestDetails = function receiveTestDetails(testID, testDetails) {
  return {
    type: RECEIVE_TEST_DETAILS_SUCCESS,
    testID: testID,
    testDetails: testDetails
  };
};

var receiveTestDetailsFailed = exports.receiveTestDetailsFailed = function receiveTestDetailsFailed(testID) {
  return {
    type: RECEIVE_TEST_DETAILS_FAIL,
    testID: testID
  };
};

function fetchTestDetailsIfNeeded(testID) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var testDetails;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch((0, _goToTest.goToTestDetails)(testID));
              dispatch(requestTestDetails(testID));

              _context.prev = 2;
              _context.next = 5;
              return (0, _api.fetchTestDetails)(testID);

            case 5:
              testDetails = _context.sent;

              dispatch(receiveTestDetails(testID, testDetails));
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](2);

              dispatch(receiveTestDetailsFailed(testID));

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}