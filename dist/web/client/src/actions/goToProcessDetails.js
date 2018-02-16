'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToProcessDetailsIfNeeded = goToProcessDetailsIfNeeded;
var GO_TO_PROCESS_DETAILS = exports.GO_TO_PROCESS_DETAILS = 'go-to-process-details';

var goToProcessDetails = exports.goToProcessDetails = function goToProcessDetails(id) {
  return {
    type: GO_TO_PROCESS_DETAILS,
    id: id
  };
};

var shouldGoToProcessDetails = function shouldGoToProcessDetails(state, id) {
  return state.currentProcessID !== id;
};

function goToProcessDetailsIfNeeded(id, history) {
  return function (dispatch, getState) {
    if (shouldGoToProcessDetails(getState(), id) === false) {
      return;
    }

    dispatch(goToProcessDetails(id));

    history.push('/processes/' + id);
  };
}