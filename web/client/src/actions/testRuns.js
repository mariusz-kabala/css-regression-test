import { fetchTestRunsList } from '../api';

export const REQUEST_TEST_RUNS_LIST = 'request-test-runs-list';
export const RECEIVE_TEST_RUNS_LIST_SUCCESS = 'receive-test-runs-list-success';
export const RECEIVE_TEST_RUNS_LIST_FAIL = 'receive-test-runs-list-fail';

export const requestTestRunsList = () => ({
  type: REQUEST_TEST_RUNS_LIST
});

export const receiveTestRunsList = testRuns => ({
  type: RECEIVE_TEST_RUNS_LIST_SUCCESS,
  testRuns
});

export const receiveTestRunsListFailed = () => ({
  type: RECEIVE_TEST_RUNS_LIST_FAIL
});

export const isTestRunsListLoaded = state => state.loaded.testRuns;

export function fetchTestRunsListIfNeeded() {
  return async function(dispatch, getState) {
    if (isTestRunsListLoaded(getState()) === true) {
      return;
    }

    dispatch(requestTestRunsList());

    try {
      const testRuns = await fetchTestRunsList();
      dispatch(receiveTestRunsList(testRuns));
    } catch (err) {
      dispatch(receiveTestRunsListFailed(err));
    }
  }
}
