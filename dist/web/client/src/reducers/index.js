'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mapper;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducers;

var _init = require('../actions/init');

var _testRuns = require('../actions/testRuns');

var _testDetails = require('../actions/testDetails');

var _goToTest = require('../actions/goToTest');

var _scheduleNewTestRun = require('../actions/scheduleNewTestRun');

var _generateNewTarget = require('../actions/generateNewTarget');

var _io = require('../actions/io');

var _currentlyRunning = require('../actions/currentlyRunning');

var _processDetails = require('../actions/processDetails');

var _goToProcessDetails = require('../actions/goToProcessDetails');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalStore = {
  scenarios: [],
  testRuns: [],
  testDetails: {},
  processDetails: {}, // {id: {info: {}, logs: []}
  currentTestDetailsID: null,
  currentProcessID: null,
  isNewTestRunPopupOpen: false,
  isRunningProcessesInfoTooltipOpen: false,
  amountOfRunningProcesses: 0,
  currentlyRunningProcesses: [],
  generateNewTarget: {
    isOpen: false
  },
  isLoading: {
    scenarios: false,
    currentlyRunning: false,
    testRuns: false,
    generateNewTarget: false,
    processDetails: null, // id of currently loading process or null if nothing is loading right now
    testDetails: null // id of currently loading test or null if nothing is loading right now
  },
  loaded: {
    scenarios: false,
    testRuns: false
  }
};

var mapper = (_mapper = {}, _defineProperty(_mapper, _currentlyRunning.OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP, function (state, action) {
  return _extends({}, state, {
    isRunningProcessesInfoTooltipOpen: true
  });
}), _defineProperty(_mapper, _currentlyRunning.CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP, function (state, action) {
  return _extends({}, state, {
    isRunningProcessesInfoTooltipOpen: false
  });
}), _defineProperty(_mapper, _currentlyRunning.TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP, function (state, action) {
  return _extends({}, state, {
    isRunningProcessesInfoTooltipOpen: !state.isRunningProcessesInfoTooltipOpen
  });
}), _defineProperty(_mapper, _init.REQUEST_SCENARIOS_LIST, function (state, action) {
  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { scenarios: true })
  });
}), _defineProperty(_mapper, _init.RECEIVE_SCENARIOS_LIST_SUCCESS, function (state, action) {
  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { scenarios: false }),
    loaded: _extends({}, state.loaded, { scenarios: true }),
    scenarios: action.scenarios
  });
}), _defineProperty(_mapper, _testRuns.REQUEST_TEST_RUNS_LIST, function (state, action) {
  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { testRuns: true })
  });
}), _defineProperty(_mapper, _testRuns.RECEIVE_TEST_RUNS_LIST_SUCCESS, function (state, action) {
  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { testRuns: false }),
    loaded: _extends({}, state.loaded, { testRuns: true }),
    testRuns: action.testRuns
  });
}), _defineProperty(_mapper, _testDetails.REQUEST_TEST_DETAILS, function (state, action) {
  var testID = action.testID;


  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { testDetails: testID })
  });
}), _defineProperty(_mapper, _testDetails.RECEIVE_TEST_DETAILS_SUCCESS, function (state, action) {
  var testID = action.testID,
      testDetails = action.testDetails;


  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { testDetails: null }),
    testDetails: _extends({}, state.testDetails, _defineProperty({}, testID, testDetails))
  });
}), _defineProperty(_mapper, _goToTest.GO_TO_TEST_DETAILS, function (state, action) {
  var testID = action.testID;


  return _extends({}, state, {
    currentTestDetailsID: testID
  });
}), _defineProperty(_mapper, _scheduleNewTestRun.OPEN_NEW_TEST_RUN_POPUP, function (state, action) {
  return _extends({}, state, {
    isNewTestRunPopupOpen: true
  });
}), _defineProperty(_mapper, _scheduleNewTestRun.CLOSE_NEW_TEST_RUN_POPUP, function (state, action) {
  return _extends({}, state, {
    isNewTestRunPopupOpen: false
  });
}), _defineProperty(_mapper, _io.UPDATE_AMOUNT_OF_RUNNING_PROCESSES, function (state, action) {
  var amount = action.amount;


  return _extends({}, state, {
    amountOfRunningProcesses: amount,
    currentlyRunningProcesses: amount > 0 ? state.currentlyRunningProcesses : []
  });
}), _defineProperty(_mapper, _currentlyRunning.REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST, function (state, action) {
  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { currentlyRunning: true })
  });
}), _defineProperty(_mapper, _currentlyRunning.RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS, function (state, action) {
  var data = action.data;


  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { currentlyRunning: false }),
    currentlyRunningProcesses: data
  });
}), _defineProperty(_mapper, _processDetails.REQUEST_PROCESS_DETAILS, function (state, action) {
  return _extends({}, state, {
    isLoading: _extends({}, state.isLoading, { processDetails: action.id })
  });
}), _defineProperty(_mapper, _processDetails.RECEIVE_PROCESS_DETAILS_SUCCESS, function (state, action) {
  return _extends({}, state, {
    processDetails: _extends({}, state.processDetails, _defineProperty({}, action.id, action.details))
  });
}), _defineProperty(_mapper, _goToProcessDetails.GO_TO_PROCESS_DETAILS, function (state, action) {
  return _extends({}, state, {
    currentProcessID: action.id
  });
}), _defineProperty(_mapper, _generateNewTarget.OPEN_GENERATE_NEW_TARGET_POPUP, function (state, action) {
  console.log('here!');
  return state;
}), _defineProperty(_mapper, _generateNewTarget.CLOSE_GENERATE_NEW_TARGET_POPUP, function (state, action) {
  return _extends({}, state, {
    generateNewTarget: _extends({}, state.generateNewTarget, {
      isOpen: false
    })
  });
}), _mapper);

function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initalStore;
  var action = arguments[1];
  var type = action.type;

  console.log('OPEN_GENERATE_NEW_TARGET_POPUP', _generateNewTarget.OPEN_GENERATE_NEW_TARGET_POPUP, _typeof(mapper[type]));
  if (typeof mapper[type] === 'function') {
    console.log('here@@@');
    return mapper[type](state, action);
  }

  return state;
}
module.exports = exports['default'];