import {
  REQUEST_SCENARIOS_LIST,
  RECEIVE_SCENARIOS_LIST_SUCCESS
} from '../actions/init'


const initalStore = {
  scenarios: [],
  isLoading: {
    scenarios: false
  },
  loaded: {
    scenarios: false
  }
}

function requestScenariosList(state) {
  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {scenarios: true})
  })
}

function receiveScenariosList(state, action) {
  return Object.assign({}, state, {
    isLoading: Object.assign({}, state.isLoading, {scenarios: false}),
    loaded: Object.assign({}, state.loaded, {scenarios: true}),
    scenarios: action.scenarios
  })
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
