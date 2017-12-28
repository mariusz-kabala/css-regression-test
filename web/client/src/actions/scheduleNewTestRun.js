import { createNewTestRun } from '../api';

export const SCHEDULE_NEW_TEST_RUN = 'schedule-new-test-run';
export const OPEN_NEW_TEST_RUN_POPUP = 'open-new-test-run-popup';
export const CLOSE_NEW_TEST_RUN_POPUP = 'close-new-test-run-popup';

export const scheduleNewTestRun = () => ({
  type: SCHEDULE_NEW_TEST_RUN
});

export const openNewTestRunPopup = () => ({
  type: OPEN_NEW_TEST_RUN_POPUP
});

export const closeNewTestRunPopup = () => ({
  type: CLOSE_NEW_TEST_RUN_POPUP
});

export function scheduleNewTestRunIfNeeded(testData) {
  return async function(dispatch, getState) {
    await createNewTestRun(testData)
  }
}
