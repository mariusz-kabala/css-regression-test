import TestDetailsContainer from '../components/TestDetails'
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { fetchTestDetailsIfNeeded } from '../actions/testDetails';

export default compose(
  connect(
    state => {
      const currentTestDetailsID = state.currentTestDetailsID;

      if (
        currentTestDetailsID === null ||
        typeof state.testDetails[currentTestDetailsID] === 'undefined'
      ) {
        return {
          summary: {},
          details: []
        };
      }

      return state.testDetails[currentTestDetailsID];
    },
    dispatch => ({
      onReady: testID => dispatch(fetchTestDetailsIfNeeded(testID))
    })
  )
)(TestDetailsContainer)
