import {
  REQUEST_SCENARIOS_LIST,
  RECEIVE_SCENARIOS_LIST_SUCCESS
} from '../actions/init';
import {
  REQUEST_TEST_RUNS_LIST,
  RECEIVE_TEST_RUNS_LIST_SUCCESS,
  RECEIVE_TEST_RUNS_LIST_FAIL
} from '../actions/testRuns';
import {
  REQUEST_TEST_DETAILS,
  RECEIVE_TEST_DETAILS_SUCCESS,
  RECEIVE_TEST_DETAILS_FAIL
} from '../actions/testDetails';
import { GO_TO_TEST_DETAILS } from '../actions/goToTest';
import {
  OPEN_NEW_TEST_RUN_POPUP,
  CLOSE_NEW_TEST_RUN_POPUP
} from '../actions/scheduleNewTestRun';
import {
  UPDATE_AMOUNT_OF_RUNNING_PROCESSES
} from '../actions/io';

const initalStore = {
  scenarios: [],
  testRuns: [],
  testDetails: {},
  currentTestDetailsID: null,
  isNewTestRunPopupOpen: false,
  amountOfRunningProcesses: 0,
  isLoading: {
    scenarios: false,
    testRuns: false,
    testDetails: null // id of currently loading test or null if nothing is loading right now
  },
  loaded: {
    scenarios: false,
    testRuns: false
  }
}

function requestScenariosList(state) {
  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {scenarios: true})
  });
}

function receiveScenariosList(state, action) {
  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {scenarios: false}),
    loaded: Object.assign({}, state.loaded, {scenarios: true}),
    scenarios: action.scenarios
  });
}

function requestTestRunsList(state) {
  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {testRuns: true})
  });
}

function receiveTestRunsList(state, action) {
  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {testRuns: false}),
    loaded: Object.assign({}, state.loaded, {testRuns: true}),
    testRuns: action.testRuns
  });
}

function openNewTestRunPopup(state, action) {
  return Object.assign({}, state, {
    isNewTestRunPopupOpen: true
  })
}

function closeNewTestRunPopup(state, action) {
  return Object.assign({}, state, {
    isNewTestRunPopupOpen: false
  })
}

function requestTestDetails(state, action) {
  const { testID } = action;

  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {testDetails: testID})
  });
}

function receiveTestDetails(state, action) {
  const { testID, testDetails } = action;

  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {testDetails: null}),
    testDetails: Object.assign({}, state.testDetails, {
      [testID]: testDetails
    })
  });
}

function updateAmountOfRunningProcesses(state, action) {
  const { amount } = action;

  return Object.assign({}, state, {
    amountOfRunningProcesses: amount
  });
}

function goToTestDetails(state, action) {
  const { testID } = action;

  return Object.assign({}, state, {
    currentTestDetailsID: testID
  });
}

export default function reducers(state = initalStore, action) {
  switch (action.type) {
    case REQUEST_SCENARIOS_LIST:
      return requestScenariosList(state);

    case RECEIVE_SCENARIOS_LIST_SUCCESS:
      return receiveScenariosList(state, action);

    case REQUEST_TEST_RUNS_LIST:
      return requestTestRunsList(state);

    case RECEIVE_TEST_RUNS_LIST_SUCCESS:
      return receiveTestRunsList(state, action);

    case REQUEST_TEST_DETAILS:
      return requestTestDetails(state, action);

    case RECEIVE_TEST_DETAILS_SUCCESS:
      return receiveTestDetails(state, action);

    case GO_TO_TEST_DETAILS:
      return goToTestDetails(state, action);

    case OPEN_NEW_TEST_RUN_POPUP:
      return openNewTestRunPopup(state, action);

    case CLOSE_NEW_TEST_RUN_POPUP:
      return closeNewTestRunPopup(state, action);

    case UPDATE_AMOUNT_OF_RUNNING_PROCESSES:
      return updateAmountOfRunningProcesses(state, action);
  }

  return state
}
