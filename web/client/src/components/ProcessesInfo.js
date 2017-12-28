import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  main: {
    marginLeft: '25px',
    color: 'black',
    padding: '10px',
    fontSize: '13px'
  }
})

class ProcessesInfo extends React.Component {
  render() {
    const { amountOfProcesses, classes } = this.props;

    return (
      <Paper className={classes.main}>
        <span>Currently running: </span>
        <strong>{ amountOfProcesses }</strong>
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles, {
    name: 'ProcessesInfo',
  }),
  connect(state => ({
    amountOfProcesses: state.amountOfRunningProcesses
  }))
)(ProcessesInfo)
