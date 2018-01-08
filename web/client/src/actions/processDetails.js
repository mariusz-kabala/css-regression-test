import { fetchProcessDetails } from '../api';
import { goToProcessDetails } from './goToProcessDetails';

export const REQUEST_PROCESS_DETAILS = 'request-process-details';
export const RECEIVE_PROCESS_DETAILS_SUCCESS = 'receive-process-details-success';
export const RECEIVE_PROCESS_DETAILS_FAIL = 'receive-process-details-fail';

export const requestProcessDetails = id => ({
  type: REQUEST_PROCESS_DETAILS,
  id
});

export const receiveProcessDetails = (id, details) => ({
  type: RECEIVE_PROCESS_DETAILS_SUCCESS,
  id,
  details
});

export const receiveProcessDetailsFailed = id => ({
  type: RECEIVE_PROCESS_DETAILS_FAIL
});

export function fetchProcessDetailsIfNeeded(id) {
  return async (dispatch, getState) => {
    dispatch(requestProcessDetails(id));
    dispatch(goToProcessDetails(id));

    try {
      const data = await fetchProcessDetails(id);
      dispatch(receiveProcessDetails(id, data));
    } catch (e) {
      dispatch(receiveProcessDetailsFailed());
    }
  }
}
