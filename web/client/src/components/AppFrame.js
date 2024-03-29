/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import NProgress from 'nprogress';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import FormatTextdirectionLToR from 'material-ui-icons/FormatTextdirectionLToR';
import FormatTextdirectionRToL from 'material-ui-icons/FormatTextdirectionRToL';
import AppDrawer from './AppDrawer';
import { pageToTitle } from '../utils/helpers';
import NewTestRunPopup from './NewTestRunPopup';
import ProcessesInfo from './ProcessesInfo';
import { connectToSocket } from '../actions/io';
import { openNewTestRunPopup } from '../actions/scheduleNewTestRun';

import { withRouter } from 'react-router';
// @todo Disaply a progress bar between route transitions
NProgress.configure({
  template: `
    <div class="bar" role="bar">
      <dt></dt>
      <dd></dd>
    </div>
  `,
});

const styles = theme => ({
  '@global': {
    html: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: '200',
      color: '#222',
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
      '@media print': {
        background: theme.palette.common.white,
      },
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background:
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: `${theme.palette.type === 'light'
          ? theme.palette.common.black
          : theme.palette.common.white} 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': { opacity: 0.6 },
      '60%': { opacity: 0 },
      to: { opacity: 0.6 },
    },
  },
  root: {
    display: 'relative',
    minHeight: '100vh',
    width: '100%',
    padding: '96px 40px'
  },
  title: {
    marginLeft: 24,
  },
  appBar: {
    background: 'linear-gradient(60deg, #8f42ff 40%, #c099ff 80%)',
    transition: theme.transitions.create('width'),
    zIndex: '10',
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  button: {
    marginLeft: '30px'
  }
});

class AppFrame extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleStartNewTest = event => {
    const { onStartNewTestRunButtonClick } = this.props;

    onStartNewTestRunButtonClick();

    event.preventDefault();
  }

  componentDidMount() {
    const { onReady } = this.props;

    onReady();
  }

  render() {
    const { children, classes, isNewTestRunPopupOpen } = this.props;

    const uiTheme = {
      paletteType: 'light',
      direction: 'ltr',
    }

    const title = null;
    //  this.context.activePage.title !== false ? pageToTitle(this.context.activePage) : null;

    let disablePermanent = false;
    let navIconClassName = '';
    let appBarClassName = classes.appBar;

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      disablePermanent = true;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName = classes.navIconHide;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <div className={classes.root}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={navIconClassName}
            >
              <MenuIcon />
            </IconButton>

            <Typography className={classes.title} type="title" color="inherit" noWrap>
              CSS Regression Tests
            </Typography>

            <Button
              onClick={this.handleStartNewTest}
              color="primary"
              raised
              className={classes.button}
            >
              Start new test
            </Button>

            <ProcessesInfo />

          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          disablePermanent={disablePermanent}
          onClose={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
        />
        {children}
        <NewTestRunPopup open={ isNewTestRunPopupOpen } />
      </div>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  isNewTestRunPopupOpen: PropTypes.bool.isRequired,
  onReady: PropTypes.func.isRequired,
  onStartNewTestRunButtonClick: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles, {
    name: 'AppFrame',
  }),
  connect(state => ({
    isNewTestRunPopupOpen: state.isNewTestRunPopupOpen
  }),
    dispatch => ({
      onReady: () => dispatch(connectToSocket()),
      onStartNewTestRunButtonClick: () => dispatch(openNewTestRunPopup())
    }))
)(AppFrame);
