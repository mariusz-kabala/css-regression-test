'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToSocket = connectToSocket;
var UPDATE_AMOUNT_OF_RUNNING_PROCESSES = exports.UPDATE_AMOUNT_OF_RUNNING_PROCESSES = 'update-amount-of-running-processes';

var updateAmountOfRunningProcesses = exports.updateAmountOfRunningProcesses = function updateAmountOfRunningProcesses(amount) {
  return {
    type: UPDATE_AMOUNT_OF_RUNNING_PROCESSES,
    amount: amount
  };
};

function connectToSocket() {
  return function (dispatch, getState) {
    var socket = io();

    socket.on('processes', function (msg) {
      dispatch(updateAmountOfRunningProcesses(msg.running));
    });
  };
}