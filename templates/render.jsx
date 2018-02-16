import React from 'react';
import ReactDOMServer from 'react-dom/server';
import templateFn from './template';
import TestDetails from '../web/client/src/components/TestDetails';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';

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

const WrappedComponent = compose(
  withStyles(styles, {
    name: 'TestDetailsContainer',
  }),
)(TestDetails)

export default (id, results, imagePath) => {
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  const generateClassName = createGenerateClassName();
  
  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <WrappedComponent
          summary={results.summary}
          details={results.details}
          onReady={undefined}
          match={ { params: { id } } }
          hideControls={ true }
          imagePath={ imagePath || '../screenshots' }
        />
      </MuiThemeProvider>
    </JssProvider>
  );

  const css = sheetsRegistry.toString()

  return templateFn(html, css);
};