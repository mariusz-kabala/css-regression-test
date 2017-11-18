import { fetchScenariosList } from '../api'

export const REQUEST_SCENARIOS_LIST = 'request-scenarios-list';
export const RECEIVE_SCENARIOS_LIST_SUCCESS = 'receive-scenarios-list-success';
export const RECEIVE_SCENARIOS_LIST_FAIL = 'receive-scenarios-list-fail';

export const requestScenariosList = () => ({
  type: REQUEST_SCENARIOS_LIST
});

const receiveScenariosList = scenarios => ({
  type: RECEIVE_SCENARIOS_LIST_SUCCESS,
  scenarios
});

export const receiveScenariosListFailed = () => ({
  type: RECEIVE_SCENARIOS_LIST_FAIL
});

export const isScenariosListLoaded = state => state.loaded.scenarios;

export function fetchScenariosListIfNeeded() {
  return async function(dispatch, getState) {
    if (isScenariosListLoaded(getState()) === true) {
      return;
    }

    dispatch(requestScenariosList());

    try {
      const scenarios = await fetchScenariosList();
      dispatch(receiveScenariosList(scenarios))
    } catch (err) {
      dispatch(receiveScenariosListFailed())
    }
  }
}
