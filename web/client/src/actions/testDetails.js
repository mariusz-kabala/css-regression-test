import { fetchTestDetails } from '../api';
import { goToTestDetails } from './goToTest';

export const REQUEST_TEST_DETAILS = 'request-test-details';
export const RECEIVE_TEST_DETAILS_SUCCESS = 'receive-test-details-success';
export const RECEIVE_TEST_DETAILS_FAIL = 'receive-test-details-fail';

export const requestTestDetails = testID => ({
  type: REQUEST_TEST_DETAILS,
  testID
});

export const receiveTestDetails = (testID, testDetails) => ({
  type: RECEIVE_TEST_DETAILS_SUCCESS,
  testID,
  testDetails
});

export const receiveTestDetailsFailed = testID => ({
  type: RECEIVE_TEST_DETAILS_FAIL,
  testID
});

export function fetchTestDetailsIfNeeded(testID) {
  return async function(dispatch, getState) {
    dispatch(goToTestDetails(testID));
    dispatch(requestTestDetails(testID));

    try {
      const testDetails = await fetchTestDetails(testID);
      dispatch(receiveTestDetails(testID, testDetails));
    } catch (err) {
      dispatch(receiveTestDetailsFailed(testID));
    }
  }
}
