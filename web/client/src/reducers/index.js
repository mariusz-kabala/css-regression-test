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
import {
  OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP,
  CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP,
  TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP,
  REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST,
  RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS
} from '../actions/currentlyRunning';
import {
  REQUEST_PROCESS_DETAILS,
  RECEIVE_PROCESS_DETAILS_SUCCESS,
  RECEIVE_PROCESS_DETAILS_FAIL
} from '../actions/processDetails';
import { GO_TO_PROCESS_DETAILS } from '../actions/goToProcessDetails';

const initalStore = {
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
  isLoading: {
    scenarios: false,
    currentlyRunning: false,
    testRuns: false,
    processDetails: null, // id of currently loading process or null if nothing is loading right now
    testDetails: null // id of currently loading test or null if nothing is loading right now
  },
  loaded: {
    scenarios: false,
    testRuns: false
  }
}

const mapper = {
  [OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP]: (state, action) => Object.assign({}, state, {
    isRunningProcessesInfoTooltipOpen: true
  }),
  [CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP]: (state, action) => Object.assign({}, state, {
    isRunningProcessesInfoTooltipOpen: false
  }),
  [TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP]: (state, action) => Object.assign({}, state, {
    isRunningProcessesInfoTooltipOpen: !state.isRunningProcessesInfoTooltipOpen
  }),
  [REQUEST_SCENARIOS_LIST]: (state, action) => Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {scenarios: true})
  }),
  [RECEIVE_SCENARIOS_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {scenarios: false}),
    loaded: Object.assign({}, state.loaded, {scenarios: true}),
    scenarios: action.scenarios
  }),
  [REQUEST_TEST_RUNS_LIST]: (state, action) => Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {testRuns: true})
  }),
  [RECEIVE_TEST_RUNS_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {testRuns: false}),
    loaded: Object.assign({}, state.loaded, {testRuns: true}),
    testRuns: action.testRuns
  }),
  [REQUEST_TEST_DETAILS]: (state, action) => {
    const { testID } = action;

    return Object.assign({}, state, {
      isLoading: Object.assign({}, state.isLoading, {testDetails: testID})
    });
  },
  [RECEIVE_TEST_DETAILS_SUCCESS]: (state, action) => {
    const { testID, testDetails } = action;

    return Object.assign({}, state, {
      isLoading: Object.assign({}, state.isLoading, {testDetails: null}),
      testDetails: Object.assign({}, state.testDetails, {
        [testID]: testDetails
      })
    });
  },
  [GO_TO_TEST_DETAILS]: (state, action) => {
    const { testID } = action;

    return Object.assign({}, state, {
      currentTestDetailsID: testID
    });
  },
  [OPEN_NEW_TEST_RUN_POPUP]: (state, action) => Object.assign({}, state, {
    isNewTestRunPopupOpen: true
  }),
  [CLOSE_NEW_TEST_RUN_POPUP]: (state, action) => Object.assign({}, state, {
    isNewTestRunPopupOpen: false
  }),
  [UPDATE_AMOUNT_OF_RUNNING_PROCESSES]: (state, action) => {
    const { amount } = action;

    return Object.assign({}, state, {
      amountOfRunningProcesses: amount,
      currentlyRunningProcesses: amount > 0 ? state.currentlyRunningProcesses : []
    });
  },
  [REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST]: (state, action) => Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {currentlyRunning: true}),
  }),
  [RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS]: (state, action) => {
    const { data } = action;

    return Object.assign({}, state, {
      isLoading: Object.assign({}, state.isLoading, {currentlyRunning: false}),
      currentlyRunningProcesses: data,
    });
  },
  [REQUEST_PROCESS_DETAILS]: (state, action) => Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {processDetails: action.id})
  }),
  [RECEIVE_PROCESS_DETAILS_SUCCESS]: (state, action) => Object.assign({}, state, {
    processDetails: Object.assign({}, state.processDetails, {
      [action.id]: action.details
    })
  }),
  [GO_TO_PROCESS_DETAILS]: (state, action) => Object.assign({}, state, {
    currentProcessID: action.id
  }),
}

export default function reducers(state = initalStore, action) {
  const { type } = action;

  if (typeof mapper[type] === 'function') {
    return mapper[type](state, action);
  }

  return state
}
