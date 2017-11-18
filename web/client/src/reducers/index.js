import {
  REQUEST_SCENARIOS_LIST,
  RECEIVE_SCENARIOS_LIST_SUCCESS
} from '../actions/init'
import {
  REQUEST_TEST_RUNS_LIST,
  RECEIVE_TEST_RUNS_LIST_SUCCESS,
  RECEIVE_TEST_RUNS_LIST_FAIL
} from '../actions/testRuns'

const initalStore = {
  scenarios: [],
  testRuns: [],
  testDetails: {},
  isLoading: {
    scenarios: false,
    testRuns: false
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

export default function reducers(state = initalStore, action) {
  switch (action.type) {
    case REQUEST_SCENARIOS_LIST:
      return requestScenariosList(state);

    case RECEIVE_SCENARIOS_LIST_SUCCESS:
      return receiveScenariosList(state, action);
  }

  return state
}
