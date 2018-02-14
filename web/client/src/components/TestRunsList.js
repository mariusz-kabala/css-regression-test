import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchTestRunsListIfNeeded } from '../actions/testRuns';
import { goToTestDetailsIfNeeded } from '../actions/goToTest';
import { withRouter } from 'react-router';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';

const styles = theme => ({
  customWidth: {
    width: 230,
    margin: 10
  },
  testRunLabel: {
    margin: 8,
    fontSize: 12
  },
  menuList: {
    width: '100%',
    maxWidth: 360
  }
});

export class TestRunsList extends React.Component {
  state = {
    anchorEl: null
  }
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    const { onReady } = this.props;

    if (typeof onReady === 'function') {
      onReady();
    }
  }

  handleChange = (event, index) => {
    const { history, onGoToTest, testRuns } = this.props;

    if (typeof onGoToTest === 'function') {
      onGoToTest(testRuns[event.target.value], history);
    }
    this.setState({ anchorEl: null });
  }

  render() {
    const { testRuns, classes, selectedTestRun } = this.props
    const { anchorEl } = this.state;

    return (
      <div>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Choose test run"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Selected test run"
              secondary={ selectedTestRun || 'Choose test run' }
            />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.menuList}
        >
          { testRuns.map(testRun => {
            return (
              <MenuItem
                key={ `id-${testRun}` }
                value={ testRun }
                selected={testRun === selectedTestRun}
                onClick={this.handleChange}
              >
                { testRun }
              </MenuItem>
            )
          }) }
        </Menu>
        
      </div>
    )
  }
}

TestRunsList.propTypes = {
  classes: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onGoToTest: PropTypes.func,
  testRuns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedTestRun: PropTypes.string
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    state => ({
      isLoading: state.isLoading.testRuns,
      testRuns: state.testRuns,
      selectedTestRun: state.currentTestDetailsID
    }),
    dispatch => ({
      onReady: () => dispatch(fetchTestRunsListIfNeeded()),
      onGoToTest: (testID, history) => dispatch(goToTestDetailsIfNeeded(testID, history))
    })
  )
)(TestRunsList);
