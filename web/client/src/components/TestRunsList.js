import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchTestRunsListIfNeeded } from '../actions/testRuns';
import { goToTestDetailsIfNeeded } from '../actions/goToTest';
import { withRouter } from 'react-router';

const styles = theme => ({
  customWidth: {
    width: 230,
    margin: 10
  },
  testRunLabel: {
    margin: 8,
    fontSize: 12
  }
});

export class TestRunsList extends React.Component {
  componentDidMount() {
    const { onReady } = this.props;

    if (typeof onReady === 'function') {
      onReady();
    }
  }

  handleChange = (event, index, value) => {
    const { history, onGoToTest } = this.props;

    if (typeof onGoToTest === 'function') {
      onGoToTest(event.target.value, history);
    }
  }

  render() {
    const { testRuns, classes } = this.props
    return (
      <div>
        <InputLabel
          className={ classes.testRunLabel }
          htmlFor="testRunsList"
        >
          Choose test run
        </InputLabel>
        <Select
          value={ '' }
          onChange={ this.handleChange }
          className={ classes.customWidth }
          input={ <Input id="testRunsList" value="" /> }
        >
          { testRuns.map(testRun => {
            return (
              <MenuItem key={ `id-${testRun}` } value={ testRun }>
                { testRun }
              </MenuItem>
            )
          }) }
        </Select>
      </div>
    )
  }
}

TestRunsList.propTypes = {
  classes: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onGoToTest: PropTypes.func,
  testRuns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    state => ({
      isLoading: state.isLoading.testRuns,
      testRuns: state.testRuns
    }),
    dispatch => ({
      onReady: () => dispatch(fetchTestRunsListIfNeeded()),
      onGoToTest: (testID, history) => dispatch(goToTestDetailsIfNeeded(testID, history))
    })
  )
)(TestRunsList);
