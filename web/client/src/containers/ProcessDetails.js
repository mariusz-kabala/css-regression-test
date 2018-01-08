import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { fetchProcessDetailsIfNeeded } from '../actions/processDetails';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  logs: {
    listStyleType: 'none',
    margin: '0',
    paddingLeft: '5px',
  },
  logLine: {
    padding: '6px 0',
    fontSize: '14px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.075)'
  },
  logLevel: {
    paddingRight: '5px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-block',
    minWidth: '60px',
    textAlign: 'right'
  },
  debug: {
    color: 'blue',
  },
  info: {
    color: 'green'
  }
})

export class ProcessDetailsContainer extends React.Component {
  componentDidMount() {
    const { onReady, match } = this.props;

    if (typeof onReady === 'function') {
      onReady(match.params.id);
    }
  }

  renderInfo() {
    const { info } = this.props;

    if (!info) {
      return null;
    }

    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>URL:</strong>
            </TableCell>
            <TableCell>
              { info.url }
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>name:</strong>
            </TableCell>
            <TableCell>
              { info.testName }
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Threshold:</strong>
            </TableCell>
            <TableCell>
              { info.threshold }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  renderLogs() {
    const { logs, classes } = this.props;
    const renderMsg = log => {
      return (
        <div>
          <span className={`${classes.logLevel} ${classes[log.level]}`}>
            [{ log.level }]
          </span>
          <span>{ log.message.join(' ') }</span>
        </div>
      )
    }

    if (!logs) {
      return null;
    }

    return (
      <ul className={ classes.logs }>
      { logs.map((log, key) => {
        return (
          <li key={ `logMsg${key}` } className={ classes.logLine }>
            { renderMsg(log) }
          </li>
        )
      }) }
      </ul>
    )
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography type="title" gutterBottom color="inherit">
            Info:
          </Typography>
          { this.renderInfo() }
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography type="title" gutterBottom color="inherit">
            Logs:
          </Typography>
          { this.renderLogs() }
        </Grid>
      </Grid>
    )
  }
}

ProcessDetailsContainer.propTypes = {
  onReady: PropTypes.func
}

export default compose(
  withStyles(styles, {
    name: 'ProcessDetails'
  }),
  connect(
    state => {
      const id = state.currentProcessID;
      return id ? state.processDetails[id] : {
        info: null,
        logs: []
      }
    },
    dispatch => ({
      onReady: id => dispatch(fetchProcessDetailsIfNeeded(id))
    })
  )
)(ProcessDetailsContainer)
