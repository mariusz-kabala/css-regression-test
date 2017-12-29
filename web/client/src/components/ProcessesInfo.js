import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {
  toggleCurrentlyRunningProcesses,
  fetchCurrentlyRunningProcessesifNeeded
} from '../actions/currentlyRunning';
import ToolTip from 'react-portal-tooltip';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

const styles = theme => ({
  main: {
    marginLeft: '25px',
    color: 'black',
    padding: '10px',
    fontSize: '13px',
    cursor: 'pointer'
  },
  elName: {
    minWidth: '70px',
    display: 'inline-block',
    textAlign: 'right'
  },
  loader: {
    textAlign: 'center'
  },
  tooltip: {
    minWidth: '350px'
  }
})

class ProcessesInfo extends React.Component {
  handlePaperClick = event => {
    event.preventDefault();

    const { onClick, isActive } = this.props;

    onClick(!isActive);
  }

  renderLoader() {
    const { classes } = this.props;

    return (
      <div className={ classes.loader}>
        <CircularProgress size={50} color="accent"/>
      </div>
    );
  }

  renderEmptyList() {
    return (
      <p>Nothing is running right now</p>
    );
  }

  renderProcesses(processes) {
    const { classes } = this.props;

    return (
      <Table>
        <TableBody>
          { processes.map(process => {
            return (
              <TableRow key={process.id}>
                <TableCell>
                  <div>
                    <strong className={ classes.elName }>name:</strong> { process.testName }
                  </div>
                  <div>
                    <strong className={ classes.elName }>url:</strong> { process.url }
                  </div>
                  <div>
                    <strong className={ classes.elName }>threshold:</strong> { process.threshold }
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

  renderTooltipContent() {
    const { isLoading, processes } = this.props;

    if (isLoading === true) {
      return this.renderLoader();
    }

    if (processes.length === 0) {
      return this.renderEmptyList();
    }

    return this.renderProcesses(processes);
  }

  render() {
    const { amountOfProcesses, classes, isActive } = this.props;

    return (
      <div>
        <Paper id="processesInfo" onClick={ this.handlePaperClick } className={classes.main}>
          <span>Currently running: </span>
          <strong>{ amountOfProcesses }</strong>
        </Paper>
        <ToolTip
          active={ isActive }
          position="bottom"
          arrow="center"
          parent="#processesInfo"
        >
          <div className={ classes.tooltip}>
            <Typography type="subheading" align="center" gutterBottom>
              Currently running:
            </Typography>
            { this.renderTooltipContent() }
          </div>
        </ToolTip>
      </div>
    )
  }
}

ProcessesInfo.propTypes = {
  amountOfProcesses: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,

};

export default compose(
  withStyles(styles, {
    name: 'ProcessesInfo',
  }),
  connect(
    state => ({
      amountOfProcesses: state.amountOfRunningProcesses,
      isActive: state.isRunningProcessesInfoTooltipOpen,
      isLoading: state.isLoading.currentlyRunning,
      processes: state.currentlyRunningProcesses
    }),
    dispatch => ({
      onClick: (isActive) => {
        isActive && dispatch(fetchCurrentlyRunningProcessesifNeeded());
        dispatch(toggleCurrentlyRunningProcesses());
      }
    })
  )
)(ProcessesInfo)
