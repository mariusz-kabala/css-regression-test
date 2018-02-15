'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TestDetails = require('../components/TestDetails');

var _TestDetails2 = _interopRequireDefault(_TestDetails);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _testDetails = require('../actions/testDetails');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(function (state) {
  var currentTestDetailsID = state.currentTestDetailsID;

  if (currentTestDetailsID === null || typeof state.testDetails[currentTestDetailsID] === 'undefined') {
    return {
      summary: {},
      details: []
    };
  }

  return state.testDetails[currentTestDetailsID];
}, function (dispatch) {
  return {
    onReady: function onReady(testID) {
      return dispatch((0, _testDetails.fetchTestDetailsIfNeeded)(testID));
    }
  };
}))(_TestDetails2.default);
module.exports = exports['default'];