export const GO_TO_TEST_DETAILS = 'go-to-test-details';

export const goToTestDetails = testID => ({
  type: GO_TO_TEST_DETAILS,
  testID
});

const shouldGoToTestDetails = (state, testID) => state.currentTestDetailsID !== testID;

export function goToTestDetailsIfNeeded(testID, history) {
  return (dispatch, getState) => {
    if (shouldGoToTestDetails(getState(), testID) === false) {
      return;
    }

    dispatch(goToTestDetails(testID));

    history.push(`/tests/${testID}`);
  };
}
