'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToTestDetailsIfNeeded = goToTestDetailsIfNeeded;
var GO_TO_TEST_DETAILS = exports.GO_TO_TEST_DETAILS = 'go-to-test-details';

var goToTestDetails = exports.goToTestDetails = function goToTestDetails(testID) {
  return {
    type: GO_TO_TEST_DETAILS,
    testID: testID
  };
};

var shouldGoToTestDetails = function shouldGoToTestDetails(state, testID) {
  return state.currentTestDetailsID !== testID;
};

function goToTestDetailsIfNeeded(testID, history) {
  return function (dispatch, getState) {
    if (shouldGoToTestDetails(getState(), testID) === false) {
      return;
    }

    dispatch(goToTestDetails(testID));

    history.push('/tests/' + testID);
  };
}