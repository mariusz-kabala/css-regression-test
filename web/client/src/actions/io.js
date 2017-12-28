export const UPDATE_AMOUNT_OF_RUNNING_PROCESSES = 'update-amount-of-running-processes';

export const updateAmountOfRunningProcesses = amount => ({
  type: UPDATE_AMOUNT_OF_RUNNING_PROCESSES,
  amount
});

export function connectToSocket() {
  return function(dispatch, getState) {
    const socket = io();

    socket.on('processes', msg => {
      dispatch(updateAmountOfRunningProcesses(msg.running));
    });
  };
}
