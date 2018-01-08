import { fetchCurrentlyRunningProcesses } from '../api'

export const OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = 'open-currently-running-processes-tooltip';
export const CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = 'close-currently-running-processes-tooltip';
export const TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP = 'toggle-currently-running-processes-tooltip';
export const REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST = 'request-currently-running-processes';
export const RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS = 'receive-currently-running-processes-success';
export const RECEIVE_CURRENTLY_RUNNING_PROCESSES_FAIL = 'receive-currently-running-processes-fail';
export const GO_TO_RUNNING_PROCESS_DETAILS = 'go-to-running-process-details';

export const openCurrentlyRunningProcessesTooltip = () => ({
  type: OPEN_CURRENTLY_RUNNING_PROCESSES_TOOLTIP
});

export const closeCurrentlyRunningProcessesTooltip = () => ({
  type: CLOSE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP
});

export const toggleCurrentlyRunningProcesses = () => ({
  type: TOGGLE_CURRENTLY_RUNNING_PROCESSES_TOOLTIP
});

export const requestCurrentlyRunningProcesses = () => ({
  type: REQUEST_CURRENTLY_RUNNING_PROCESSES_LIST
});

export const receiveCurrentlyRunningProcessesSuccess = data => ({
  type: RECEIVE_CURRENTLY_RUNNING_PROCESSES_SUCCESS,
  data
});

export const receiveCurrentlyRunningProcessesFail = () => ({
  type: RECEIVE_CURRENTLY_RUNNING_PROCESSES_FAIL
});

export const goToRunningProcessDetails = id => ({
  type: GO_TO_RUNNING_PROCESS_DETAILS,
  id
});

export function fetchCurrentlyRunningProcessesIfNeeded() {
  return async function(dispatch, getState) {
    dispatch(requestCurrentlyRunningProcesses());

    try {
      const data = await fetchCurrentlyRunningProcesses();
      dispatch(receiveCurrentlyRunningProcessesSuccess(data));
    } catch (err) {
      dispatch(receiveCurrentlyRunningProcessesFail(err));
    }
  }
}

export function goToRunningProcessDetailsIfNeeded(id, history) {
  return (dispatch, getState) => {
    goToRunningProcessDetails(id);

    history.push(`/processes/${id}`);
  }
}
