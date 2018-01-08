export const GO_TO_PROCESS_DETAILS = 'go-to-process-details';

export const goToProcessDetails = id => ({
  type: GO_TO_PROCESS_DETAILS,
  id
});

const shouldGoToProcessDetails = (state, id) => state.currentProcessID !== id;

export function goToProcessDetailsIfNeeded(id, history) {
  return (dispatch, getState) => {
    if (shouldGoToProcessDetails(getState(), id) === false) {
      return;
    }

    dispatch(goToProcessDetails(id));

    history.push(`/processes/${id}`);
  }
}
