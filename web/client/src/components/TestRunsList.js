import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchTestRunsListIfNeeded } from '../actions/testRuns';

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
          value={ null }
          onChange={ this.handleChange }
          className={ classes.customWidth }
          input={ <Input id="testRunsList" /> }
        >
          { testRuns.map(testRun => {
            return (
              <MenuItem value={ testRun }>
                { new Date(testRun) }
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
  testRuns: PropTypes.array.isRequired,
  onTestChange: PropTypes.func,
  isLoading: PropTypes.bool.isRequired
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      isLoading: false,
      testRuns: []
    }),
    dispatch => ({
      onReady: () => dispatch(fetchTestRunsListIfNeeded()),
      onTestChange: testID => null
    })
  )
)(TestRunsList);
